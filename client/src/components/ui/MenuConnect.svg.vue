<script setup lang="ts">
import EVMStatus from './EVMStatus.svg.vue'
import networkSelect from './EVMNetworkSelect.svg.vue'

import btn from './widgets/button-basic.svg.vue'
import LoadingBar from './LoadingBar.svg.vue'
import LogoMetaMask from '../assets/sprites/LogoMetaMask.svg.vue'
import LogoEthereum from '../assets/graphics/LogoEthereum.svg.vue'
import { mapState } from 'pinia'

import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'
import { useRouting } from '../../stores/routing'
import { useEVM } from "../../stores/evm"
import { useWorld } from '../../stores/world'

import { useAvatar } from '../../stores/avatar'
import { useGalaxy } from '../../stores/galaxy'
</script>

<script lang="ts">
export default {
  emits: ['readyToPlay'],
  data() {
    return {
      ui: useUI(),
      screen: useScreen(),
      routing: useRouting(),
      evm: useEVM(),
      world: useWorld(),
      //replace these with world
      avatar: useAvatar(),
      galaxy: useGalaxy(),
    }
  },
  async mounted() {
    if (this.isConnected) {
      var currentTime = new Date().getTime();
      this.loadChainData()
    } else {
      var currentTime = new Date().getTime();
      this.evm.connect()
    }
  },
  watch: {
    async isConnected(newVal, oldVal) {
      if ((newVal) && (!oldVal)) {
        //todo: this doesn't need to load the entire game world
        this.loadChainData()
      }
    },
  },
  methods: {
    openNewWindow(url:string) {
      window.open(url)
    },
    async loadChainData() {
      this.evm.getBalance()
      this.world.loadEntities()
    }
  },
  computed: {
    ...mapState(useEVM, ['isConnected']),
  }
}
</script>

<template>
  <g>
    <rect
      :x="-420 * ui.UIScale"
      :y="screen.top - 5"
      :height="screen.height + 10"
      :width="420 * 2 * ui.UIScale"
      stroke="#ffffff"
      stroke-width="2"
      stroke-opacity="0.1"
      fill="#000000"
      fill-opacity="0.4"
      />
  </g>

  <g v-if="!evm.isConnected">
    <g transform="translate(-200 -200)">
      <LogoMetaMask transform="scale(4) " />
    </g>
    <g transform="translate(-100 -220)">
      <text text-anchor="start">Connect Wallet</text>
    </g>

    <g transform="translate(0 -170)" font-size="20px">
      <g>
        <text text-anchor="end" fill="#888888">Status:</text>
      </g>
      <g transform="translate(10 0)">
        <g v-if="evm.hasWallet">
          <text text-anchor="start" fill="#88ff88">Wallet available.</text>
        </g>
        <g v-if="!evm.hasWallet">
          <text text-anchor="start" fill="#ff8888">No wallet detected.</text>
        </g>
    </g>
    </g>

    <g transform="translate(-240 -80)" text-anchor="start" font-size="20px" fill="#aaaaaa">
      <g transform="translate(0 0)">
        <text>Playing Orbiter 8 requires an EVM wallet provider.</text>
      </g>
      <g v-if="!evm.hasWallet">
        <g transform="translate(0 30)">
          <text>We could not detect a wallet provider.</text>
        </g>
        <g transform="translate(0 60)">
          <text>For the best experience, download Metamask.</text>
        </g>
        <btn
          font-size="24"
          text-anchor="middle"
          transform="translate(240 140)"
          :width="250"
          :height="40"
          @click="openNewWindow('https://metamask.io/download/')"
          text="Get MetaMask"
        />
      </g>
      <g v-else>
        <g transform="translate(0 30)">
          <text>We detected your wallet and are attempting to connect.</text>
        </g>
        <g transform="translate(0 60)">
          <text>If you do not see a connection dialogue, click retry.</text>
        </g>
        <btn
          font-size="24"
          text-anchor="middle"
          transform="translate(240 120)"
          :width="250"
          :height="40"
          @click="evm.connect()"
          text="Retry"
        />
      </g>
    </g>


  </g>
  <g v-else>
    <g :transform="'translate(0 ' + (screen.top + 30) + ')'">
      <g transform="translate(-330 60) scale(0.60)">
        <LogoEthereum />
      </g>
      <text transform="translate(-250 25)" font-size="40px" fill="#ffffff" text-anchor="start">
        {{  evm.chainName }}
      </text>

      <g v-if="world.isLoaded" transform="translate(0 0)" font-size="24px" fill="#888888" >
        <g transform="translate(-250 80)" text-anchor="start">
          <text>With {{  world.avatar.chainstate.avatarCount  }} players exploring {{  world.galaxy.chainstate.systemCount }} star systems.</text>
        </g>

        <g v-if="world.avatar.haveAvatar" text-anchor="start">
          <g transform="translate(-250 110)">
            <text>Welcome back {{  world.avatar.chainstate.myAvatarName  }}.</text>
          </g>
        </g>
        <g v-if="world.galaxy.haveShip" text-anchor="start">
          <g transform="translate(-250 140)">
            <text>Your ship {{  world.galaxy.chainstate.ship.name }} is currently in {{  world.galaxy.chainstate.systemData.name }}</text>
          </g>
        </g>
      </g>

      <g font-size="26px"  fill="#aaaaaa" transform="translate(0 180)">
        <text transform="translate(-10 0)" text-anchor="end">
          Status:
        </text>
        <g text-anchor="start" transform="translate(-0 0)">
          <g v-if="evm.isSuppportedNetwork" >
            <text v-if="world.isLoaded" fill="#aaffaa"
              >Connected</text>
            <text v-else fill="#ffffaa"
              >Loading</text>
          </g>
          <g v-else="evm.isSuppportedNetwork">
            <text fill="#ffaaaa"
              >Unsupported</text>
          </g>
        </g>
      </g>

    </g>

    <g transform="translate(0 50)">
    <networkSelect v-on:close="ui.changeMenu('home')" />
    </g>


  </g>

  <g  font-size="42px" :transform="'translate(0 ' + (screen.bottom - 20) + ')'">
    <g :transform="'scale(' + ui.UIScale + ')'">
      <btn
        :width="200" :height="60"
        text="Title"
          @click="ui.changeMenu('home')"
        transform="translate(0 -80)" />
    </g>
  </g>

</template>

<style scoped>
</style>
