<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
// import { logout } from "./utilities.ts";

const drawer = ref(true)
const userinfo = ref()
// const username = ref()


// let portrait: string;

async function getUserInfo() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Utente non oggato！');
      return;
    }
    const response = await axios.get('http://localhost:3000/social/user_detail', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.user
  } catch (error) {
    console.log(error)
  }
}

getUserInfo()
onMounted(async () => {
  userinfo.value = await getUserInfo()
  console.log(userinfo.value)

})
</script>

<template>


      <v-app-bar
          scroll-behavior="elevate"
          density="compact"
          prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Squealer</v-toolbar-title>

<!--        <v-spacer></v-spacer>-->

        <v-btn variant="text" icon="mdi-magnify"></v-btn>
      </v-app-bar>





  <v-navigation-drawer
      v-model="drawer"
      v-if="userinfo"
      location="left"
  >
    <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title=userinfo.username
        nav=""
    >
    </v-list-item>


    <v-list density="compact" nav="">
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account" to="/user_detail"></v-list-item>
    </v-list>

  </v-navigation-drawer>
<!--  {{ userinfo }}-->
</template>

<style scoped>

</style>