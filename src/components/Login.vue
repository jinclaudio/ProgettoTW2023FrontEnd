<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="12" lg-="4">
                <v-card>
                    <v-card-title class="justify-center">
                        <h2>Resgistrazione</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit="login">
                            <v-text-field
                                    v-model="username"
                                    label="Username"
                                    placeholder="Inserisci il nome utente"

                            ></v-text-field>

                            <v-text-field
                                    v-model="password"
                                    label="Password"
                                    placeholder="inserisci la password"
                                    type="password"
                                    required
                            ></v-text-field>
                            <v-btn type="submit" class="mr-3" color="primary">Login</v-btn>
                            <v-btn>Registra</v-btn>
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
const error = ref('');

const router = useRouter();

async function login() {
    try {
        const response = await axios.post('http://127.0.0.1:3000/users/login', {
            username: username.value,
            password: password.value,
        });
        console.log(response.data);
    } catch (e) {
        error.value = e.response?.data?.message || 'Login failed';
    }
};


</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /*background-color: cornflowerblue;*/
}

</style>
