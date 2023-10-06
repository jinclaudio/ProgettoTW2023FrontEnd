<script setup lang="ts">

import Sidebar from "./Sidebar.vue";
import Squeal from "./Squeal.vue";
import axios from 'axios'
import {onMounted, ref} from "vue";

async function getSqueals() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:3000/social/get_all_squeals", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

let Squeals = ref()


onMounted(async () => {
  Squeals.value = await getSqueals()
  console.log(Squeals.value)

})
</script>

<template>
  <!--<v-btn @click="getSqueals">get</v-btn>-->
  <v-layout>
    <sidebar/>
    <v-sheet rounded width="auto">
      <Squeal v-for="squeal in Squeals" :key="squeal"
              :messaggio="squeal.body"
              :autore="squeal.username"
              :like="squeal.reaction.like"
      ></Squeal>
    </v-sheet>

  </v-layout>

</template>

<style scoped>

</style>