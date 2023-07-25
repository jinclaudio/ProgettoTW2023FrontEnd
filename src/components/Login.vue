<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="12" lg-="4">
        <v-card>
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
              <v-btn @click="login" class="mr-3" color="primary">Login</v-btn>
              <v-btn>Registra</v-btn>
              <v-btn @click="checkLoginStatus">check</v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import axios from 'axios';
// import {useRouter} from 'vue-router';


const username = ref('');
const password = ref('');
const error = ref('');

// const router = useRouter();

async function login() {
  try {
    const response = await axios.post('http://127.0.0.1:3000/users/login', {
      username: username.value,
      password: password.value,
    });
    const data = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log("Logged con successo!", data.token)

    } else {
      console.log("Login fallito", data.error);
    }
  } catch (error) {
    console.log("Si è verificato un errore durante il login", error);
  }
}

function logout() {
  localStorage.removeItem('token');
  console.log("logged out");
}

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.get('http://127.0.0.1:3000/users/getUser', {
      headers: {
        'Authorization': `Bearer ${token}`

      }
    })
        .then(response => {
          console.log("Utente loggato", response.data[0].username)
        })
        .catch(error => {
          console.log("Utente non loggato o scaduto", error)
        })
  } else {
    console.log("Utente non loggato")
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
