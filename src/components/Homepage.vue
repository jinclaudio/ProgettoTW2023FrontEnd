<script setup lang="ts">

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
<!--    <sidebar/>-->
    <v-sheet rounded width="auto">
      <Squeal v-for="squeal in Squeals" :key="squeal"
              :messaggio="squeal.body"
              :autore="squeal.username"
              :like="squeal.reaction.like"
      ></Squeal>
    </v-sheet>

      <v-btn
          class="absolute-right-bottom"
          color="primary"
          to="/new_post"
      >
        发布
      </v-btn>

  </v-layout>

</template>

<style scoped>
/* 添加样式以固定按钮位置 */
.absolute-right-bottom {
  position: fixed;
  bottom: 20vw; /* 距离底部的距离 */
  right: 10vw; /* 距离右侧的距离 */
}
.button-container {
  position: relative;
}
</style>