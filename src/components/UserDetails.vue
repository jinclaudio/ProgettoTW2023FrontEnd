<script setup lang="ts">

import {apiClient, getUserInfo, topUp} from "./utilities.ts"
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const data = ref()
const router = useRouter();
const dialog = ref()
const amount = ref()
const avatar = ref()
const newAvatar = ref()
const success = ref()
const errore = ref()
const page = ref(1)

const fav = ref(true)
const menu = ref(false)
const message = ref(false)
const hints = ref(true)
async function logout() {
  const token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');

  }
  await router.push('/')
  window.location.reload();

  console.log(token)
  console.log("logged out");
}
function goToModeratore(){
  const confirmation = window.confirm('Vuoi andare sulla pagina del moderatore?');
  if (confirmation){
    window.location.href = 'http://localhost:63342/mod/index.html?_ijt=nf22vifuapdo5dn05s8ugjm07q';
  }

}
const rules = [
  (value: any) => {
      return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'

    }
]
async function changeAvatar(){
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('image', newAvatar.value[0])
  console.log(formData)
  await apiClient.post('/social/post_avatar', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        success.value = true;
        console.log("Response: ", response.data)
      })
      .catch(error => {
        errore.value = true

        console.error("Error:", error);
      })

}
onMounted(async () => {
  data.value = await getUserInfo();
  console.log(data.value.user._id)
  avatar.value = `http://localhost:3000/social/get_avatar?user=${data.value.user._id}`

  console.log(data.value.squeals);
  if (data.value.accountType === 'mod'){ goToModeratore()}
  console.log(data.value.user.creditAvailable.daily)

});
</script>

<template>
  <v-card width="80vw" max-width="50rem" v-if="data">
    <v-card-title >
      <v-avatar :image=avatar></v-avatar>
      {{ data.user.username }}

    </v-card-title>
    <v-card>
    <v-card-text>Credit available:</v-card-text>

    <div class="text-caption">Daily: {{data.user.creditAvailable.daily}}</div>
    <v-progress-linear
        :model-value=data.user.creditAvailable.daily
        color="blue-grey"
        height="15"
        rounded
    ></v-progress-linear>
    <div class="text-caption">Weekly: {{data.user.creditAvailable.weekly}}</div>
    <v-progress-linear
        :model-value=data.user.creditAvailable.weekly
        color="amber"
        height="15"
        rounded
    ></v-progress-linear>
    <div class="text-caption">Monthly: {{data.user.creditAvailable.monthly}}</div>
    <v-progress-linear
        :model-value=data.user.creditAvailable.monthly
        color="light-blue"
        height="15"
        rounded
    ></v-progress-linear>
    </v-card>
  </v-card>
  <br>

  <v-menu
      :close-on-content-click="true"
      v-model="menu"

  >
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">Allegati</v-btn>
    </template>
    <v-card min-width="300">

      <v-list>
        <v-list-item>
          <v-file-input
              :rules="rules"
              label="Carica l'immagine"
              variant="filled"
              prepend-icon="mdi-camera"
              accept="image/*"
              v-model="newAvatar"
          ></v-file-input>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="changeAvatar">Carica</v-btn>
        <v-btn @click="menu = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>


  <v-btn @click="topUp(10000)">Top Up</v-btn>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>Quanto vuoi ricaricare?</v-card-title>
      <v-card-text><v-text-field v-model="amount"></v-text-field></v-card-text>
    </v-card>
  </v-dialog>
  <v-btn
      append-icon="mdi-logout"
      @click="logout">Logout</v-btn>
  <v-snackbar v-model="success" :timeout="3000" color="primary"  rounded="pill">Caricato con successo</v-snackbar>
  <v-snackbar v-model="errore" :timeout="3000" color="red"  rounded="pill">Errore, riprovare più tardi</v-snackbar>


</template>

<style scoped>

</style>