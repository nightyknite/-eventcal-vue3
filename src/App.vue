<script lang='ts'>
import { defineComponent} from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import { CalendarOptions, EventApi, EventClickArg, CalendarApi, EventMountArg } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import { loadApiEvents } from './event-utils'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
// @ts-ignore
import Search from "./components/Search.vue";

const App = defineComponent({
  components: {
    FullCalendar, Search
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          listPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listDay'
        },            
        locale: 'ja',
        buttonText: {
          today: '今日',
          month: '月'
        },
        initialView: 'dayGridMonth',
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDidMount: this.handleEventDidMount,
        events: (info, successCallback, _) => {
          loadApiEvents(info.start, this).then(events => {
            successCallback(events);
          });          
        }
      } as CalendarOptions,
      currentEvents: [] as EventApi[],
      limit: '',
      start: '',
      keyword: '',
      progressValue: 0,
      progressMaxValue: 0,
    }
  },
  methods: {
    handleEventClick(clickInfo: EventClickArg) {
      clickInfo.jsEvent.preventDefault();
      if (clickInfo.event.url) {
        window.open(clickInfo.event.url);
      }
    },
    handleEvents(events: EventApi[]) {
      // this.currentEvents = events
    },
    handleEventDidMount(events: EventMountArg) {
      tippy(events.el, {
        content: `tite:${events.event.title} <br> ${events.event.extendedProps.description}`,
        allowHTML: true,
      });
    },
    handleSearch() {
      const calendar = this.$refs.fullCalendar as InstanceType<typeof FullCalendar>
      const calendarApi:CalendarApi = calendar.getApi();
      calendarApi.refetchEvents();
      // @ts-ignore
      calendarApi.render(); 
    },
  }
})
export default App
</script>
<template>
<b-progress :value="progressValue" :max="progressMaxValue" class="mb-3" show-progress ></b-progress>
<Search v-model:start="start" 
          v-model:limit="limit" 
          v-model:keyword="keyword" 
          @btnClick="handleSearch()"
  />
  <FullCalendar
    class='app-calendar'
    :options='calendarOptions'
    ref="fullCalendar"
  >
  </FullCalendar>
</template>
<style lang='css'>
</style>