<script setup lang="ts">
defineProps(['startFrom', 'startTo', 'limitFrom', 'limitTo', 'acceptedFrom', 'acceptedTo', 'keyword', 'nickname']);
const emit = defineEmits(['btnClick', 'update:startFrom', 'update:startTo', 'update:limitFrom', 'update:limitTo', 'update:acceptedFrom', 'update:acceptedTo', 'update:keyword', 'update:nickname']);
const handleInputStartFrom = (event: Event) => {
  emit('update:startFrom', (event.target as HTMLInputElement).value);
};
const handleInputStartTo = (event: Event) => {
  emit('update:startTo', (event.target as HTMLInputElement).value);
};
const handleInputLimitFrom = (event: Event) => {
  emit('update:limitFrom', (event.target as HTMLInputElement).value);
};
const handleInputLimitTo = (event: Event) => {
  emit('update:limitTo', (event.target as HTMLInputElement).value);
};
const handleInputAcceptedFrom = (event: Event) => {
  emit('update:acceptedFrom', (event.target as HTMLInputElement).value);
};
const handleInputAcceptedTo = (event: Event) => {
  emit('update:acceptedTo', (event.target as HTMLInputElement).value);
};
const handleInputKeyword = (event: Event) => {
  emit('update:keyword', (event.target as HTMLInputElement).value);
};
const handleInputNickname = (event: Event) => {
  emit('update:nickname', (event.target as HTMLInputElement).value);
};
const btnClick = () => {
  emit('btnClick');
};
</script>
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Event Calendar</a>
        <div class="collapse navbar-collapse" >
          <form class="d-flex">
            <input id="startFrom" :value="startFrom" @input="handleInputStartFrom($event)" class="form-control me-sm-2" type="text" placeholder="00:00" style="width:5em" maxlength="5" >
            <div class="d-flex align-items-center">〜</div>
            <input id="startTo" :value="startTo" @input="handleInputStartTo($event)" class="form-control me-sm-2" type="text" placeholder="00:00" style="width:5em" maxlength="5" >
            <input id="limitFrom" :value="limitFrom"  @input="handleInputLimitFrom($event)" class="form-control me-sm-2" type="text" placeholder="limit" style="width:4em" maxlength="4" >
            <div class="d-flex align-items-center">〜</div>
            <input id="limitTo" :value="limitTo"  @input="handleInputLimitTo($event)" class="form-control me-sm-2" type="text" placeholder="limit" style="width:4em" maxlength="4" >
            <input id="acceptedFrom" :value="acceptedFrom"  @input="handleInputAcceptedFrom($event)" class="form-control me-sm-2" type="text" placeholder="accepted" style="width:4em" maxlength="4" >
            <div class="d-flex align-items-center">〜</div>
            <input id="acceptedTo" :value="acceptedTo"  @input="handleInputAcceptedTo($event)" class="form-control me-sm-2" type="text" placeholder="accepted" style="width:4em" maxlength="4" >
            <input id="keyword" :value="keyword" @input="handleInputKeyword($event)" class="form-control me-sm-2" type="search" placeholder="keyword" >
            <!--<input id="nickname" :value="nickname" @input="handleInputNickname($event)" class="form-control me-sm-2" type="text" placeholder="nickname" style="width:6em" >-->
            <button id="search" class="btn btn-outline-success my-2 my-sm-0" type="button" @click="btnClick()">Search</button>    
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>
<style scoped>
</style>
