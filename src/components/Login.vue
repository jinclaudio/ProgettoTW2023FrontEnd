<template>
  <div class="login-container">
  <el-form label-width="120px">
      <el-form-item label="Username">
        <el-input v-model="username" placeholder="Inserisci il nome utente" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" placeholder="inserisci la password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
        <el-button>Register</el-button>
      </el-form-item>
    </el-form>
  </div>
  </template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'Login',
  setup() {

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




    return {
      username,
      password,
      error,
      login,

    };
  },
});
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
