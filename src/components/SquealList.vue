<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {apiClient} from "./utilities.ts";

const {params} = useRoute()
import {useGoTo} from "vuetify";

const goTo = useGoTo()

const channelID = ref(params.id)
const Squeals = ref()
let skip = 0
let limit = 10

async function nextPage(channel: string) {
  skip += limit;
  Squeals.value = await getSquealsInAChannel(channel, limit, skip)
  Squeals.value = Squeals.value.data.squeals

  goTo(0,)
}

async function prevPage(channel: string) {
  if (skip - limit < 0) {
    skip = 0
  } else {
    skip -= limit;
  }
  Squeals.value = await getSquealsInAChannel(channel, limit, skip)
  Squeals.value = Squeals.value.data.squeals

  goTo(0)

}
async function getSquealsInAChannel(ChannelID: string, limit: number, skip: number) {
  try {
    const res = apiClient.get('/social/squealsInAChannel', {
      params: {
        id: ChannelID,
        skip: skip,
        limit: limit
      }
    })
    return res
  } catch (error) {
    console.log(error)
  }

}
onMounted(async () =>{
  Squeals.value = await getSquealsInAChannel(String(channelID.value), limit, skip)
  Squeals.value = Squeals.value.data.squeals
  console.log(Squeals.value)
})
</script>

<template >
  <v-list :items="Squeals">


    <template v-for="(squeal) in Squeals" :key="squeal._id">
      <v-card
          class="mx-auto"
          width="50vw"
          max-height="40rem"
          :title=squeal.username
          align="left"
          variant="tonal"

      >
        <template v-slot:prepend>
          <v-avatar :image="`http://localhost:3000/social/get_avatar?user=${squeal.sender}`"></v-avatar>
        </template>
        <router-link :to="{name: 'squeal', params: { id: squeal._id}}">
          <v-card-text v-if="typeof squeal.body === 'string'">
            {{ squeal.body }}
          </v-card-text>
          <v-card-text v-else-if="typeof squeal.body === 'object'">
            <div>
              <u>Autore:</u> {{ squeal.body.author }}
            </div>
            <div>
              <u>Publicato il:</u> {{ squeal.body.publishedAt || squeal.body.date || null }}
            </div>
            <div>
              <u>Titolo:</u> {{ squeal.body.title}}
            </div>
            <div v-if="squeal.body.url">
              <u>Fonte:</u> <a  :href="squeal.body.url">{{ squeal.body.url }}</a>
            </div>
            <div v-else-if="squeal.body.utl">
              <!--      <u>Fonte:</u> <a  :href="data.body.url">{{ data.body.url }}</a>-->
              <v-img :src=squeal.body.utl></v-img>
            </div>
          </v-card-text>
        </router-link>
        <v-img :src="`http://localhost:3000/social/get_image?image=${squeal.image}`" cover></v-img>

<!--        <template v-slot:append>-->
<!--          <div class="justify-self-end">-->
<!--            <v-icon-->
<!--                @click="toggleLike(squeal) "-->
<!--                icon="mdi-heart"-->
<!--                :color="likeColor(squeal._id)">-->

<!--            </v-icon>-->


<!--            <span class="subheading me-2">{{ squeal.reaction.like }}</span>-->
<!--            <v-icon-->

<!--                icon="mdi-thumb-down"-->
<!--                :color="dislikeColor(squeal._id)">-->

<!--            </v-icon>-->
<!--            <v-btn-->
<!--                class="ma-2"-->
<!--                variant="text"-->
<!--                icon="mdi-thumb-down"-->
<!--                color="red-lighten-2"-->
<!--                @click="toggleDislike(squeal)"-->
<!--            ></v-btn>-->
<!--            <span class="me-1">asd</span>-->
<!--            <v-icon-->
<!--                :icon="reactionIcon(squeal)"-->
<!--            ></v-icon>-->
<!--          </div>-->
<!--        </template>-->
        <v-spacer></v-spacer>
      </v-card>
    </template>
    <v-btn @click="prevPage(String(channelID))">prev</v-btn>
    <v-btn @click="nextPage(String(channelID))">next</v-btn>
  </v-list>

</template>

<style scoped>

</style>