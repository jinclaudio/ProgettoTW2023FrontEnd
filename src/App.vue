
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
import {MsgAutomatic_currentLocation} from "./components/utilities.ts";
onMounted(()=>{
  // MsgAutomatic_currentLocation()
})
</script>
<style scoped>

</style>
