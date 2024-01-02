<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getSingleSquealInfo, squealView, squealViewCount} from "./utilities.ts";

const {params} = useRoute()

const SquealID = ref(params.id)
const data = ref()
const image = ref()
const viewedCount = ref()
console.log(typeof (SquealID.value))
onMounted(async () => {
    await squealView(String(SquealID.value));
  data.value = await getSingleSquealInfo(String(SquealID.value))
  viewedCount.value = await squealViewCount(String(SquealID.value))
  if (data.value[0].image !== null) {
    const filename = data.value[0].image
    image.value = `http://localhost:3000/social/get_image?image=${filename}`
  }
})

</script>

<template>

  <v-card v-if="data">
    {{ data[0] }}
  </v-card>
  <p>view</p>
  <v-img :src=image></v-img>
  <v-card v-if="viewedCount">
    {{ viewedCount}}
  </v-card>
</template>

<style scoped>

</style>