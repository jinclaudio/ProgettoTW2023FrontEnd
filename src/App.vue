<script setup lang="ts">
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Squeal from "./components/Squeal.vue";
import NewPost from "./components/NewPost.vue";
import {ref} from "vue";


const drawer = ref(true)
const rail = ref(true)
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
      >
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
        >
          <template v-slot:append>
            <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>


        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
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
<!--  <Login/>-->
<!--  <Register/>-->

<!--  <NewPost/>-->
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
