<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";

const drawer = ref(true)
const rail = ref(true)
const username = ref('')
let plan: string;
let credit: number;
let amount: number;

// let portrait: string;
function getUserInfo() {

  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Utente non oggato！');
    return;
  }
  axios.get('http://127.0.0.1:3000/users/getUser', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
      .then(response => {
        username.value = response.data[0].username;
        console.log(response.data[0])
      })
      .catch(error => {
        console.error('Si e verificato un errore', error);
      });
}

getUserInfo()
</script>

<template>
  <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
  >
    <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title=username
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

</template>

<style scoped>

</style>