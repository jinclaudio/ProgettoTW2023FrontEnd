<script setup lang="ts">

import { getUserInfo, topUp} from "./utilities.ts"
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const data = ref()
const router = useRouter();
const dialog = ref()
const amount = ref()
const avatar = ref()

const page = ref(1)
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

onMounted(async () => {
  data.value = await getUserInfo();
  avatar.value = `http://localhost:3000/social/get_avatar?image=${data.value.user.image}`

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
<!--<v-card v-if="data" width="50rem">-->
<!--  <v-data-iterator :height="300" :items="data.squeals">-->
<!--    <template v-slot:default="{items}">-->
<!--      <v-list-->
<!--          v-for="(item) in data.squeals"-->
<!--      >-->
<!--&lt;!&ndash;        {{item.body }}&ndash;&gt;-->
<!--        <v-card :v-bind="item.body"></v-card>-->

<!--        <br>-->
<!--      </v-list>-->
<!--    </template>-->
<!--  </v-data-iterator>-->

<!--</v-card>-->

</template>

<style scoped>

</style>