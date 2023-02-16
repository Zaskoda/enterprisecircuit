<script setup lang="ts">
import { mapState } from 'pinia'
import World from './World.svg.vue'
import RegisterAvatar from './RegisterAvatar.svg.vue'
import RegisterShip from './RegisterShip.svg.vue'

import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'
import { useEVM } from "../stores/evm"
import { useWorld } from "../stores/world"
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      routing: useRouting(),
      evm: useEVM(),
      world: useWorld(),
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
      await this.world.loadFromNetwork()
    },
    openNewWindow(url:string) {
      window.open(url)
    }
  }
}
</script>

<template>
  <RegisterAvatar v-if="!world.avatar.haveAvatar" />
  <RegisterShip v-else-if="!world.galaxy.haveShip" />
  <World v-else />
</template>

<style scoped>
</style>
