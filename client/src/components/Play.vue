<script setup lang="ts">
import { mapState } from 'pinia'
import World from './World.svg.vue'
import RegisterAvatar from './RegisterAvatar.svg.vue'
import RegisterShip from './RegisterShip.svg.vue'

import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'
import { useEVM } from "../stores/evm"
import { useWorld } from "../stores/world"
import { useUI } from "../stores/ui"
import { onBeforeMount } from 'vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      routing: useRouting(),
      evm: useEVM(),
      world: useWorld(),
      ui: useUI(),
    }
  },
  async onBeforeMount() {
  },
  async mounted () {
    this.ui.showMenu = false
    if (this.isConnected) {
      await this.loadChainData()
    }
    if (!this.world.avatar.haveAvatar) {
      this.ui.changeMenu('avatar')
    } else if (!this.world.galaxy.haveShip) {
      this.ui.changeMenu('ship')
    } else {
      this.ui.changeMenu('game')
    }
    this.ui.showMenu = true
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
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected']),
  },
  methods: {
    async loadChainData() {
      this.evm.getBalance()
      await this.world.loadFromNetwork()
      await this.world.loadEntities()
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
  <g v-else-if="world.isLoaded">
    <World />
  </g>
</template>

<style scoped>
</style>
