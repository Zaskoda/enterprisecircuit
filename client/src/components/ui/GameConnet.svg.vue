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
      step: 0,
      steps: [
        'Connecting Wallet',
        'Connecting To Supported Network',
        'Connecting To Avatar Contract',
        'Connecting To Galaxy Contract',
        'Loading Avatar State',
        'Loading Galaxy State',
        'Ready To Play'
      ]
    }
  },
  async mounted() {
    if (this.isConnected) {
      await this.init()
    }
  },
  watch: {
    async block(newVal, oldVal) {
      if (this.avatar.connected) {
        await this.avatar.getAll()
      }
      if (this.galaxy.connected) {
        await this.galaxy.getAll()
      }
      this.evm.getBalance()
    },
    async isConnected(newVal, oldVal) {
      if (!oldVal && newVal) {
        this.init()
      }
    }
  },
  methods: {
    async init() {
      await this.avatar.connect()
      await this.galaxy.connect()
      await this.avatar.getAll()
      await this.galaxy.getAll()
    },
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
  <g :transform="'translate(0 ' + (ui.top + 100) + ')'">
    <LoadingBar :percent="loadingPercentage" :statusMessage="getStep.message" />
  </g>


  <g v-if="evm.isConnected">
    <g font-size="16px" transform="translate(0 -180)">
      <text transform="translate(-50 0)" text-anchor="end" fill="#aaaaaa">Playing on:</text>
      <text transform="translate(-40 0)" text-anchor="start">{{ evm.chainName }}</text>
      <btn
        transform="translate(10 30)"
        font-size="14px"
        fill="#ffffff"
        :width="100"
        :height="20"
        text="change"
        @click="ui.evm.showNetworkSelect = true"
      />
    </g>

    <g font-size="14px" transform="translate(0 -110)">
      <text transform="translate(-50 0)" text-anchor="end" fill="#aaaaaa">Current Balance:</text>
      <text transform="translate(-40 0)" text-anchor="start">{{ evm.balance }} {{ evm.currencyData.symbol }}</text>
    </g>

    <g font-size="14px" transform="translate(0 -85)">
      <text transform="translate(-50 0)" text-anchor="end" fill="#aaaaaa">Get more {{ evm.currencyData.symbol }}:</text>
      <g v-if="evm.facuets.length > 0">
        <g v-for="(faucet, index) in evm.facuets" font-size="12px">
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


    <g font-size="14px" transform="translate(0 -50)">
      <text transform="translate(-50 0)" text-anchor="end" fill="#aaaaaa">Avatar Contract:</text>
      <text v-if="avatar.isConnected" transform="translate(-40 0)" text-anchor="start" fill="#88ff88">Connected</text>
      <text v-else transform="translate(-40 0)" text-anchor="start" fill="#88ff88">Connecting</text>
      <text transform="translate(0 17)"
        class="canclick" @click="openNewWindow(evm.explorer + '/address/' + avatar.avatarContractAddress)"
        fill="#ffffaa" font-size="12px">{{  avatar.avatarContractAddress }}</text>

      <text transform="translate(-50 40)" text-anchor="end" fill="#aaaaaa">Galaxy Contract:</text>
      <text v-if="galaxy.isConnected" transform="translate(-40 40)" text-anchor="start" fill="#88ff88">Connected</text>
      <text v-else transform="translate(-40 40)" text-anchor="start" fill="#88ff88">Connecting</text>
      <text transform="translate(0 57)"
       class="canclick" @click="openNewWindow(evm.explorer + '/address/' + galaxy.galaxyContractAddress)"
       fill="#ffffaa" font-size="12px">{{  galaxy.galaxyContractAddress }}</text>
    </g>

    <g v-if="avatar.isLoaded && galaxy.isLoaded" transform="translate(0 40)">
      <g font-size="14px" transform="translate(0 0)">
        <text transform="translate(-5 0)" text-anchor="end" fill="#aaaaaa">Players:</text>
        <text transform="translate(5 0)" text-anchor="start">{{  avatar.chainstate.avatarCount  }}</text>
      </g>


      <g font-size="14px" transform="translate(0 20)">
        <text transform="translate(-5 0)" text-anchor="end" fill="#aaaaaa">Stars:</text>
        <text transform="translate(5 0)" text-anchor="start">{{  galaxy.chainstate.systemCount }}</text>
      </g>

      <g v-if="avatar.hasAvatar">
        <g font-size="14px" transform="translate(0 40)">
          <text transform="translate(-5 0)" text-anchor="end" fill="#aaaaaa">Your Avatar:</text>
          <text transform="translate(5 0)" text-anchor="start">{{  avatar.chainstate.myAvatarName  }}</text>
        </g>
      </g>
      <g v-else>
        <g font-size="14px" transform="translate(0 40)">
          <text transform="translate(0 0)" fill="#aaaaaa">You have no avatar.</text>
        </g>
      </g>

      <g v-if="galaxy.chainstate.shipId > 0">
        <g font-size="14px" transform="translate(0 60)">
          <text transform="translate(-5 0)" text-anchor="end" fill="#aaaaaa">Your Ship:</text>
          <text transform="translate(5 0)" text-anchor="start">{{  galaxy.chainstate.ship.name }}</text>
        </g>
        <g font-size="14px" transform="translate(0 80)">
          <text transform="translate(-5 0)" text-anchor="end" fill="#aaaaaa">Your Location:</text>
          <text transform="translate(5 0)" text-anchor="start">{{  galaxy.chainstate.systemData.name }}</text>
        </g>
      </g>
      <g v-else>
        <g font-size="14px" transform="translate(0 60)">
          <text transform="translate(0 0)" fill="#aaaaaa">You have no ship.</text>
        </g>
      </g>
    </g>

  </g>
  <g :transform="'translate(0 ' + (ui.bottom - 100) + ')'">
    <g v-if="!evm.isConnected">
      <text font-size="20px" :transform="'translate(0 ' + (-50) + ')'">Please connect your wallet.</text>

      <btn
        fill="#ffffff"
        :width="150"
        :height="30"
        text="connect"
        @click="evm.connect()"
      />
    </g>
    <g v-else-if="!evm.isSuppportedNetwork">
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
      <btn
        fill="#ffffff"
        :width="300"
        :height="45"
        font-size="25px"
        text="Start"
        @click="$emit('readyToPlay')"
      />
    </g>
  </g>


</template>

<style scoped>
</style>
