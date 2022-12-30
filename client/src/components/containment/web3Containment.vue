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
    isBlocked() {
      if ((this.restricted) && ((!this.evm.isConnected) || (!this.evm.suppportedNetwork))) {
        return true
      }
      return false
    }
  }
}
</script>

<template>
  <g v-if="isBlocked">
    <g v-if="this.evm.isConnected && !this.evm.suppportedNetwork">
      <text font-size="2em" :transform="'translate(0 ' + (-100) + ')'">Please selected a supported.</text>
    </g>
    <g v-else>
      <text font-size="2em" :transform="'translate(0 ' + (-100) + ')'">Please connect your wallet.</text>
    </g>
  </g>
  <slot v-else />

  <g>
    <EVMStatus />
  </g>


</template>