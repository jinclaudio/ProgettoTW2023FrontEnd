<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <BottomNav/>
    <ApplicationBar/>
  </v-layout>
  <router-view/>
</template>
<script setup lang="ts">


import BottomNav from "./components/BottomNav.vue";
import ApplicationBar from "./components/ApplicationBar.vue";
import {onMounted} from "vue";
import {MsgAutmatic_currentLocation} from "./components/utilities.ts";
import router from "./router";

onMounted(async () => {
  await MsgAutmatic_currentLocation()
  const token = localStorage.getItem('token');
  if (!token) router.push('/login')
})
</script>
<style scoped>

</style>
