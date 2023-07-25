<template>

    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="12" lg-="4">
                <v-card>
                    <v-card-title class="justify-center">
                        <h2>Resgistrazione</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    v-model="username"
                                    label="Username"
                                    required
                            ></v-text-field>

                            <v-text-field
                                    v-model="password"
                                    label="Password"
                                    type="password"
                                    required
                            ></v-text-field>

                            <v-btn @click="register">Resgitra</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup lang="ts">

import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';


const username = ref('abc');
const password = ref('efg');
const UserType = ref('');
const error = ref('');

const router = useRouter();

async function register() {

  axios.post('http://127.0.0.1:3000/users/regUser', {
            username: username.value,
            password: password.value,
        })
      .then(res=>{
        console.log(res)
      });


}

</script>

<style scoped>

</style>