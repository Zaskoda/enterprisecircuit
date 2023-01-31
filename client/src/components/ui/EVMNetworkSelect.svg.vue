<script setup lang="ts">
import btn from './button-basic.svg.vue'
import spinner from './spinner.svg.vue'
import { useEVM} from '../../stores/evm'
import deployments from "../../../libraries/galactic/networkDeployments"
import networks from "../../../libraries/galactic/networkDetails"
</script>

<script lang="ts">
export default {
  emits: ['close'],
  data() {
    return {
      evm: useEVM(),
      deployments: deployments,
      networks: networks,
      hoverId: null
    }
  },
  methods: {
    switchNetwork(chainId:String) {
      const hexId = this.networks[chainId].hexId
      console.log('clicked', hexId)
      this.evm.switchNetwork(hexId)
    },

  },
  computed: {
    networkCount():number {
      return Object.keys(this.deployments).length
    },
    networkToShow():number {
      if (this.hoverId != null) {
        return this.hoverId
      }
      if (this.evm.chainId != null) {
        return this.evm.chainId
      }
      return 0
    }
  }
}
</script>

<template>
  <g font-size="24px">
     <rect
        :x="-350"
        :y="-350"
        :width="700"
        :height="700"
        fill-opacity="1"
        fill="url(#fil0)"
        stroke-opacity="1"
        stroke="url(#fil8)"
        stroke-width="1"
        rx="10" ry="10" />

    <text font-size="38px" :transform="'translate(0 ' + (-300) + ')'">Choose a Network</text>
    <g transform="scale(1)">
      <g :transform="'translate(-220 ' + (networkCount * -30 ) + ')'">
        <g v-for="(network, key, index) in deployments" :transform="'translate(0 ' + index * 48 + ')'" @mouseenter="this.hoverId = key" @mouseleave="this.hoverId = null">
          <btn :val="key" :width="180" :height="42" @click="switchNetwork" font-size="0.9em" :text="networks[key].shortName" :selected="evm.chainId == key" />
        </g>
      </g>
      <g transform="translate(-50 -150)" v-if="networkToShow > 0">
        <rect
          x="-80"
          y="-100"
          fill="#000000"
          fill-opacity="0.1"
          stroke-opacity="0.6"
          stroke="#ffffff"
          stroke-width="6"
          rx="15"
          ry="15"
          width="400"
          height="540" />
        <text font-size="26px" transform="translate(120 0)">{{ networks[networkToShow] ? networks[networkToShow].name : 'Select A Network' }}</text>
        <g v-if="networks[networkToShow]">
          <g font-size="22px" opacity="0.75">
            <text transform="translate(120 50)">Native Token: {{ networks[networkToShow].currency.symbol }}</text>
            <text transform="translate(120 80)">Chain ID: {{ networks[networkToShow].hexId }}</text>
          </g>
          <text font-size="20px" transform="translate(120 150)">{{ networks[networkToShow].description }}</text>
          <g v-if="evm.chainId == networkToShow" transform="translate(120 320)">
            <btn :width="360" :height="50" @click="$emit('close')" font-size="22px" :text="'Continue on ' + networks[networkToShow].shortName"  />
          </g>
        </g>
      </g>
    </g>

    <g v-if="evm.switchingNetwork">
     <rect
        :x="-350"
        :y="-350"
        :width="700"
        :height="700"
        fill-opacity="0.75"
        fill="#202426"
        rx="10" ry="10" />
      <spinner />
    </g>
  </g>
</template>

<style scoped>
</style>
