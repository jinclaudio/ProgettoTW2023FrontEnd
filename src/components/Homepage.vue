<script setup lang="ts">

// import Squeal from "./Squeal.vue";

import {onMounted, ref} from "vue";
import {like, getUserInfo, getSqueals, dislike } from "./utilities.ts";

const token = localStorage.getItem('token');
const showSnackbar = ref(false)
const SnackbarText = ref()
const avatar = ref()
const limit = 10
let skip = 0

let likeColor = function getLikeColor(squealId: string) {
  if (token)
    return User.value.user.hasLiked.includes(squealId) ? 'red' : '';
  else return
}

let reactionIcon = (squeal: any) => {
  if (squeal.reaction.like >= squeal.reaction.CM) {
    return 'mdi-fire'
  } else if (squeal.reaction.dislike >= squeal.reaction.CM) {
    return 'mdi-thumb-down'
  }else if (squeal.reaction.like >= squeal.reaction.CM && squeal.reaction.dislike >= squeal.reaction.CM) {
  return "mdi-alien-outline"
  }
}

let dislikeColor = function getDislikeColor(squealId: string) {
  if (token)
    return User.value.user.hasDisliked.includes(squealId) ? 'blue' : '';
  else return
}
function toggleLike(squeal: any) {
  if (token) {
    like(squeal._id)
    if (User.value.user.hasLiked.includes(squeal._id)) {
      return showSnackbar.value = true;
    } else {
      squeal.reaction.like++
      likeColor(squeal._idd)
    }
  } else {
    SnackbarText.value = 'Si prega di fare Login prima di procedere'
    showSnackbar.value = true
  }
}

function toggleDislike(squeal: any) {
  if (token) {
    dislike(squeal._id)
    if (User.value.user.hasDisliked.includes(squeal._id)) {
      SnackbarText.value = 'Hai già cliccato.'
      showSnackbar.value = true
      return showSnackbar.value = true;
    } else {
      dislike(squeal._id)
      window.location.reload()
    }
  } else{
    SnackbarText.value = 'Si prega di fare Login prima di procedere'
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

async function nextPage() {
  skip += limit;
  Squeals.value = await getSqueals(limit, skip)

}

async function prevPage() {
  skip -= limit;
  Squeals.value = await getSqueals(limit, skip)

}


const Squeals = ref()
const User = ref()
onMounted(async () => {
  User.value = await getUserInfo()
  Squeals.value = await getSqueals(limit, skip)
  avatar.value = `http://localhost:3000/social/get_avatar?user=${User.value.user._id}`

  console.log(avatar.value)
})
</script>

<template>


  {{ message1 }}
  <v-layout>
    <!--    <v-sheet rounded width="80vw">-->
    <v-list :items="Squeals">
      <template v-for="(squeal) in Squeals">
        <v-card
            style="padding-bottom: 2rem"
            class="mx-auto"
            width="80vw"
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
              <v-icon
                  @click="toggleLike(squeal) "
                  icon="mdi-heart"
                  :color="likeColor(squeal._id)">

              </v-icon>


              <span class="subheading me-2">{{ squeal.reaction.like }}</span>
              <v-icon
                  @click="toggleDislike(squeal) "
                  icon="mdi-thumb-down"
                  :color="dislikeColor(squeal._id)">

              </v-icon>
              <span class="me-1">asd</span>
              <v-icon
                  :icon="reactionIcon(squeal)"
              ></v-icon>
            </div>
          </template>
          <v-spacer></v-spacer>
        </v-card>
      </template>
      <v-btn @click="prevPage">prev</v-btn>
      <v-btn @click="nextPage">next</v-btn>

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
    {{ SnackbarText }}
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