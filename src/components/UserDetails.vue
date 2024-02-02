<script setup lang="ts">

import {apiClient, getUserInfo, topUp} from "./utilities.ts"
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const data = ref()
const router = useRouter();
const dialog = ref(false)
const amount = ref()
const avatar = ref()
const newAvatar = ref()
const success = ref()
const errore = ref()
const chooseSMM = ref(false)
const menu = ref(false)
const smmList = ref()
const choosedSMM = ref()
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

function goToModeratore() {
  const confirmation = window.confirm('Vuoi andare sulla pagina del moderatore?');
  if (confirmation) {
    window.location.href = 'http://localhost:63342/mod/index.html?_ijt=nf22vifuapdo5dn05s8ugjm07q';
  }

}

function goToSMM() {
  const confirmation = window.confirm('Vuoi andare sulla pagina del SMM?');
  if (confirmation) {
    window.location.href = 'http://localhost:5174/';
  }

}

const rules = [
  (value: any) => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'

  }
]

async function getSMM_list() {
  const token = localStorage.getItem('token');
  try {
    const res = await apiClient.get('/social/get_SMM_list', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data.smms.map((item:any) => item.username)
  } catch (error) {
    console.log(error)
  }


}

async function makeReqToSMM(smm: string) {
  const token = localStorage.getItem('token');

  let formData = new FormData()
  formData.append('receiver', smm)

  await apiClient.post('/social/choose_smm', formData,
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

async function changeAvatar() {
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
  smmList.value = await getSMM_list()
  console.log(smmList.value);

  console.log(data.value.squeals);
  if (data.value.accountType === 'smm') {
    goToSMM()
  }
  if (data.value.accountType === 'mod') {
    goToModeratore()
  }
  console.log(data.value.user.creditAvailable.daily)

});
</script>

<template>
  <v-card width="80vw" max-width="50rem" v-if="data">
    <v-card-title>
      <v-avatar :image=avatar></v-avatar>
      {{ data.user.username }}

    </v-card-title>
    <v-card>
      <v-card-text>Credit available:</v-card-text>
      <div class="text-caption">Daily: {{ data.user.creditAvailable.daily }}</div>
      <v-progress-linear
          :model-value=data.user.creditAvailable.daily
          color="blue-grey"
          height="15"
          rounded
      ></v-progress-linear>
      <div class="text-caption">Weekly: {{ data.user.creditAvailable.weekly }}</div>
      <v-progress-linear
          :model-value=data.user.creditAvailable.weekly
          color="amber"
          height="15"
          rounded
      ></v-progress-linear>
      <div class="text-caption">Monthly: {{ data.user.creditAvailable.monthly }}</div>
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
      <v-btn v-bind="props">Cambia Foto profilo</v-btn>
    </template>

    <v-card min-width="300">
      <br>
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
            @click="changeAvatar">Carica
        </v-btn>
        <v-btn @click="menu = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>

  <v-btn @click="dialog = true">Ricarica</v-btn>

  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>Quanto vuoi ricaricare?</v-card-title>
      <v-card-text>
        <v-text-field v-model="amount">

        </v-text-field>
        <v-btn @click="topUp(amount)">Top Up</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-btn @click="chooseSMM = true">Scegli SMM</v-btn>

  <v-dialog v-model="chooseSMM" width="500">
    <v-card>
      <v-card-title>Quale SMM vuoi scegliere?</v-card-title>
      <v-card-text>
        <v-select
            v-if="smmList"
            chips
            label="Select"
            :items=smmList
            v-model=choosedSMM
            variant="outlined"
        ></v-select>
        <v-btn @click="makeReqToSMM(choosedSMM)">select</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-btn
      append-icon="mdi-logout"
      @click="logout">Logout
  </v-btn>
  <v-snackbar v-model="success" :timeout="3000" color="primary" rounded="pill">Caricato con successo</v-snackbar>
  <v-snackbar v-model="errore" :timeout="3000" color="red" rounded="pill">Errore, riprovare più tardi</v-snackbar>


</template>

<style scoped>

</style>