<script setup lang="ts">

// import Squeal from "./Squeal.vue";

import { onMounted, ref} from "vue";
import { like, getUserInfo, getSqueals } from "./utilities.ts";


let likeColor = function getLikeColor(squealId:string)  {
  return User.value.hasLiked.includes(squealId) ? 'red' : '';
}
function toggleLike(squeal:any){
  like(squeal._id)
  const color = likeColor(squeal._id)
  if (color !== 'red'){
    squeal.reaction.like++
  }
  User.value.hasLiked.push(squeal._id)
  console.log(User.value.hasLiked)
}
const Squeals = ref()
const User = ref()
onMounted(async () => {
  User.value = await getUserInfo(User.value)
  Squeals.value = await getSqueals()

})
</script>

<template>

  <v-layout>
    <v-sheet rounded width="70vw">
      <v-list>
        <v-list-item v-for="(squeal, index) in Squeals" :key="index">
          <v-card
              class="mx-auto"
              max-width="344"
              :title=squeal.username
              align="left"
          >
            <template v-slot:prepend>
              <v-avatar image="https://picsum.photos/200/300"></v-avatar>
            </template>
            <router-link :to="{name: 'squeal', params: { id: squeal._id}}">
            <v-card :text=squeal.body>
            </v-card>
            </router-link>
            <template v-slot:append >
              <div class="justify-self-end">
                <v-icon class="me-1"
                          @click="toggleLike(squeal) "
                          icon="mdi-heart"
                          :color="likeColor(squeal._id)">

                  </v-icon>
                <span class="subheading me-2">{{ squeal.reaction.like}}</span>
                <span class="me-1">·</span>
                <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                <span class="subheading">45</span>
              </div>
            </template>
          </v-card>
        </v-list-item>
      </v-list>
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
  bottom: 10vw; /* 距离底部的距离 */
  right: 10vw; /* 距离右侧的距离 */
}
.button-container {
  position: relative;
}
</style>