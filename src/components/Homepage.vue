<script setup lang="ts">

// import Squeal from "./Squeal.vue";

import {computed, onMounted, ref} from "vue";
import {like, getUserInfo, getSqueals, dislike} from "./utilities.ts";

const goTo = useGoTo()

const token = localStorage.getItem('token');
const showSnackbar = ref(false)
const SnackbarText = ref()
const avatar = ref()
const openSearch = ref(false)

const limit = 20
let skip = 0
const image = ref()
const getLikeColor = computed(() => (squealId: string) => {
  if (token && User.value.user.hasLiked.includes(squealId)) {
    return 'red';
  }
  return '';
});

let reactionIcon = (squeal: any) => {
  if (squeal.reaction.like >= squeal.reaction.CM) {
    return 'mdi-fire'
  } else if (squeal.reaction.dislike >= squeal.reaction.CM) {
    return 'mdi-thumb-down'
  } else if (squeal.reaction.like >= squeal.reaction.CM && squeal.reaction.dislike >= squeal.reaction.CM) {
    return "mdi-alien-outline"
  }
}

const getdisLikeColor = computed(() => (squealId: string) => {
  if (token && User.value.user.hasDisliked.includes(squealId)) {
    return 'blue';
  }
  return '';
});

function toggleLike(squeal: any) {
  if (token) {
    like(squeal._id)
    if (User.value.user.hasLiked.includes(squeal._id)) {
      SnackbarText.value = "Hai già piaciuto"
      return showSnackbar.value = true;
    } else {
      squeal.reaction.like++
      User.value.user.hasLiked.push(String(squeal._id))

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
      SnackbarText.value = "Hai già pi"
      return showSnackbar.value = true;
    } else {
      squeal.reaction.dislike++
      User.value.user.hasDisliked.push(squeal._id)
    }
  }

}

import {useGoTo} from "vuetify";
import Search from "./Search.vue";

const searchResults = ref();

const handleSearchCompleted = (data: any) => {
  searchResults.value = data;
  Squeals.value = data.squealsMatch
}


async function nextPage() {
  skip += limit;
  Squeals.value = await getSqueals(limit, skip)
  goTo(0)
}

async function prevPage() {
  if (skip - limit < 0) {
    skip = 0
  } else {
    skip -= limit;
  }
  Squeals.value = await getSqueals(limit, skip)
  goTo(0)

}


const Squeals = ref()
const User = ref()
onMounted(async () => {
  User.value = await getUserInfo()
  Squeals.value = await getSqueals(limit, 20)
  avatar.value = `http://localhost:3000/social/get_avatar?user=${User.value.user._id}`
  if (Squeals.value.image) {
    image.value = `http://localhost:3000/social/get_image?image=${Squeals.value.image}`
  }
  console.log(avatar.value)
})
</script>

<template>
  <v-btn variant="text" icon="mdi-magnify" @click="openSearch = !openSearch"></v-btn>
  <Search v-model="openSearch" @search-completed="handleSearchCompleted"/>

  <v-layout>
    <!--    <v-sheet rounded width="80vw">-->
    <v-list :items="Squeals">
      <template v-for="(squeal) in Squeals" :key="squeal._id">
        <v-card
            style="padding-bottom: 2rem"
            class="mx-auto"
            width="50vw"
            max-height="40rem"
            :title=squeal.username
            align="left"
        >
          <template v-slot:prepend>
            <v-avatar :image="`http://localhost:3000/social/get_avatar?user=${squeal.sender._id}`"></v-avatar>
          </template>
          <router-link :to="{name: 'squeal', params: { id: squeal._id}}">
            <v-card-text v-if="typeof squeal.body === 'string'">
              {{ squeal.body }}
            </v-card-text>
            <v-card-text v-else-if="typeof squeal.body === 'object'">
              <div v-if="squeal.body.author">
                <u>Autore:</u> {{ squeal.body.author }}
              </div>
              <div>
                <u>Publicato il:</u> {{ squeal.body.publishedAt || squeal.body.date || null }}
              </div>
              <div>
                <u>Titolo:</u> {{ squeal.body.title }}
              </div>
              <div v-if="squeal.body.utl">
                <v-img :src=squeal.body.utl></v-img>
              </div>

            </v-card-text>
          </router-link>
          <v-img :src="`http://localhost:3000/social/get_image?image=${squeal.image}`" cover></v-img>

          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon
                  @click="toggleLike(squeal) "
                  icon="mdi-heart"
                  :color="getLikeColor(squeal._id)">

              </v-icon>


              <span class="subheading me-2">{{ squeal.reaction.like }}</span>
              <v-icon
                  @click="toggleDislike(squeal)"
                  icon="mdi-thumb-down"
                  :color="getdisLikeColor(squeal._id)">

              </v-icon>

              <span class="subheading me-2">{{ squeal.reaction.dislike }}</span>
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

.list-enter-active, .list-leave-active {
  transition: opacity 0.5s;
}

.list-enter, .list-leave-to /* <= Vue 2.x用list-leave-active */
{
  opacity: 0;
}

.router-link-active {
  text-decoration: none;
  color: yellow;
}

a {
  text-decoration: none;
  color: black;
}
</style>