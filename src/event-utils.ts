import { EventInput } from '@fullcalendar/vue3'
import dayjs from 'dayjs';
import $ from 'jquery';

export interface ApiResponse {
  results_available: string,
  results_returned: string,
  events: ApiEvents[];
}

export interface ApiEvents {
  title: string;
  limit: string;
  started_at: string;
  ended_at: string;
  event_url: string;
  accepted: string;
  waiting: string;
  event_type: string;
  hash_tag: string;
  place: string;
  address: string;
  catch: string;
  description: string;
}

const API_URL = 'https://connpass.com/api/v1/event/';

const getEventFormat = (data: ApiResponse) => {
  return data.events.map(item => {
    return {
      title: `${item.title} (${item.limit})`,
      start: item.started_at,
      end: item.ended_at,
      url: item.event_url,
      limit: item.limit,
      description: ""
                    + "day:" + dayjs(item.started_at).format("MM/DD HH:mm") + " - "
                    + "" + dayjs(item.ended_at).format("MM/DD HH:mm") + "<br>"
                    + "limit:" + item.limit + "<br>"
                    + "accepted:" + item.accepted + "<br>"
                    + "waiting:" + item.waiting + "<br>"
                    + "event_type:" + item.event_type + "<br>"
                    + "hash_tag:" + item.hash_tag + "<br>"
                    + "place:" + item.place + "<br>"
                    + "address:" + item.address + "<br>"
                    + "catch:" + item.catch + "<br>"
                    + "description:" + item.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').slice(0,50) + "<br>"
                    + "",
      color: '',
      backgroundColor: '#a82400',
      borderColor: '',
      textColor: ''
    }    
  });
}

const searchApiEvents = (events: EventInput[], start: string, limit: string, keyword: string): EventInput[] => {
    if (start.length > 0) {
      events = events.filter(event => {return (dayjs(<string>event.start).format("HH:mm") >= start);});
    }
    if (limit.length > 0) {
      events = events.filter(event => {return (Number(event.limit) >= Number(limit));});
    }
    if (keyword.length > 0) {
      events = events.filter(
        event => {
          ((event.description.indexOf(keyword) >= 0) || (event.title!.indexOf(keyword) >= 0))
      });
    }
    return events;
}

const getApiEvent = async (ym:string, pageNo:number):Promise<ApiResponse> => {
  const PAGING: number = 100;
  const apiUrl = API_URL + '?count=' + PAGING + '&ym=' + ym + '&start=' + (pageNo * PAGING + 1);
  const data: ApiResponse = await $.ajax({url: apiUrl, dataType: 'jsonp'});
  return data;
}
export const loadApiEvents = async (startDay: Date, cal:any):Promise<EventInput[]> => {

  const ym: string = dayjs(startDay).add(7, 'd').format("YYYYMM");
  let data: ApiResponse;
  let events: EventInput[] = [];
  let pageNo: number = 0;
  const item = sessionStorage.getItem('event' + ym);
  if (item !== null) {
    events = JSON.parse(item);
    return searchApiEvents(events, cal.start, cal.limit, cal.keyword);
  }
  data = await getApiEvent(ym, pageNo);
  events = events.concat(getEventFormat(data));
  const maxPage: number = Math.ceil(Number(data.results_available) / Number(data.results_returned));
  cal.progressMaxValue = maxPage;
  pageNo += 1;
  cal.progressValue = 1;
  const promises = []; 
  while (pageNo < maxPage) {
    promises.push((async () => {
      data = await getApiEvent(ym, pageNo);
      events = events.concat(getEventFormat(data));
      cal.progressValue = cal.progressValue + 1;
    })());
    pageNo += 1;
  }
  await Promise.all(promises);
  sessionStorage.setItem('event' + ym, JSON.stringify(events));
  return events;  
}
