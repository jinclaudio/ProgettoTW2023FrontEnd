<script setup lang="ts">
import {ref,computed} from 'vue'
import axios from "axios";
import {valueEquals} from "element-plus";

let text = ref<string>('');
let num = ref<number>('');
let prevText = ref<number>('')
let difference = ref<number>('')



async function postASqueal() {
  axios.post('http://127.0.0.1:3000/users/squeal', {
    username: "keqing",
    text: text.value,
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
async function getChar () {
  axios.get('http://127.0.0.1:3000/users/getUser',
  {
    params:{
      username:'giornogiovanna',
    }
  })
      .then(res=>{
        num=res.data[0].CharNum
        prevText = text.value.length
  })
}
getChar()

  async function updateNum  (){
    difference = text.value.length - prevText

    num -= difference

    prevText=text.value.length
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
      @input="updateNum"
  >
  </v-textarea>


  <v-banner :text="num"></v-banner>
  <v-btn @click="postASqueal">Squeal it</v-btn>
</template>

<style scoped>

</style>