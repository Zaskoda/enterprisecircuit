<script setup lang="ts">
import { mapState } from 'pinia'
import svgContainer from './layouts/svgContainer.vue'
import btn from './ui/button-basic.svg.vue'
import web3Containment from './containment/web3Containment.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
import { useEVM } from "../stores/evm"

import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      avatar: useAvatar(),
      routing: useRouting(),
      galaxy: useGalaxy(),
      evm: useEVM()
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected'])
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
    }
  }
}
</script>

<template>
<svgContainer>
  <SpaceBackground  />
  <web3Containment :restricted="true">
    <g v-if="!galaxy.connected || !avatar.connected">
      <text transform="translate(0 -100)">need to connect contracts</text>
      <btn :width="210" :height="50" @click="init()" font-size="20" :text="'Load Data'"  />
    </g>
    <g v-else font-size="14px">

      <text transform="translate(0 -200)">status bar</text>
      <text transform="translate(0 -140)">current network: {{ evm.chain.name }}</text>
      <text transform="translate(0 -100)">user balance: {{ evm.balance }} {{ evm.currencyData.symbol }}</text>
      <text
        class="clickable"
        transform="translate(0 -80)">
          Get more {{ evm.currencyData.symbol }}:
          <tspan v-for="faucet in evm.facuets">
              {{ faucet.name }} {{ faucet.url }}
          </tspan>
      </text>
      <text transform="translate(0 -60)">faucet link</text>
      <text transform="translate(0 -40)">contracts found</text>
      <text transform="translate(0 -20)">user avatar</text>
      <text transform="translate(0 0)">game stats (players & ships)</text>
      <text transform="translate(0 20)">user ship</text>
      <text transform="translate(0 40)">quick settings</text>
      <text transform="translate(0 60)">play button</text>

    </g>


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
