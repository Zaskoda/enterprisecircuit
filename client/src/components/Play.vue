<script setup lang="ts">
import EVMStatus from './ui/EVMStatus.svg.vue'
import { mapState } from 'pinia'
import svgContainer from './layouts/svgContainer.vue'
import World from './World.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
import { useEVM } from "../stores/evm"

import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'
import btn from './ui/button-basic.svg.vue'

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
      if ((newVal) && (!oldVal)) {
        this.loadChainData()
      }
    },
    chainId() {
      this.readyToPlay = false
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected']),
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
  }
}
</script>

<template>
<svgContainer>
  <g v-if="!readyToPlay">
    <GameConnect @readyToPlay="this.readyToPlay = true" />
  </g>
  <g v-else>
    <World />
    <g  font-size="42px" :transform="'translate(0 ' + (ui.bottom - 20) + ')'">
      <g :transform="'scale(' + ui.UIScale + ')'">
        <btn
          :width="200" :height="60"
          text="Title"
            @click="routing.switchScreen('title')"
          transform="translate(0 -80)" />
      </g>
    </g>
  </g>
  <EVMStatus />
</svgContainer>
</template>

<style scoped>
</style>
