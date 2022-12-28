<script setup lang="ts">
import btn from './ui-primitives/button-basic.svg.vue'
import { useEVM } from '../stores/evm'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM()
    }
  },
  mounted() {
  },
  methods: {
    async connectWallet() {
      await this.evm.connect()
    },
    async init() {
      await this.evm.init()
    },
  }
}
</script>

<template>
  <g font-size="9">
    <rect
      x="-140" y="-6" width="280" height="48"
      fill="#000000" fill-opacity="0.2"
      stroke="#000000" stroke-opacity="0.5" stroke-width="1"
    />
    <text
      transform="translate(0 0)"
      >EVM</text>

    <btn
      :height="12"
      :width="60"
      v-if="!evm.isConnected"
      transform="translate(0 20)"
      @click="connectWallet"
      text="Connect" />
    <g v-else fill="#999999">
    <text transform="translate(0 15)">
      {{  evm.chainName }} [{{ evm.chainId }}]|
      <tspan fill="#88ff00" v-if="evm.suppportedNetwork">Supported</tspan>
      <tspan fill="#ff8800" v-else>Unsupported</tspan>
    </text>
    <text transform="translate(0 25)">
       Blk: {{ evm.block }}
       | Sgn: {{ evm.shortSigner }}
    </text>
  </g>


  </g>
</template>

<style scoped>
</style>
