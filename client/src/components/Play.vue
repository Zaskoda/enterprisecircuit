<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import LogoOrbiter8 from './sprites/LogoOrbiter8.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import web3Containment from './containment/web3Containment.vue'
import SpaceBackground from './sprites/SpaceBackground.svg.vue'

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
  <web3Containment>

    <g :transform="'translate(0 ' + (ui.top + 80) + ')'">
      <g transform="scale(0.25)">
      <LogoOrbiter8 />
      </g>
      <g transform="translate(0 100)">
        <text fill="#888">Avatar Count: <tspan fill="#ffffff" font-weight="bold">{{ avatar.chainstate.avatarCount }}</tspan></text>
      </g>
    </g>

    <g v-if="!avatar.connected">
      <btn :width="210" :height="50" @click="init()" font-size="20" :text="'Load Data'"  />
    </g>
    <g v-else>
      <btn :width="210" :height="50" @click="init()" font-size="20" :text="'Reload Data'"  />
      <g transform="translate(0 100)">
        <g v-if="!avatar.chainstate.haveAvatar">
          <g transform="translate(0 -30)">
            <text>You have no avatar.</text>
          </g>
          <btn :width="140" :height="24" @click="createAvatar()" font-size="14" :text="'Create Avatar'"  />
        </g>
        <g v-else>
          <g transform="translate(0 -30)">
            <text>My Avatar Name: {{ avatar.chainstate.myAvatarName }}</text>
          </g>
          <g transform="translate(0 0)">
            <text>My Avatar Id: {{ avatar.chainstate.myAvatarId }}</text>
          </g>
        </g>
      </g>
    </g>

  </web3Containment>

  <g  font-size="12px" :transform="'translate(0 ' + (ui.bottom - 70) + ')'">
        <btn
          :width="120" :height="20"
          text="network"
           @click="routing.switchScreen('network')"
           />
      </g>
  <g  font-size="12px" :transform="'translate(0 ' + (ui.bottom - 40) + ')'">
        <btn
          :width="120" :height="20"
          text="close"
           @click="routing.switchScreen('title')"
           />
      </g>
</svgContainer>
</template>

<style scoped>
</style>
