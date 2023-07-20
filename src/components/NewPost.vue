<script setup lang="ts">
import {ref} from 'vue'
import axios from "axios";

const text = ref('');

async function postASqueal() {
  await axios.post('http://127.0.0.1:3000/users/squeal', {
    username: "Logged User",
    text: text,
    category: "general"
  })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
}
</script>

<template>
  <v-textarea
      clearable
      label="Label"
      prepend-icon="$vuetify"
      variant="solo-filled"
      :v-model="text"
  >
    text
  </v-textarea>
  <v-btn @click="postASqueal">Squeal it</v-btn>
</template>

<style scoped>

</style>