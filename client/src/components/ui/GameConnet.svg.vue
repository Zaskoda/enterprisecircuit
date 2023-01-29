<script setup lang="ts">
import { mapState } from 'pinia'
import btn from './button-basic.svg.vue'
import LoadingBar from './LoadingBar.svg.vue'

import { useUI } from '../../stores/ui'
import { useRouting } from '../../stores/routing'
import { useEVM } from "../../stores/evm"

import { useAvatar } from '../../stores/avatar'
import { useGalaxy } from '../../stores/galaxy'
</script>

<script lang="ts">
export default {
  emits: ['readyToPlay'],
  data() {
    return {
      ui: useUI(),
      avatar: useAvatar(),
      routing: useRouting(),
      galaxy: useGalaxy(),
      evm: useEVM(),
    }
  },
  async mounted() {
  },
  watch: {
    async block(newVal, oldVal) {
    }
  },
  methods: {
    openNewWindow(url:string) {
      window.open(url)
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected']),
    getStep() {
      if (!this.evm.isConnected) {
        return {number: 0 , message: 'Connecting Wallet'}
      } else if (!this.evm.isSuppportedNetwork) {
        return {number: 1 , message: 'Connecting To Supported Network',}
      } else if (!this.avatar.isConnected) {
        return {number: 2 , message: 'Connecting To Avatar Contract',}
      } else if (!this.galaxy.isConnected) {
        return {number: 3 , message: 'Connecting To Galaxy Contract',}
      } else if (!this.avatar.isLoaded) {
        return {number: 4 , message: 'Loading Avatar State',}
      } else if (!this.galaxy.isLoaded) {
        return {number: 5 , message: 'Loading Galaxy State',}
      } else {
        return {number: 6 , message: 'Ready To Play'}
      }
    },
    loadingPercentage() {
      return Math.min(Math.round(this.getStep.number / 6 * 98 + 2), 100)
    }
  }
}
</script>

<template>
  <g :transform="'translate(0 ' + (ui.top + 200) + ')'">
    <LoadingBar :percent="loadingPercentage" :statusMessage="getStep.message" />
  </g>


  <g v-if="evm.isConnected">

    <g font-size="28px" transform="translate(0 -140)">
      <text transform="translate(-50 0)" text-anchor="end" fill="#aaaaaa">Current Balance:</text>
      <text transform="translate(-40 0)" text-anchor="start">{{ evm.balance }} {{ evm.currencyData.symbol }}</text>
    </g>

    <g font-size="28px" transform="translate(0 -100)">
      <text transform="translate(-50 0)" text-anchor="end" fill="#aaaaaa">Get more {{ evm.currencyData.symbol }}:</text>
      <g v-if="evm.facuets.length > 0">
        <g v-for="(faucet, index) in evm.facuets" font-size="24px">
        <btn
          :transform="'translate(' + 30 +' ' + index * 22 + ')'"
          :width="140"
          :height="20"
          @click="openNewWindow(faucet.url)"
          :text="faucet.name"
        />
        </g>
      </g>
      <g v-else>
        <text transform="translate(-40 0)" text-anchor="start">No sources avaialble</text>
      </g>
    </g>


    <g font-size="28px" transform="translate(0 -40)">
      <text transform="translate(-50 0)" text-anchor="end" fill="#aaaaaa">Avatar Contract:</text>
      <text v-if="avatar.isConnected" transform="translate(-40 0)" text-anchor="start" fill="#88ff88">Connected</text>
      <text v-else transform="translate(-40 0)" text-anchor="start" fill="#88ff88">Connecting</text>
      <text transform="translate(0 35)"
        class="canclick" @click="openNewWindow(evm.explorer + '/address/' + avatar.avatarContractAddress)"
        fill="#ffffaa" font-size="24px" font-family="monospace">{{  avatar.avatarContractAddress }}</text>

      <text transform="translate(-50 70)" text-anchor="end" fill="#aaaaaa">Galaxy Contract:</text>
      <text v-if="galaxy.isConnected" transform="translate(-40 70)" text-anchor="start" fill="#88ff88">Connected</text>
      <text v-else transform="translate(-40 70)" text-anchor="start" fill="#88ff88">Connecting</text>
      <text transform="translate(0 105)"
       class="canclick" @click="openNewWindow(evm.explorer + '/address/' + galaxy.galaxyContractAddress)"
       fill="#ffffaa" font-size="24px" font-family="monospace">{{  galaxy.galaxyContractAddress }}</text>
    </g>

    <g v-if="avatar.isLoaded && galaxy.isLoaded" transform="translate(0 120)">

      <g v-if="avatar.hasAvatar">
        <g font-size="28px" transform="translate(0 0)">
          <text transform="translate(-5 0)" fill="#aaaaaa">Welcome back {{  avatar.chainstate.myAvatarName  }}.</text>
          <text transform="translate(5 0)" text-anchor="start"></text>
        </g>
      </g>
      <g v-else>
        <g font-size="28px" transform="translate(40)">
          <text transform="translate(0 0)" fill="#aaaaaa">You have no avatar.</text>
        </g>
      </g>

      <g font-size="28px" fill="#aaaaaa" transform="translate(0 40)">
        <text>There are {{  avatar.chainstate.avatarCount  }} players exploring {{  galaxy.chainstate.systemCount }} stars.</text>
      </g>

      <g v-if="galaxy.chainstate.shipId > 0">
        <g font-size="28px" transform="translate(0 80)">
          <text transform="translate(-5 0)" fill="#aaaaaa">Your ship {{  galaxy.chainstate.ship.name }} is currently in {{  galaxy.chainstate.systemData.name }}</text>
        </g>
      </g>
    </g>

  </g>
  <g :transform="'translate(0 ' + (ui.bottom - 200) + ')'">
    <g v-if="!evm.isConnected">
      <text font-size="40px" :transform="'translate(0 ' + (-100) + ')'">Connect your wallet to continue.</text>

      <btn
        fill="#ffffff"
        :width="500"
        :height="90"
        text="Connect"
        @click="evm.connect()"
      />
    </g>
    <g v-else-if="!evm.isSuppportedNetwork">
      <text font-size="40px" :transform="'translate(0 ' + (-100) + ')'">Please select a supported network.</text>
      <btn
        fill="#ffffff"
        :width="500"
        :height="90"
        text="Change"
        @click="ui.evm.showNetworkSelect = true"
      />
    </g>
    <g v-else-if="!galaxy.isLoaded || !avatar.isLoaded">
      <text font-size="40px" :transform="'translate(0 ' + (-100) + ')'">Loading game data.</text>
      />
    </g>
    <g v-else>
      <btn
        fill="#ffffff"
        :width="500"
        :height="90"
        font-size="50px"
        text="Play"
        @click="$emit('readyToPlay')"
      />
    </g>
  </g>

  <g  font-size="42px" :transform="'translate(0 ' + (ui.bottom - 20) + ')'">
    <g :transform="'scale(' + ui.UIScale + ')'">
      <btn
        :width="200" :height="60"
        text="Title"
          @click="routing.switchScreen('title')"
        transform="translate(0 -80)" />
    </g>
  </g>


</template>

<style scoped>
</style>
