<script setup lang="ts">
import Configuration from './components/Configuration.vue'
import NetworkSelect from './components/NetworkSelect.vue'
import Settings from './components/Settings.vue'
import Splash from './components/Splash.vue'
import Play from './components/Play.vue'
import { useRouting } from './stores/routing'
const routing = useRouting()
</script>

<template>
  <Splash v-if="routing.isScreen('splash')"/>
  <Settings v-if="routing.isScreen('settings')"/>
  <NetworkSelect v-if="routing.isScreen('network')"/>
  <Configuration v-if="routing.isScreen('configuration')"/>
  <Play v-if="routing.isScreen('play')" />
</template>

<style lang="scss">
body {
  @import url('https://fonts.googleapis.com/css?family=Ubuntu');
  font-family: 'Ubuntu', sans-serif;
  background: var(--color-bg);
  color: var(--color-light);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
#app {
  text-align: center;
}
.canclick:hover {
  cursor: pointer;
}
</style>


<style lang="scss">
//Default Theme
:root {
  --color-bg: #000000;
  --color-text: #ffffff;
  --color-btn-text: #000000;
}

//Orbiter 8 Theme
[data-theme="orbiter8"] {
  --color-bg: #310e5c;
  --color-light: #c3b3da;
  --color-btn: #ffffff;
}

//Test Theme
[data-theme="evil"] {
  --color-bg: #440000;
}
</style>
