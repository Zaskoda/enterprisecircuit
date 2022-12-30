<script setup lang="ts">
import { useEVM } from '../../stores/evm'
import EVMStatus from './_EVMStatus.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM()
    }
  },
  props: {
    restricted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isblocked() {
      if ((this.restricted) && (!this.evm.isConnected)) {
        return true
      }
      return false
    }
  }
}
</script>

<template>
  <g v-if="isblocked">
    <text font-size="2em" :transform="'translate(0 ' + (-100) + ')'">Please connect your wallet.</text>
  </g>
  <slot v-else />

  <g>
    <EVMStatus />
  </g>


</template>