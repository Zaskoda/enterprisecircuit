<script setup lang="ts">
import btn from '../ui-primitives/button-basic.svg.vue'
import {  useEVM } from '../../stores/evm'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM()
    }
  },
  mounted() {
    this.evm.init()
  },
  methods: {
    async connectWallet() {
      await this.evm.connect()
    },
    createWallet() {
      alert('this feature is not yet implemented')
    }
  },
  computed: {
  }
}
</script>

<template>


<text font-size="2em" :transform="'translate(0 ' + (-100) + ')'">Please connect your wallet.</text>

<btn font-size="30" :height="80" transform="translate(0 -20)" @click="connectWallet" text="Connect Wallet" />

<btn transform="translate(0 60)" @click="createWallet" text="Create Wallet" />

<text fill="#888888" font-size="0.9em" :transform="'translate(0 ' + (250) + ')'">{{ evm.status }}</text>


</template>

<style scoped>
</style>
