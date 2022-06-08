<script setup lang="ts">
import { ref } from 'vue'
// taco is not a real store, it's a placeholder
import { useTaco } from '../stores/taco'

defineProps<{ msg: string }>()

const count = ref(0)

const taco = useTaco()

</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <p @click="taco.connect()">Connected: {{ taco.hasWallet }}</p>
</template>

<style scoped>
a {
  color: #ffffff;
}
</style>
