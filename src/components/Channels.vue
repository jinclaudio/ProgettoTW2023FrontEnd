<script setup lang="ts">
import {subscribeToChannel, unsubscribeToChannel, getChannels, getUserInfo, create_channel} from "./utilities";
import { onMounted, ref} from "vue";

const channelListOfficial = ref()
const channelListPrivate = ref()
const tab = ref(null)
const user = ref()
const dialog = ref(false)
const newChanName = ref()
const newChanDesc = ref()
const channelsIn = ref()


onMounted(async () => {
  channelListOfficial.value = await getChannels('O')
  channelListPrivate.value = await getChannels('P')
  // SquealsInAChannel.value = await getSquealsInAChannel()
  user.value = await getUserInfo()
  channelsIn.value = channelListPrivate.value.channelsIn

  console.log(channelListPrivate.value)
  console.log(channelsIn.value)
})

</script>


<template>


  <v-tabs
      v-model="tab"
      fixed-tabs
      bg-color=""
      height="100vh"
  >
    <v-tab value="one">Official</v-tab>
    <v-tab value="two">Private</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="one">
      <v-list
          v-if="channelListOfficial"
          v-for="channel in channelListOfficial.channels" :key="channel"
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
            Followers: {{ channel.members.length }}
          </v-card-subtitle>

          <v-card-text>
            <div>Type of Channel: {{ channel.typeOf }}</div>
            <div>Squeal Nums: {{ channel.SquealNum }}</div>
          </v-card-text>

          <v-card-actions>


            <v-btn color="orange" :to="{name: 'channel_squeals', params: { id: channel._id }}"
            >
              Explore
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-list>
    </v-window-item>

    <v-window-item value="two">

      <v-list
          v-if="channelListPrivate"
          v-for="channel in channelListPrivate.channelsAll" :key="channel"
      >
        <v-btn @click="dialog = true">Crea un nuovo canale</v-btn>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-text>
              <v-text-field
                  label="nome" v-model="newChanName"
              >
              </v-text-field>
              <v-text-field label="descrizione" v-model="newChanDesc"></v-text-field>
              <v-btn @click="create_channel(newChanName.value, newChanDesc.value)">Top Up</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
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
            <div>Squeal Nums: {{ channel.SquealNum }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" @click="subscribeToChannel(channel._id)">
              Subscibe
            </v-btn>

            <v-btn
                v-if="channelsIn.some( (item:any) => item._id === channel._id)"
                color="orange"
                :to="{name: 'channel_squeals', params: { id: channel._id }}"
            >
              Explore
            </v-btn>
            <v-btn
                v-if="channelsIn.some( (item:any) => item._id === channel._id)"
                color="orange"
                @click="unsubscribeToChannel(channel._id)"
            >
              Unsubscribe
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-list>
    </v-window-item>

  </v-window>


</template>

<style scoped>

</style>