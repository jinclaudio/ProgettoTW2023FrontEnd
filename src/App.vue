<script setup lang="ts">
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Squeal from "./components/Squeal.vue";
import UserInfo from "./components/UserInfo.vue";
import NewPost from "./components/NewPost.vue";
import {ref} from "vue";


</script>

<template>
  <v-card>
    <v-layout>
      <user-info/>
      <v-card>
        <Squeal
            messaggio="Questo è un messaggio di prova"/>

          <Squeal
            messaggio="Questo è un messaggio di prova1"/>
        <Squeal
            messaggio="Questo è un messaggio di prova2"/>
        <Squeal
            messaggio="Questo è un messaggio di prova3"/>
      </v-card>


    </v-layout>
  </v-card>
  <Login/>
  <Register/>

  <NewPost/>
</template>

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
