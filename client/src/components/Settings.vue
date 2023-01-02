<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import btn from './ui/button-basic.svg.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'


import LogoOrbiter8 from './assets/sprites/LogoOrbiter8.svg.vue'
import LogoPartavate from './assets/sprites/LogoPartavate.svg.vue'

import MinervaScreen from './assets/sprites/MinervaScreen.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
    }
  },
  mounted() {
  },
}
</script>

<template>
  <svgContainer>
  <g>
    <SpaceBackground  transform="scale(1)" />
  </g>

  <g transform="translate(0 -25) scale(2)">
    <MinervaScreen />
  </g>
    <LogoPartavate  :transform="'translate(0 ' + (ui.bottom - 25) + ') scale(0.1)'" />

  <g  font-size="12px" :transform="'translate(0 ' + (ui.bottom - 50) + ')'">
        <btn
          :width="120" :height="20"
          text="close"
           @click="routing.switchScreen('title')"
          transform="translate(0 -25)" />
      </g>
  </svgContainer>
</template>

<style scoped>
</style>
