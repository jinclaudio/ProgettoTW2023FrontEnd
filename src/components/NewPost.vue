<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {fetchCreditAvailable, getChannels, apiClient, useCredit} from "./utilities.ts";

const text = ref('');
const credit = ref()
const creditUsage = computed(() => {
  const imageDim = image.value ? 1000 : 0
  return text.value.length + imageDim
})
const dest = ref()
const image = ref()
const errore = ref()
const success = ref()
const channelList = ref()
const channelSelected = ref()

async function postASqueal() {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('body', text.value);
  formData.append('destinatari', dest.value);
  formData.append('channel', channelSelected.value);
  if (image.value !== undefined){  formData.append('image', image.value[0])}
  await apiClient.post('/social/squeal_post', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        success.value = true
        console.log("Response: ", response.data)
      })
      .catch(error => {
        errore.value = true
        console.error("Error:", error);
      })

}



onMounted(async () => {
  credit.value = await fetchCreditAvailable();
  channelList.value = await getChannels("P");
  for (let i in channelList.value){
    channelList.value[i] = channelList.value[i].name
  }
  console.log(channelList.value[0])
  console.log(credit.value.daily);

});
console.log(credit.value)
// dest.value = '@nico'
</script>

<template>
  <v-container class="bg-surface">
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2 pa-2" width="60vw" min-width="100%">
          <v-form>
            <v-textarea v-if="credit"
                                  v-model="text"
                                  :counter="credit.daily"
                                  label="Testo"
                                  required
                      ></v-textarea>

            <v-text-field label="Destinatari" v-model="dest">
            </v-text-field>
            <v-select v-if="channelList" label="Canale"
                      v-model="channelSelected"
                      :items="channelList"
                      clearable
            ></v-select>

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">Allegati</v-btn>
              </template>
              <v-card min-width="300">
              <v-list>
                <v-list-item>
                  <v-file-input
                      label="Carica l'immagine"
                      variant="filled"
                      prepend-icon="mdi-camera"
                      accept="image/*"
                      v-model="image"
                  ></v-file-input>
                </v-list-item>
              </v-list>
              </v-card>
            </v-menu>

            <v-btn @click="postASqueal" @keyup.enter="postASqueal"
                   block class="mt-2">Pubblica
            </v-btn>
            <v-snackbar v-model="success" :timeout="3000" color="primary"  rounded="pill">Pubblicato con successo</v-snackbar>
            <v-snackbar v-model="errore" :timeout="3000" color="red"  rounded="pill">Errore, riprovare più tardi</v-snackbar>

          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
<!--      <v-sheet width="600"/>-->
    {{ creditUsage}}
    </v-container >

</template>

<style scoped>

</style>