<template>

  <v-card width="80vw" max-width="50rem">
    <v-card-title class="justify-center">
      <h2>Resgistrazione</h2>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
            v-model="username"
            label="Username"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
        ></v-text-field>
        <v-radio-group v-model="userType">
          <v-radio label="normale" value="nor"></v-radio>
          <v-radio label="vip" value="vip"></v-radio>

          <v-radio label="smm" value="smm"></v-radio>
          <v-radio label="mod" value="mod"></v-radio>
        </v-radio-group>
        <v-btn @click="register">Resgitra</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
<v-snackbar v-model="showMessage" color="primary"  rounded="pill">Registrato con successo</v-snackbar>

</template>

<script setup lang="ts">

import {ref} from 'vue';
import {apiClient} from "./utilities.ts";
// import {useRouter} from 'vue-router';


const username = ref('');
const password = ref('');

const userType = ref('nor')
const showMessage = ref(false)
async function register() {
  try {
    await apiClient.post('/social/register', {
      username: username.value,
      password: password.value,
      accountType: userType.value,
      creditInit: 1000
    })
    showMessage.value = true
    console.log("Registrato")
  } catch (error) {
    console.log(error)
  }


}

</script>

<style scoped>

</style>