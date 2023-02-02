<script setup lang="ts">
import LogoEthereum from '../assets/graphics/LogoEthereum.svg.vue'
import networkSelect from './EVMNetworkSelect.svg.vue'
import btn from './button-basic.svg.vue'
import { useEVM } from '../../stores/evm'
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
  computed:{
    scale() {
      if (this.screen.portrait) {
        return this.ui.UIScale
      }
      return this.ui.UIScale * 0.75
    }
  }
}
</script>

<template>
<g>
    <rect
      v-if="ui.showNetworkSelect"
    :x="-2000"
    :y="-2000"
    :width="4000"
    :height="4000"
    fill-opacity="0.6"
    fill="#000000"
    stroke-width="0"
    @click="ui.showNetworkSelect=false"
    />
  <g :transform="'translate(0 ' + (screen.top + 30) + ')'">
    <g :transform="'scale( ' + scale + ' )'">
      <g>
        <rect
          x="-420" y="-18" width="840" height="114"
          fill="#000000" fill-opacity="0.2"
          stroke="#ffffff" stroke-opacity="0.15" stroke-width="2"
          rx="20" ry="20"
        />

        <g transform="translate(-330 60) scale(0.60)">
          <LogoEthereum />
        </g>

        <g v-if="!evm.isConnected">
          <btn
            font-size="42px"
            :height="72" :width="300"
            transform="translate(0 42)"
            @click="connectWallet"
            text="Connect" />
        </g>
        <g v-else >
          <text transform="translate(-60 9)" font-size="40px" fill="#ffffff">
            {{  evm.chainName }}
          </text>

          <btn
            :height="36" :width="150"
            font-size="30px"
            transform="translate(300 60)"
            @click="ui.showNetworkSelect = true"
            text="Change" />


          <g font-size="30px" >
            <g text-anchor="end" transform="translate(360 12)">
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
              <text transform="translate(-120 48)" text-anchor="end">
                Block:
              </text>
              <text transform="translate(0 48)" >
                {{ evm.block }}
              </text>
              <text transform="translate(-120 75)"  text-anchor="end">
                Address:
              </text>
              <text transform="translate(0 75)" >
                {{ evm.shortSigner }}
              </text>
            </g>

          </g>

        </g>



      </g>
    </g>
  </g>
    <g v-if="ui.showNetworkSelect" transform="translate(0 0)">
      <networkSelect v-on:close="ui.showNetworkSelect = false" />
    </g>
</g>
</template>

<style scoped>
</style>
