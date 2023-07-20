<template>

    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="12" lg-="4">
                <v-card>
                    <v-card-title class="justify-center">
                        <h2>Resgistrazione</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit="register">
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

                            <v-btn type="submit">Resgitra</v-btn>
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


const username = ref('');
const password = ref('');
const UserType = ref('');
const error = ref('');

const router = useRouter();

async function register() {
    try {
        const response = await axios.post('http://127.0.0.1:3000/users/regUser', {
            username: username.value,
            password: password.value,
        });
        console.log(response.data);
    } catch (e) {
        error.value = e.response?.data?.message || 'Register failed';
    }
}

</script>

<style scoped>

</style>