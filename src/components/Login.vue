<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="12" lg-="4">
        <v-card min-width="400">
          <v-card-title class="justify-center">
            <h2>Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="username"
                  label="Username"
                  placeholder="Inserisci il nome utente"

              ></v-text-field>

              <v-text-field
                  v-model="password"
                  label="Password"
                  placeholder="inserisci la password"
                  type="password"
                  required
              ></v-text-field>
              <v-btn @click="login" @keyup.enter.native="login" class="mr-3" color="primary">Login</v-btn>
<!--              <v-btn @click="checkLoginStatus">check</v-btn>-->
              <v-btn to="/register">Registra</v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="notify" :timeout="2000" color="success" variant="outlined"></v-snackbar>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { checkLoginStatus} from "./utilities.ts";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const username = ref('');
const password = ref('');
const notify = ref()
// const messaggio = ref('');

async function login() {
  try {
    // const router = useRouter();
    const response = await axios.post('http://localhost:3000/social/login', {
      username: username.value,
      password: password.value,
    });
    const data = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);

      console.log("Logged con successo!", data.token)
      notify.value = "Logged con successo!"
      await router.push({ name: 'home'})
      window.location.reload();

    } else {
      console.log("Login fallito", data.error);
    }
  } catch (error) {
    console.log("Si è verificato un errore durante il login", error);
  }
}

checkLoginStatus();
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /*background-color: cornflowerblue;*/
}

</style>
