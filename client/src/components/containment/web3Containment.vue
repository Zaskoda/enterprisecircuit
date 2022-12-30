<script setup lang="ts">
import { useEVM } from '../../stores/evm'
import walletConnect  from './_walletConnect.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM()
    }
  },
}
</script>

<template>
<slot v-if="evm.isConnected" />
<walletConnect v-else />
</template>