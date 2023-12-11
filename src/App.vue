
<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <BottomNav/>
    <ApplicationBar/>

  </v-layout>
  <router-view/>
</template>
<script setup>



import BottomNav from "./components/BottomNav.vue";
import ApplicationBar from "./components/ApplicationBar.vue";
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
