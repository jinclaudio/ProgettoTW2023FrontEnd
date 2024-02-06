<script setup lang="ts">

import { ref, defineEmits } from 'vue'
import {search} from "./utilities.ts";
const searchKey = ref()
const open= ref()

const emit = defineEmits(['search-completed']);

const searchData = async (searchKy:any)=>{
  const res =  await search(searchKy);
  emit('search-completed', res)
}

</script>

<template>

  <v-dialog v-model="open" >
    <v-card>
      <v-card-title>Search</v-card-title>
      <v-card-text>
        <v-text-field v-model="searchKey">

        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="searchData(searchKey)">Cerca</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<style scoped>

</style>