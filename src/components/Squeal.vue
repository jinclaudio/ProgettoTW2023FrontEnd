<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getSingleSquealInfo, squealView, squealViewCount, getUserInfo, reply_get} from "./utilities.ts";

const {params} = useRoute()

const SquealID = ref(params.id)
const User = ref()

const data = ref()
const image = ref()
const avatar = ref()
const viewedCount = ref()
const replies = ref()
// const token = localStorage.getItem('token');


onMounted(async () => {
  await squealView(String(SquealID.value));
  data.value = await getSingleSquealInfo(String(SquealID.value))
  data.value = data.value[0]

  viewedCount.value = await squealViewCount(String(SquealID.value))
  User.value = await getUserInfo()
  replies.value = await reply_get(String(SquealID.value))
  console.log(replies.value)
  avatar.value = `http://localhost:3000/social/get_avatar?user=${User.value.user._id}`
  if (data.value.image !== null) {
    console.log(data.value)
    const filename = data.value.image
    image.value = `http://localhost:3000/social/get_image?image=${filename}`
  }
})

</script>


<template>


<!--  <v-card class="mx-auto my-4" outlined >-->
<!--    {{ data }}-->
<!--  </v-card>-->
  <v-card
      style="padding-bottom: 2rem"
      class="mx-auto"
      align="left"
      v-if="data"

      :title=data.username

  >
    <template v-slot:prepend>
      <v-avatar :image=avatar></v-avatar>
    </template>
    <v-card :text=data.body>
      <template v-slot:append>
        <div class="justify-self-end">

          <span class="me-1"></span>
        </div>
      </template>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            icon="mdi-heart"
            variant="plain"
        >
        </v-btn>


      </v-card-actions>
    </v-card>
  </v-card>

<!--  <v-img :src=image></v-img>-->
<!--  <v-card v-if="viewedCount">-->
<!--    {{ viewedCount }}-->
<!--  </v-card>-->
    <v-timeline v-if="replies" side="end">
      <v-timeline-item
        v-for="item in replies.reply"
        :key="item._id"
      >
        <template v-slot:icon>
          <v-avatar image="http://localhost:3000/social/get_avatar?image=${item.image}"></v-avatar>
        </template>
<!--        {{ reply }}-->
        <v-card >

          <v-card-text>{{ item }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn size="small" icon="mdi-pencil"></v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>


<!--  <v-img :src="avatar"></v-img>-->
</template>

<style scoped>

</style>