<script setup lang="ts">
import LogoEthereum from '../assets/graphics/LogoEthereum.svg.vue'
import networkSelect from './EVMNetworkSelect.svg.vue'
import btn from './button-basic.svg.vue'
import { useEVM } from '../../stores/evm'
import { useUI } from '../../stores/ui'
</script>

<script lang="ts">
export default {
  data() {
    return {
      evm: useEVM(),
      ui: useUI(),
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
  },
  computed: {
    scale() {
      if (this.ui.landscape) {
        return 0.75 * this.ui.uiScale
      }
      return 1.25 * this.ui.uiScale
    }
  }
}
</script>

<template>
<g>
    <rect
      v-if="ui.evm.showNetworkSelect"
    :x="-2000"
    :y="-2000"
    :width="4000"
    :height="4000"
    fill-opacity="0.6"
    fill="#000000"
    stroke-width="0"
    @click="ui.evm.showNetworkSelect=false"
    />
  <g :transform="'translate(0 ' + (ui.top + 40) + ')'">
    <g :transform="'scale( ' + scale + ' )'">
      <g>
        <rect
          x="-560" y="-24" width="1120" height="152"
          fill="#000000" fill-opacity="0.2"
          stroke="#ffffff" stroke-opacity="0.15" stroke-width="2"
          rx="40" ry="40"
        />

        <g transform="translate(-440 80) scale(0.70)">
          <LogoEthereum />
        </g>

        <g v-if="!evm.isConnected">
          <btn
            :height="96" :width="400"
            transform="translate(0 56)"
            @click="connectWallet"
            text="Connect" />
        </g>
        <g v-else >
          <text transform="translate(-80 12)" font-size="60px" fill="#ffffff">
            {{  evm.chainName }}
          </text>

          <btn
            :height="48" :width="200"
            font-size="40px"
            transform="translate(400 80)"
            @click="ui.evm.showNetworkSelect = true"
            text="Change" />


          <g font-size="40px" >
            <g text-anchor="end" transform="translate(480 16)">
              <g v-if="evm.isSuppportedNetwork" >
                <text fill="#88ff88"
                  >Supported</text>
              </g>
              <g v-else="evm.isSuppportedNetwork">
                <text fill="#ff8888"
                  >Unsupported</text>
              </g>
            </g>
            <g fill="#999999">
              <text transform="translate(-160 64)" text-anchor="end">
                Block:
              </text>
              <text transform="translate(0 64)" >
                {{ evm.block }}
              </text>
              <text transform="translate(-160 100)"  text-anchor="end">
                Address:
              </text>
              <text transform="translate(0 100)" >
                {{ evm.shortSigner }}
              </text>
            </g>

          </g>

        </g>



      </g>
    </g>
    <g v-if="ui.evm.showNetworkSelect">
      <networkSelect v-on:close="ui.evm.showNetworkSelect = false" />
    </g>
  </g>
</g>
</template>

<style scoped>
</style>
