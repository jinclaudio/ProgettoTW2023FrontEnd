<script setup lang="ts">

// import Squeal from "./Squeal.vue";

import {onMounted, ref} from "vue";
import {like, getUserInfo, getSqueals} from "./utilities.ts";

const token = localStorage.getItem('token');
const pleaseLogin = ref("Si prega di fare Login prima di procedere")
const showSnackbar = ref(false)
const avatar = ref()
let likeColor = function getLikeColor(squealId: string) {
  if (token)
    return User.value.user.hasLiked.includes(squealId) ? 'red' : '';
  else return ''
}

function toggleLike(squeal: any) {
  if (token) {
    like(squeal._id)
    const color = likeColor(squeal._id)
    if (color !== 'red') {
      squeal.reaction.like++
    }
    User.value.hasLiked.push(squeal._id)
    console.log(User.value.hasLiked)
  } else {
    showSnackbar.value = true
  }

}

import io from 'socket.io-client';
const socket = io('http://localhost:3000')
const message1 = ref('')

socket.on('serverMessage', (message) => {
  message1.value = message;
  console.log(message1.value)
});

const Squeals = ref()

const User = ref()
onMounted(async () => {
  User.value = await getUserInfo()
  Squeals.value = await getSqueals()
  avatar.value = `http://localhost:3000/social/get_avatar?image=${User.value.user.image}`

})
</script>

<template>
  {{ message1 }}
  <v-layout>
<!--    <v-sheet rounded width="80vw">-->
      <v-list :items="Squeals" on-load="getSqueals">
        <template v-for="(squeal) in Squeals">
          <v-card
              style="padding-bottom: 2rem"
              class="mx-auto"
              :title=squeal.username
              align="left"
          >
            <template v-slot:prepend>
              <v-avatar :image=avatar></v-avatar>
            </template>
            <router-link :to="{name: 'squeal', params: { id: squeal._id}}">
              <v-card :text=squeal.body>
              </v-card>
            </router-link>
            <template v-slot:append>
              <div class="justify-self-end">
                <v-icon class="me-1"
                        @click="toggleLike(squeal) "
                        icon="mdi-heart"
                        :color="likeColor(squeal._id)">

                </v-icon>
<!--                <span class="subheading me-2">{{ squeal.reaction.like }}</span>-->
                <span class="me-1">·</span>
                <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                <span class="subheading">45</span>
              </div>
            </template>
          </v-card>
        </template>
      </v-list>
<!--    </v-sheet>-->

    <v-btn
        class="absolute-right-bottom"
        color="primary"
        to="/new_post"
    >
      发布
    </v-btn>

  </v-layout>
  <v-snackbar :timeout="2000" color="red" rounded="pill" v-model="showSnackbar">
    {{ pleaseLogin }}
  </v-snackbar>
</template>

<style scoped>
.absolute-right-bottom {
  position: fixed;
  bottom: 10%; /* 距离底部的距离 */
  right: 10%; /* 距离右侧的距离 */
}

.button-container {
  position: relative;
}
</style>