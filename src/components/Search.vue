<script setup lang="ts">
defineProps(['start', 'limit', 'keyword']);
const emit = defineEmits(['update', 'btnClick', 'update:start', 'update:limit', 'update:keyword']);
const handleInputStart = (event: Event) => {
  emit('update:start', (event.target as HTMLInputElement).value);
};
const handleInputLimit = (event: Event) => {
  emit('update:limit', (event.target as HTMLInputElement).value);
};
const handleInputKeyword = (event: Event) => {
  emit('update:keyword', (event.target as HTMLInputElement).value);
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
            <input id="start" :value="start" @input="handleInputStart($event)" class="form-control me-sm-2" type="text" placeholder="00:00" style="width:5em" maxlength="5" >
            <input id="limit" :value="limit"  @input="handleInputLimit($event)" class="form-control me-sm-2" type="text" placeholder="limit" style="width:4em" maxlength="4" >
            <input id="keyword" :value="keyword" @input="handleInputKeyword($event)" class="form-control me-sm-2" type="search" placeholder="keyword" >
            <button id="search" class="btn btn-outline-success my-2 my-sm-0" type="button" @click="btnClick()">Search</button>    
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>
<style scoped>
</style>
