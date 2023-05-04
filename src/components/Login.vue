<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <div class="form-item">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" required />
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button class="login-button" type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface LoginForm {
  username: string;
  password: string;
}
export default defineComponent({
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');

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
    }

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
}

form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label {
  font-size: 16px;
  margin-right: 10px;
}

input {
  flex: 1;
  height: 30px;
  border: none;
  border-radius: 3px;
  padding: 5px;
}

button.login-button {
  margin-top: 20px;
  height: 40px;
  font-size: 18px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
