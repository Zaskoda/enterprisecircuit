<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import LogoOrbiter8 from './assets/sprites/LogoOrbiter8.svg.vue'
import btn from './ui/button-basic.svg.vue'
import web3Containment from './containment/web3Containment.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
import { useAvatar } from '../stores/avatar'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      avatar: useAvatar(),
      routing: useRouting(),
    }
  },
  methods: {
    async init() {
      await this.avatar.connect()
      await this.avatar.getAll()
    },
    async createAvatar() {
      const name = prompt('What name?')
      await this.avatar.createAvatar(name)
    }
  }
}
</script>

<template>
<svgContainer>
  <SpaceBackground  />
  <web3Containment :restricted="true">

    <g transform="translate(0 -100)">
      <g transform="scale(0.15)">
        <LogoOrbiter8 />
      </g>
    </g>
    <text fill="#888888">Game goes here!</text>

    <g  font-size="12px" :transform="'translate(0 ' + (ui.bottom - 40) + ')'">
      <btn
        :width="120" :height="20"
        text="close"
          @click="routing.switchScreen('title')"
      />
    </g>
  </web3Containment>
</svgContainer>
</template>

<style scoped>
</style>
