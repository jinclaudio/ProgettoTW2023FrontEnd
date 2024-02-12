<script setup lang="ts">

import {onMounted, ref, computed} from "vue";
import {useRoute} from "vue-router";
import {
  getSingleSquealInfo,
  squealView,
  squealViewCount,
  getUserInfo,
  reply_get,
  like,
  dislike,
  reply,
  apiURL
} from "./utilities.ts";

const {params} = useRoute()

const SquealID = ref(params.id)
const User = ref()
const token = localStorage.getItem('token');

const showSnackbar = ref(false)
const SnackbarText = ref()
const data = ref()
const image = ref()
const avatar = ref()
const viewedCount = ref()
const replies = ref()
const ReplyDialog = ref(false)
const replyText = ref()
// const token = localStorage.getItem('token');

const getLikeColor = computed(() => {
  if (token && User.value.user.hasLiked.includes(String(SquealID.value))) {
    return 'red';
  }
  return '';
});

const getdisLikeColor = computed(() => {
  if (token && User.value.user.hasDisliked.includes(String(SquealID.value))) {
    return 'blue';
  }
  return '';
});

function toggleLike() {
  if (token) {
    like(String(SquealID.value))
    if (User.value.user.hasLiked.includes(String(SquealID.value))) {
      SnackbarText.value = "Hai già pi"
      return showSnackbar.value = true;
    } else {
      data.value.reaction.like++
      User.value.user.hasLiked.push(String(SquealID.value))
    }
  } else {
    SnackbarText.value = 'Si prega di fare Login prima di procedere'
    showSnackbar.value = true
  }
}

function toggleDislike() {
  if (token) {
    dislike(String(SquealID.value))
    if (User.value.user.hasDisliked.includes(String(SquealID.value))) {
      SnackbarText.value = "Hai già pi"
      return showSnackbar.value = true;
    } else {
      data.value.reaction.dislike++
      User.value.user.hasDisliked.push(String(SquealID.value))
    }
  }

}


onMounted(async () => {
  await squealView(String(SquealID.value));
  data.value = await getSingleSquealInfo(String(SquealID.value))
  data.value = data.value[0]
  console.log(data.value.reaction)
  viewedCount.value = await squealViewCount(String(SquealID.value))
  User.value = await getUserInfo()
  console.log(String(SquealID.value))
  console.log(data.value)
  replies.value = await reply_get(String(SquealID.value))
  console.log(replies.value)
  avatar.value = `${apiURL}/social/get_avatar?user=${User.value.user._id}`
  if (data.value.image !== null) {
    console.log(data.value)
    const filename = data.value.image
    image.value = `${apiURL}/social/get_image?image=${filename}`
  }
})

</script>


<template>


  <v-card
      style="padding-bottom: 2rem"
      class="mx-auto"
      align="left"
      v-if="data"
      :title=data.username
      width="50vw"
  >
    <template v-slot:prepend>
      <v-avatar :image=avatar></v-avatar>
    </template>

    <v-img
        :src=image
        cover
    ></v-img>
    <v-card-text v-if="typeof data.body === 'string'">
      {{ data.body }}
    </v-card-text>
    <v-card-text v-else-if="typeof data.body === 'object'">
      <div v-if="data.body.author">
        <u>Autore:</u>{{ data.body.author }}
      </div>
      <div>
        <u>Publicato il:</u> {{ data.body.publishedAt || data.body.date || null }}
      </div>
      <div>
        <u>Titolo:</u> {{ data.body.title }}
      </div>
      <div v-if="data.body.url">
        <u>Fonte:</u> <a :href="data.body.url">{{ data.body.url }}</a>
      </div>
      <div v-if="data.body.utl">
        <!--      <u>Fonte:</u> <a  :href="data.body.url">{{ data.body.url }}</a>-->
        <v-img :src=data.body.utl></v-img>
      </div>
    </v-card-text>
    <template v-slot:append>
      <div class="justify-self-end">
        <span class="me-1"></span>
      </div>
    </template>

    <v-card-actions>
      <v-spacer></v-spacer>

      <div class="justify-self-end">
        <v-icon

            icon="mdi-heart"
            :color="getLikeColor"
            @click="toggleLike()"
        >
        </v-icon>
        <span class="subheading me-2">{{ data.reaction.like }}</span>
        <v-icon
            icon="mdi-thumb-down"

            :color="getdisLikeColor"
            @click="toggleDislike()"
        >
        </v-icon>
        <span class="subheading me-2">{{ data.reaction.dislike }}</span>

        <span class="me-1"></span>
        <v-icon
        ></v-icon>
        <v-btn style="justify-self: right" class="" icon="mdi-pencil" @click="ReplyDialog = true"></v-btn>

      </div>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="ReplyDialog">
    <v-textarea v-model="replyText"
                variant="solo">
    </v-textarea>
    <v-btn @click="reply(replyText, '', data._id)">
      Send Comment
    </v-btn>
  </v-dialog>
  <v-timeline v-if="replies" side="end">
    <v-timeline-item
        v-for="item in replies.reply"
        :key="item._id"
    >
      <template v-slot:icon>
        <v-avatar :image="`${apiURL}/social/get_avatar?user=${data._id}`"></v-avatar>

      </template>
      <!--        {{ reply }}-->
      <v-card
          width="40vw"
      >
        <v-card-text>

          {{ item.body }}

        </v-card-text>
        <v-card-text v-if="item.replyTo">
          replay to: {{ item.replyTo }}

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn size="small" icon="mdi-pencil" @click="ReplyDialog = true"></v-btn>
          <v-dialog v-model="ReplyDialog">
            <v-textarea v-model="replyText"
                        variant="solo">
            </v-textarea>
            <v-btn @click="reply(replyText, item._id , data._id)">
              Send Comment
            </v-btn>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>


  <!--  <v-img :src="avatar"></v-img>-->
</template>

<style scoped>

</style>