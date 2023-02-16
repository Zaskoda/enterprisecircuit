<script setup lang="ts">
import btn from './widgets/button-basic.svg.vue'
import spinner from './widgets/spinner.svg.vue'
import { useEVM } from '../../stores/evm'
import { useWorld } from '../../stores/world'
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
      hoverId: null,
      networkSelected: null as string || null,
      world: useWorld(),
    }
  },
  methods: {
    switchNetwork(chainId:string) {
      this.networkSelected = chainId
    },
    connectNetwork(chainId:string) {
      const hexId = this.networks[chainId].hexId
      this.evm.switchNetwork(hexId)
    },
    openNewWindow(url:string) {
      window.open(url)
    },
  },
  computed: {
    networkCount():number {
      return Object.keys(this.deployments).length
    },
    networkToShow():string {
      if (this.networkSelected != null){
        return this.networkSelected
      }
      if (this.evm.chainId != null) {
        return this.evm.chainId
      }
      return ''
    }
  }
}
</script>

<template>
  <g font-size="26px">
     <rect
        :x="-390"
        :y="-350"
        :width="780"
        :height="700"
        fill-opacity="1"
        fill="url(#fil0)"
        stroke-opacity="1"
        stroke="url(#fil8)"
        stroke-width="1"
        rx="10" ry="10" />

    <g transform="scale(1)">
      <g :transform="'translate(-270 ' + (networkCount * -35 ) + ')'">
        <g v-for="(network, key, index) in deployments" :transform="'translate(0 ' + index * 60 + ')'" @mouseenter="this.hoverId = key" @mouseleave="this.hoverId = null">
          <btn :val="key"
            :width="(evm.chainId == key) ? 230 : 210" :height="48"
            @click="switchNetwork"
            font-size="0.9em"
            :text="networks[key].shortName"
            :selected="evm.chainId == key || networkToShow == key" />
        </g>
      </g>
      <g transform="translate(110 -330)" v-if="networkToShow != ''">
        <rect
          x="-260"
          y="0"
          fill="#000000"
          stroke="#ffffff"
          fill-opacity="0.1"
          stroke-opacity="0.1"
          stroke-width="4"
          rx="15"
          ry="15"
          width="520"
          height="660" />
        <g v-if="networks[networkToShow]">
          <text font-size="26px" transform="translate(0 40)">{{ networks[networkToShow] ? networks[networkToShow].name : 'Select A Network' }}</text>
          <g font-size="20px">
            <text transform="translate(0 80)">Native Token: {{ networks[networkToShow].currency.symbol }}</text>
            <text transform="translate(0 110)">Chain ID: {{ networks[networkToShow].hexId }}</text>
            <text transform="translate(0 150)">{{ networks[networkToShow].description }}</text>
          </g>
        </g>
        <g v-if="evm.chainId == networkToShow">
          <g transform="translate(0 560)" v-if="evm.isSuppportedNetwork">
            <btn :width="420" stroke="#ffffff" :height="80" @click="$emit('close')" font-size="32px" :text="'Play on ' + networks[networkToShow].shortName"  />
          </g>

          <g transform="translate(0 200)" font-size="24px">
            <text transform="translate(-10 0)" text-anchor="end" fill="#aaaaaa">Avatar Contract:</text>
            <text v-if="world.avatar.isConnected" transform="translate(0 0)" text-anchor="start" fill="#88ff88">Connected</text>
            <text v-else transform="translate(0 0)" text-anchor="start" fill="#888888">Not found.</text>
            <text transform="translate(0 25)"
              class="canclick" @click="openNewWindow(evm.explorer + '/address/' + world.avatar.avatarContractAddress)"
              fill="#ffffaa" font-size="16px" font-family="monospace">{{  world.avatar.avatarContractAddress }}</text>

            <text transform="translate(-10 60)" text-anchor="end" fill="#aaaaaa">Galaxy Contract:</text>
            <text v-if="world.galaxy.isConnected" transform="translate(0 60)" text-anchor="start" fill="#88ff88">Connected</text>
            <text v-else transform="translate(0 60)" text-anchor="start" fill="#888888">Not found.</text>
            <text transform="translate(0 85)"
            class="canclick" @click="openNewWindow(evm.explorer + '/address/' + world.galaxy.galaxyContractAddress)"
            fill="#ffffaa" font-size="16px" font-family="monospace">{{  world.galaxy.galaxyContractAddress }}</text>
          </g>

          <g font-size="20px" transform="translate(0 360)">
            <g transform="translate(0 0)">
              <rect x="-200" y="-15"
                v-if="evm.balance < 0.1"
                width="400" height="30"
                rx="10" ry="10"
                fill="#442222" fill-opacity="0.5"
                stroke="#ffffaa" stroke-width="1" />
              <text transform="translate(0 0)" text-anchor="end" fill="#aaaaaa">Current Balance:</text>
              <text transform="translate(10 0)" text-anchor="start">{{ evm.balance }} {{ evm.currencyData.symbol }}</text>
            </g>

            <g transform="translate(0 50)">
              <text transform="translate(-50 -5)" text-anchor="end" fill="#aaaaaa">Get more {{ evm.currencyData.symbol }}:</text>
              <g v-if="evm.facuets.length > 0">
                <g v-for="(faucet, index) in evm.facuets">
                <btn
                  :transform="'translate(' + 90 + ' ' + index * 35 + ')'"
                  :width="250"
                  :height="32"
                  @click="openNewWindow(faucet.url)"
                  :text="faucet.name"
                />
                </g>
              </g>
              <g v-else>
                <text transform="translate(-40 0)" text-anchor="start">No sources avaialble</text>
              </g>
            </g>

          </g>

        </g>
        <g v-else>
          <g transform="translate(0 320)">
            <btn :width="360" :height="70" @click="connectNetwork" :val="networkToShow" font-size="28px" :text="'Change to ' + networks[networkToShow].shortName"  />
          </g>
          <g transform="translate(0 620)">
            <btn :width="260" :height="50" @click="networkSelected = evm.chainId" :val="networkToShow" font-size="22px" text="Cancel"  />
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
