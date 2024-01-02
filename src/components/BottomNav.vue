<script setup lang="ts">
import {  ref } from 'vue'
const value = ref(1)
</script>

<template>
  <v-bottom-navigation
      v-model="value"
      color="primary"
      grow
      density="compact"

  >
    <v-btn to="/">
      <v-icon>mdi-home</v-icon>

      Home
    </v-btn>

    <v-btn to="/channel">
      <v-icon>mdi-view-list</v-icon>

      Canali
    </v-btn>

    <v-btn to="/register">
      <v-icon>mdi-map-marker</v-icon>

      Nearby
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped>

</style>