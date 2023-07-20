<script setup lang="ts">
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Squeal from "./components/Squeal.vue";
</script>

<template>

    <Login/>
    <Register/>
    <Squeal
            messaggio="Questo è un messaggio di prova"/>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
