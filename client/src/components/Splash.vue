<script setup lang="ts">
import htmlContainer from './layouts/htmlContainer.vue'
import { useRouting } from '../stores/routing'
const routing = useRouting()
</script>

<template>
  <htmlContainer>
    <h1>I am a splash screen.</h1>
    <p>The intention is to have a cool, short, skippleable opening animation here.</p>
    <p>
      <button @click="routing.switchScreen('network')">Continue</button>
    </p>
  </htmlContainer>
</template>

<style scoped>
</style>
