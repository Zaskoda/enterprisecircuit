<script setup lang="ts">
import EVMStatus from './ui/EVMStatus.svg.vue'
import { mapState } from 'pinia'
import svgContainer from './layouts/svgContainer.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'
import World from './World.svg.vue'

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
      this.loadChainData()
    }
  },
  watch: {
    async block(newVal, oldVal) {
      console.log('new block: ' + newVal + ' ' + oldVal)
      this.loadChainData()
    },
    async isConnected(newVal, oldVal) {
      if (!oldVal && newVal) {
        //this.loadChainData()
      }
    },
    chainId() {
      this.readyToPlay = false
    }
  },
  methods: {
    async loadChainData() {
      this.evm.getBalance()
      if (this.avatar.isConnected) {
        await this.avatar.getAll()
      }
      if (this.galaxy.isConnected) {
        await this.galaxy.getAll()
      }
    },
    openNewWindow(url:string) {
      window.open(url)
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected', 'chainId']),
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
  <g v-if="!readyToPlay">
    <GameConnect @readyToPlay="this.readyToPlay = true" />
  </g>
  <g v-else>
    <World />
  </g>
  <EVMStatus />
</svgContainer>
</template>

<style scoped>
</style>
