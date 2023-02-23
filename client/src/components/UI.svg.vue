<script setup lang="ts">
import FPS from './ui/FPS.svg.vue'
import Debug from './ui/Debug.svg.vue'
import EVMStatus from './ui/EVMStatus.svg.vue'

import MenuTitle from './ui/MenuTitle.svg.vue'
import MenuSettings from './ui/MenuSettings.svg.vue'
import MenuConnect from './ui/MenuConnect.svg.vue'
import MenuShip from './ui/MenuShip.svg.vue'
import MenuAvatar from './ui/MenuAvatar.svg.vue'
import MenuGame from './ui/MenuGame.svg.vue'

import { useUI } from '../stores/ui'
import { useWorld } from '../stores/world'
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
    <MenuTitle  v-if="ui.menu == 'title'" />
    <MenuSettings  v-if="ui.menu == 'settings'" />
    <MenuConnect  v-if="ui.menu == 'connect'" />
    <MenuAvatar  v-if="ui.menu == 'avatar'" />
    <MenuShip  v-if="ui.menu == 'ship'" />
    <MenuGame  v-if="ui.menu == 'game'" />
  </g>

  <g v-if="ui.menu != 'connect'">
    <EVMStatus />
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
