<template>
  <div class="register-container">
    <el-form label-width="120px">
      <el-form-item label="Username">
        <el-input v-model="username" placeholder="Inserisci il nome utente" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" placeholder="inserisci la password"/>
      </el-form-item>
      <el-form-item label="UserType" prop="region">
        <el-select v-model="UserType" placeholder="il tipo di utente">
          <el-option label="Utente normale" value="Normal" />
          <el-option label="Manager" value="Manager" />
        </el-select>
      </el-form-item>

        <el-form-item>
        <el-button @click="register">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {defineComponent, ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'Register',
  setup() {

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

    return {
      username,
      password,
      UserType,
      error,
      register,
    };
  },
});


</script>

<style scoped>

</style>