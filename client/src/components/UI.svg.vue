<script setup lang="ts">
import FPS from './ui/FPS.svg.vue'
import Debug from './ui/Debug.svg.vue'

import UIHome from './UIHome.svg.vue'
import UISettings from './UISettings.svg.vue'

import { useUI } from '../stores/ui'
import { useWorld } from '../stores/world'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      world: useWorld(),
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>
  <g v-if="ui.showMenu">
    <g v-if="ui.menu == 'home'">
      <UIHome />
    </g>

    <g v-if="ui.menu == 'settings'">
      <UISettings />
    </g>
  </g>

  <g v-if="ui.showFPS">
    <FPS />
  </g>

  <g v-if="ui.showDebug">
    <Debug />
  </g>

</template>

<style scoped>
</style>
