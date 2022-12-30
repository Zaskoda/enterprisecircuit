<script setup lang="ts">
import LogoEthereum from '../assets/geometry/LogoEthereum.svg.vue'
import networkSelect from './_networkSelect.svg.vue'
import btn from '../ui-primitives/button-basic.svg.vue'
import { useEVM } from '../../stores/evm'
import { useUI } from '../../stores/ui'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM(),
      ui: useUI(),
      isOpen: false,
      showNetworkSelect: false
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
     <rect
       v-if="showNetworkSelect"
      :x="-2000"
      :y="-2000"
      :width="4000"
      :height="4000"
      fill-opacity="0.6"
      fill="#000000"
      stroke-width="0"
      @click="showNetworkSelect=false"
      />

    <g :transform="'translate(0 ' + (ui.top + 10) + ')'">
      <g>
        <rect
          x="-140" y="-6" width="280" height="38"
          fill="#000000" fill-opacity="0.2"
          stroke="#ffffff" stroke-opacity="0.15" stroke-width="1"
          rx="10" ry="10"
        />

        <g transform="translate(-110 20) scale(0.18)">
          <LogoEthereum />
        </g>

        <g v-if="!evm.isConnected">
          <btn
            :height="24" :width="100"
            transform="translate(0 14)"
            @click="connectWallet"
            text="Connect" />
        </g>
        <g v-else >
          <text transform="translate(-20 3)" font-size="13" fill="#ffffff">
            {{  evm.chainName }}
          </text>

          <btn
            :height="12" :width="50"
            font-size="8"
            transform="translate(100 20)"
            @click="this.showNetworkSelect = true"
            text="Change" />


          <g font-size="8" >
            <g text-anchor="end" transform="translate(120 4)">
              <g v-if="evm.suppportedNetwork" >
                <text fill="#88ff88"
                  >Supported</text>
              </g>
              <g v-else="evm.suppportedNetwork">
                <text fill="#ff8888"
                  >Unsupported</text>
              </g>
            </g>
            <g fill="#999999">
              <text transform="translate(-40 16)" text-anchor="end">
                Block:
              </text>
              <text transform="translate(0 16)" >
                {{ evm.block }}
              </text>
              <text transform="translate(-40 25)"  text-anchor="end">
                Address:
              </text>
              <text transform="translate(0 25)" >
                {{ evm.shortSigner }}
              </text>
            </g>

          </g>

        </g>



      </g>
    </g>
    <g v-if="showNetworkSelect">
      <networkSelect v-on:close="showNetworkSelect = false" />
    </g>
  </g>
</template>

<style scoped>
</style>
