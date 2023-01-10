<script setup lang="ts">
import EVMStatus from './ui/EVMStatus.svg.vue'
import { mapState } from 'pinia'
import svgContainer from './layouts/svgContainer.vue'
import btn from './ui/button-basic.svg.vue'
import LoadingBar from './ui/LoadingBar.svg.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
import { useEVM } from "../stores/evm"

import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'

import GameConnect from './ui/GameConnet.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      avatar: useAvatar(),
      routing: useRouting(),
      galaxy: useGalaxy(),
      evm: useEVM(),
      readyToPlay: false
    }
  },
  async mounted() {
    if (this.isConnected) {
      await this.init()
    }
  },
  watch: {
    async block(newVal, oldVal) {
      if (this.avatar.connected) {
        await this.avatar.getAll()
      }
      if (this.galaxy.connected) {
        await this.galaxy.getAll()
      }
      this.evm.getBalance()
    },
    async isConnected(newVal, oldVal) {
      if (!oldVal && newVal) {
        this.init()
      }
    }
  },
  methods: {
    async init() {
      await this.avatar.connect()
      await this.galaxy.connect()
      await this.avatar.getAll()
      await this.galaxy.getAll()
    },
    openNewWindow(url:string) {
      window.open(url)
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected']),
    loadingPercentage() {
      if (!this.evm.isConnected) {
        return 0
      } else if (!this.evm.isSuppportedNetwork) {
        return 45
      } else if (!this.avatar.isConnected) {
        return 55
      } else if (!this.galaxy.isConnected) {
        return 65
      } else if (!this.avatar.isLoaded) {
        return 75
      } else if (!this.galaxy.isLoaded) {
        return 85
      } else {
        return 100
      }
    }
  }
}
</script>

<template>
<svgContainer>
  <SpaceBackground  />
  <GameConnect v-if="!readyToPlay" @readyToPlay="this.readyToPlay = true" />
  <g v-else>
  </g>
  <g>
    <EVMStatus />
  </g>
</svgContainer>
</template>

<style scoped>
</style>
