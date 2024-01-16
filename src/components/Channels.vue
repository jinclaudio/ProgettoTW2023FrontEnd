<script setup lang="ts">
import {getChannels} from "./utilities";
import {onMounted, ref} from "vue";

const channelListOfficial = ref()
const channelListPrivate = ref()
const tab = ref(null)

onMounted(async () => {
  channelListOfficial.value = await getChannels('O')
  channelListPrivate.value = await getChannels('P')

  console.log(channelListOfficial.value)
})

</script>


<template>


  <v-tabs
      v-model="tab"
      fixed-tabs
      bg-color=""
  >
    <v-tab value="one">Official</v-tab>
    <v-tab value="two">Private</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="one">
      <v-list
          v-if="channelListOfficial"
          v-for="channel in channelListOfficial" :key="channel"
      >
        <v-card
            class="mx-auto"
            width="80vw"
            max-width="50rem"
        >
          <v-img
              class="align-end text-white"
              height="200"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              cover
          >
            <v-card-title>{{ channel.name }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            Followers: {{ channel.followers }}
          </v-card-subtitle>

          <v-card-text>
            <div>Type of Channel: {{ channel.typeOf }}</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange">
              Share
            </v-btn>

            <v-btn color="orange">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-list>
    </v-window-item>

    <v-window-item value="two">
      Two
    </v-window-item>

  </v-window>


</template>

<style scoped>

</style>