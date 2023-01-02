<script setup lang="ts">
import { useEVM } from '../../stores/evm'
import EVMStatus from './_EVMStatus.svg.vue'
import { useRouting } from '../../stores/routing'
import btn from '../ui/button-basic.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM(),
      routing: useRouting(),
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
      <text font-size="2em" :transform="'translate(0 ' + (-50) + ')'">Please select a supported network.</text>
    </g>
    <g v-else>
      <text font-size="2em" :transform="'translate(0 ' + (-50) + ')'">Please connect your wallet.</text>

      <btn
          font-size="14px"
          fill="#ffffff"
          :width="150"
          :height="30"
          text="Title Screen"
          @click="this.routing.switchScreen('title')"
          transform="translate(0 50)" />

    </g>
  </g>
  <slot v-else />

  <g>
    <EVMStatus />
  </g>


</template>