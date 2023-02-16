<script setup lang="ts">
import InputBox from './widgets/InputBox.svg.vue'

import btn from './widgets/button-basic.svg.vue'
import GearIcon from './icons/gear.svg.vue'
import { useRouting } from '../../stores/routing'
import { useScreen } from '../../stores/screen'
import { useUI } from '../../stores/ui'
import { useWorld } from '../../stores/world'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      screen: useScreen(),
      avatarName: '',
      routing: useRouting(),
      panel: 0,
      world: useWorld()
    }
  },
  methods: {
    inputHandler(value:string) {
      this.avatarName = value
      this.panel = 2
      this.world.avatar.createAvatar(
        this.avatarName,
        ()=>{this.handleSuccess()},
        ()=>{this.handleFailed()},
        ()=>{this.handleRejected()},
      )
    },
    handleSuccess() {
      this.panel = 4
    },
    handleFailed() {
      this.panel = 3
    },
    handleRejected() {
      this.panel = 3
    }
  }
}
</script>

<template>
  <g v-if="panel == 0">
    <g transform="translate(-400 -300)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" font-size="48">Register For Flight Service</text>
      <text transform="translate(40 100)">Greetings Pilot</text>

      <text transform="translate(40 180)">You have been recruited by the Cascadian Cyber Corp</text>
      <text transform="translate(40 220)">to command a brand new Orbiter 8 space craft.</text>

      <text transform="translate(40 300)">Your ongoing mission will be exploring the galactic frontier,</text>
      <text transform="translate(40 340)">liberating resources for the greater good - and profit.</text>

      <text transform="translate(40 420)">Once you register your public callsign in the Minerva</text>
      <text transform="translate(40 460)">galactic database, ou will be granted flight clearance</text>
      <text transform="translate(40 500)">for the entire galaxy. </text>

      <text transform="translate(40 580)">Liberta Galactica</text>
      <g transform="translate(400 660)" text-anchor="middle">
        <btn :width="300" :height="60" text="Sign Me Up" @click="panel=1" />
      </g>
    </g>
  </g>
  <g v-if="panel == 1">
    <text transform="translate(-230 20)"
     font-size="48"
     text-anchor="start">Name Your Avatar</text>
    <g transform="translate(-300 0) scale(1)" fill="#ffffff">
      <circle cx="0" cy="-36" r="18" stroke-width="3" stroke="#ffffff44" />
      <rect x="-21" y="-6" width="42" height="60" rx="8" ry="8" stroke-width="3" stroke="#ffffff44"  />
      <rect x="-36" y="-12" width="72" height="21" rx="30" ry="30" stroke-width="1" stroke="#ffffff44"  />
      <rect x="-36" y="-3" width="9" height="45" rx="8" ry="8" stroke-width="1" stroke="#ffffff44"  />
      <rect x="27" y="-3" width="9" height="45" rx="8" ry="8" stroke-width="1" stroke="#ffffff44"  />
    </g>
    <g transform="translate(0 100)">
      <g >
        <InputBox @value="inputHandler" :value="avatarName" />
      </g>
    </g>
  </g>

  <g v-if="panel == 2">

    <g transform="translate(-400 -100)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" font-size="48">Registration Requested</text>

      <text transform="translate(0 80)">Please follow the prompts in your wallet provider.</text>

      <g  font-size="32px" transform="translate(400 200)" text-anchor="middle">
        <btn
          :width="250" :height="60"
          text="Try Again"
          @click="panel = 1" />
      </g>

    </g>
  </g>

  <g v-if="panel == 3">
    <text>Your transaction was either rejected or failed.</text>

    <g  font-size="32px" transform="translate(0 200)" text-anchor="middle">
        <btn
          :width="250" :height="60"
          text="Try Again"
          @click="panel = 1" />
      </g>
  </g>

  <g v-if="panel == 4">
    <text>Registration complete: {{ avatarName }}</text>
    <g  font-size="32px" transform="translate(0 200)" text-anchor="middle">
        <btn
          :width="250" :height="60"
          text="Get My Ship"
          @click="ui.changeMenu('ship')" />
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
