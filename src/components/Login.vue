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
              <v-dialog v-model="showGotoDialog" fullscreen hide-overlay>
                <v-card>
                  <v-card-title>Sei sicuro?</v-card-title>
                  <v-card-text>
                    Sicuro?
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="goToModeratore">Conferma</v-btn>
                    <v-btn color="error" @click="() => {showGotoDialog.value = false}">取消</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import {checkLoginStatus, apiClient, apiURL} from "./utilities.ts";
import {useRouter} from "vue-router";

const router = useRouter()
const username = ref('');
const password = ref('');
const notify = ref()
// const messaggio = ref('');
const showGotoDialog = ref()

async function login() {
  try {
    // const router = useRouter();
    const response = await apiClient.post('/social/login', {
      username: username.value,
      password: password.value,

    });
    const data = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);

      console.log("Logged con successo!", data.accountType)
      notify.value = "Logged con successo!"
      if (data.accountType === 'mod') {
        showGotoDialog.value = true
        const confirmation = window.confirm('Vuoi andare sulla pagina del moderatore?');
        if (confirmation) {
          window.location.href = `${apiURL}/moderator/index.html`;
        }else{
          await router.push({name: 'home'})
          window.location.reload();
        }
      } else if (data.accountType === 'smm') {
        const confirmation = window.confirm('Vuoi andare sulla pagina del smm?');
        if (confirmation) {
          window.location.href = `${apiURL}/smm/index.html`;
        } else {
          await router.push({name: 'home'})
          window.location.reload();
        }
      } else {
        await router.push({name: 'home'})
        window.location.reload();
      }


    } else {
      console.log("Login fallito", data.error);
    }
  } catch (error) {
    console.log(error)
  }

}

function goToModeratore() {
  window.location.href = `${apiURL}/mod/index.html?_ijt=nf22vifuapdo5dn05s8ugjm07q`;
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
