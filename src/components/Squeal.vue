<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getSingleSquealInfo} from "./utilities.ts";

const {params} = useRoute()

const SquealID = ref(params.id)
const data = ref()
const image = ref()
console.log(SquealID.value)
onMounted(async () => {
  data.value = await getSingleSquealInfo(SquealID.value)
  if (data.value[0].image !== null) {
    const filename = data.value[0].image
    image.value = `http://localhost:3000/social/get_image?image=${filename}`
  }
})

</script>

<template>

  <v-card v-if="data">
      {{ data[0]}}
  </v-card>

<v-img :src=image></v-img>

</template>

<style scoped>

</style>