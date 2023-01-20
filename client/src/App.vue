<script setup lang="ts">
import Settings from './components/Settings.vue'
import TitleScreen from './components/TitleScreen.vue'
import AssetViewer from './components/AssetViewer.vue'
import StoryA from './components/StoryA.vue'
import StoryB from './components/StoryB.vue'
import Avatars from './components/Avatars.vue'
import Galaxy from './components/Galaxy.vue'
import Play from './components/Play.vue'
import FourShips from './components/FourShips.vue'
import WindowView from './components/WindowView.vue'

import { useRouting } from './stores/routing'
import { useClock } from './stores/clock'

const routing = useRouting()
const clock = useClock()
clock.play()

</script>



<template>
  <TitleScreen v-if="routing.isScreen('title')"/>
  <StoryA v-if="routing.isScreen('storya')" />
  <StoryB v-if="routing.isScreen('storyb')" />
  <Settings v-if="routing.isScreen('settings')"/>
  <FourShips v-if="routing.isScreen('four')"/>
  <AssetViewer v-if="routing.isScreen('assets')" />
  <Avatars v-if="routing.isScreen('avatars')" />
  <Galaxy v-if="routing.isScreen('galaxy')" />
  <Play v-if="routing.isScreen('play')" />
  <WindowView v-if="routing.isScreen('window')" />


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
  text-decoration: underline;
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
  --color-bg: #000000;
  --color-light: #c3b3da;
  --color-btn: #ffffff;
}

//Test Theme
[data-theme="evil"] {
  --color-bg: #440000;
}
</style>
