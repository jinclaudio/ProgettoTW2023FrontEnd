<script setup lang="ts">

import { getUserInfo, topUp} from "./utilities.ts"
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const data = ref()
const router = useRouter();
const dialog = ref()
const amount = ref()
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
    window.location.href = 'http://localhost:63342/mod/index.html?_ijt=nf22vifuapdo5dn05s8ugjm07q'; // 将 'https://www.example.com' 替换为目标网站的URL
  }

}

onMounted(async () => {
  data.value = await getUserInfo(User.value);
  console.log(data.value);
  if (data.value.accountType === 'mod'){ goToModeratore()}
  console.log(data.value.creditAvailable.daily)

});
</script>

<template>

  <v-card width="80vw" v-if="data">
    <v-card-title >
      {{ data.username }}

    </v-card-title>
    <v-card width="100%">
    <v-card-text>Credit available:</v-card-text>

    <div class="text-caption">Daily: {{data.creditAvailable.daily}}</div>
    <v-progress-linear
        :model-value=data.creditAvailable.daily
        color="blue-grey"
        height="15"
        rounded
    ></v-progress-linear>
    <div class="text-caption">Weekly: {{data.creditAvailable.weekly}}</div>
    <v-progress-linear
        :model-value=data.creditAvailable.weekly
        color="amber"
        height="15"
        rounded
    ></v-progress-linear>
    <div class="text-caption">Monthly: {{data.creditAvailable.monthly}}</div>
    <v-progress-linear
        :model-value=data.creditAvailable.monthly
        color="light-blue"
        height="15"
        rounded
    ></v-progress-linear>
    </v-card>
  </v-card>
  <br>
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
</template>

<style scoped>

</style>