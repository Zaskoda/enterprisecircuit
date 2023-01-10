<script setup lang="ts">
import { useEVM } from '../../stores/evm'
import EVMStatus from '../ui/EVMStatus.svg.vue'
import { useRouting } from '../../stores/routing'
import btn from '../ui/button-basic.svg.vue'
import { useUI } from '../../stores/ui'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM(),
      ui: useUI(),
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
      if ((this.restricted) && ((!this.evm.isConnected) || (!this.evm.isSuppportedNetwork))) {
        return true
      }
      return false
    }
  }
}
</script>

<template>
  <g v-if="isBlocked">
    <g v-if="this.evm.isConnected && !this.evm.isSuppportedNetwork">
      <text font-size="20px" :transform="'translate(0 ' + (-50) + ')'">Please select a supported network.</text>
      <btn
        fill="#ffffff"
        :width="150"
        :height="30"
        text="change"
        @click="ui.evm.showNetworkSelect = true"
      />
    </g>
    <g v-else>
      <text font-size="20px" :transform="'translate(0 ' + (-50) + ')'">Please connect your wallet.</text>

      <btn
        fill="#ffffff"
        :width="150"
        :height="30"
        text="connect"
        @click="evm.connect()"
      />


    </g>
      <btn
        font-size="14px"
        :width="120" :height="25"
        text="Title Screen"
        @click="routing.switchScreen('title')"
        transform="translate(0 100)" />
  </g>
  <slot v-else />

  <g>
    <EVMStatus />
  </g>


</template>