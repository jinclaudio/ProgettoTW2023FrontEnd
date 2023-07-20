<script setup lang="ts">
import {ref} from 'vue'
import axios from "axios";

let text = ref<string>('');

async function postASqueal() {
  axios.post('http://127.0.0.1:3000/users/squeal', {
    username: "keqing",
    text: text,
    category: "general"
  })
      .then((response) => {
        console.log(response.data);
        console.log(text.value)
      })
      .catch((error) => {
        console.log("Error:", error);
      })
}
</script>

<template>
  <v-textarea
      clearable
      counter
      label="Label"
      prepend-icon="$vuetify"
      variant="solo-filled"
      v-model="text"
  >
  </v-textarea>
  <v-btn @click="postASqueal">Squeal it</v-btn>
</template>

<style scoped>

</style>