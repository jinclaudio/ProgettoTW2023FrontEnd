
<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <sidebar/>
    <v-bottom-navigation
        v-model="value"
        color="primary"
        grow
    >
      <v-btn to="/">
        <v-icon>mdi-home</v-icon>

        Home
      </v-btn>

      <v-btn to="/login">
        <v-icon icon="mdi-magnify"></v-icon>

        Favorites
      </v-btn>

      <v-btn to="/register">
        <v-icon>mdi-map-marker</v-icon>

        Nearby
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
  <router-view/>
</template>
<script setup>
import { computed, ref } from 'vue'
const value = ref(1)


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
