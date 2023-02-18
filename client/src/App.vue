<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'

import TitleScreen from './components/TitleScreen.vue'
import AssetViewer from './components/AssetViewer.vue'
import StoryA from './components/StoryA.vue'
import StoryB from './components/StoryB.vue'
import Avatars from './components/Avatars.vue'
import Galaxy from './components/Galaxy.vue'
import Play from './components/Play.vue'
import FourShips from './components/FourShips.vue'
import WindowView from './components/WindowView.vue'

import UI from './components/UI.svg.vue'

import { useRouting } from './stores/routing'
import { useClock } from './stores/clock'

const routing = useRouting()
const clock = useClock()
clock.play()

</script>

<template>

  <svgContainer>

    <TitleScreen v-if="routing.is('title')"/>
    <TitleScreen v-if="routing.is('settings')"/>

    <Play v-if="routing.is('play')" />

    <StoryA v-if="routing.is('storya')" />
    <StoryB v-if="routing.is('storyb')" />
    <FourShips v-if="routing.is('four')"/>
    <AssetViewer v-if="routing.is('assets')" />
    <Avatars v-if="routing.is('avatars')" />
    <Galaxy v-if="routing.is('galaxy')" />
    <WindowView v-if="routing.is('window')" />

    <UI />

  </svgContainer>

</template>

<style lang="scss">
body {
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
  --color-bg: #000000;
  --color-light: #c3b3da;
  --color-btn: #ffffff;
}

//Test Theme
[data-theme="evil"] {
  --color-bg: #440000;
}
</style>
