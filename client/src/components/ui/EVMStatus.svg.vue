<script setup lang="ts">
import LogoEthereum from '../assets/graphics/LogoEthereum.svg.vue'
import btn from './widgets/button-basic.svg.vue'
import { useEVM } from '../../stores/evm'
import { useWorld } from '../../stores/world'
import { useScreen } from '../../stores/screen'
import { useUI } from '../../stores/ui'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      evm: useEVM(),
      screen: useScreen(),
      world: useWorld(),
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
<g>
  <g :transform="'translate(0 ' + (screen.top + 30) + ')'">
    <rect
      x="-90" y="-20" width="180" height="40"
      fill="#000000" fill-opacity="0.2"
      stroke="#ffffff" stroke-opacity="0.15" stroke-width="2"
      rx="20" ry="20"
    />

    <g v-if="evm.isConnected">
      <g transform="translate(0 6) scale(0.15)">
        <LogoEthereum />
      </g>

      <g font-size="12px" >
        <g fill="#999999">
          <g text-anchor="end">
            <text transform="translate(-10 -8)" >
              {{ evm.block }}
            </text>
            <text transform="translate(-10 8)" >
              {{ evm.shortSigner }}
            </text>
          </g>
          <g text-anchor="start">
            <text v-if="world.isLoading" transform="translate(10 -8)" >
              Loading
            </text>
            <text v-else-if="world.isLoaded" transform="translate(10 -8)" >
              Loaded
            </text>
              {{  }}
              {{ world.avatar.isLoading }}
              {{ world.galaxy.isLoading }}
            <g transform="translate(2 8)" stroke="#ffffff" stroke-width="1">
              <g transform="translate(16 0)" :fill-opacity="world.isLoading ? 1 : 0">
                <circle r="4" />
              </g>
              <g transform="translate(32 0)" :fill-opacity="world.isLoading ? 1 : 0">
                <circle r="4" />
              </g>
              <g transform="translate(48 0)" :fill-opacity="world.isLoading ? 1 : 0">
                <circle r="4" />
              </g>
            </g>
        </g>
        </g>
      </g>
    </g>
    <g v-else>
      <g font-size="12px" >
        <g fill="#999999">
          <text transform="translate(0 0)" >
            offline
          </text>
        </g>
      </g>
    </g>
    <rect
      x="-90" y="-20" width="180" height="40"
      fill-opacity="0"
      class="canclick" @click="ui.changeMenu('connect')"
    />
  </g>
</g>
</template>

<style scoped>
</style>
