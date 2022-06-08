<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { useTaco } from './stores/taco'
const taco = useTaco
</script>

<template>
  <HelloWorld msg="Orbiter 8" />
</template>

<style lang="scss">
body {
  background: var(--color-bg);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


<style lang="scss">
//Default Theme
:root {
  --color-bg: #ffffff;
}

//Orbiter 8 Theme
[data-theme="orbiter8"] {
  --color-bg: #310e5c;
}

//Test Theme
[data-theme="evil"] {
  --color-bg: #440000;
}
</style>
