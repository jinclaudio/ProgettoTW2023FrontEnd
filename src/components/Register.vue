<template>

  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="12" lg-="4">
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

              <v-btn @click="register">Resgitra</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">

import {ref} from 'vue';
import {apiClient} from "./utilities.ts";
// import {useRouter} from 'vue-router';


const username = ref('');
const password = ref('');


async function register() {
  try {
    await apiClient.post('/social/register', {
      username: username.value,
      password: password.value,
      creditInit: 1000
    })
    console.log("Registrato")
  } catch (error) {
    console.log(error)
  }


}

</script>

<style scoped>

</style>