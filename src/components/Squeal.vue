<script setup lang="ts">

import {ref} from "vue";
import {useRoute} from "vue-router";

const { params } = useRoute()

const SquealID = ref(params.id)

console.log(SquealID)

</script>

<template>
<p> {{ $route.params.id}}</p>
  <p>lalal</p>>
</template>

<style scoped>

</style>