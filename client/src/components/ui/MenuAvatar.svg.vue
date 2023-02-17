<script setup lang="ts">
import InputBox from './widgets/InputBox.svg.vue'
import MinervaFrame from './widgets/MinervaFrame.svg.vue'
import btn from './widgets/button-basic.svg.vue'
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
    updateName(value:string) {
      this.avatarName = value
    },
    submit() {
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
      this.world.avatar.getMyAvatarName()
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
  <g>
    <MinervaFrame />
    <text transform="translate(-250 -350)"
      text-anchor="start"
      fill="#aaaaaa"
      font-size="48">Callsign Registration</text>

  </g>
  <g v-if="panel == 0">
    <g transform="translate(-250 -250)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)">Greetings Pilot</text>

      <text transform="translate(0 60)">You have been recruited by the Cascadian Cyber Corp</text>
      <text transform="translate(0 100)">to command a brand new Orbiter 8 space craft.</text>

      <text transform="translate(0 180)">Your ongoing mission is to explore the galactic frontier,</text>
      <text transform="translate(0 220)">liberate resources for the greater good, - and profit.</text>

      <text transform="translate(0 300)">Once you register your public callsign in the Minerva</text>
      <text transform="translate(0 340)">galactic database, you'll be granted flight clearance</text>
      <text transform="translate(0 380)">for the entire galaxy.</text>

      <text transform="translate(0 460)">Liberta Galactica</text>
      <g transform="translate(510 530)" text-anchor="middle" font-size="28px">

          <rect
            x="-200" y="-50"
            width="400"
            height="100"
            rx="10"
            ry="10"
            fill="#310e5b"
            fill-opacity="1"
            stroke="#ffffff"
            stroke-width="1"
            stroke-opacity="0.25"
          />
        <btn :width="360" :height="60" text="Register My Callsign" @click="panel=1" />
      </g>
    </g>
  </g>
  <g v-if="panel == 1">
    <g transform="translate(0 20)">
      <g fill-opacity="0.2" fill="#000000" stroke-width="1" stroke="#ffffff" stroke-opacity="0.25" >
        <rect x="-200" y="-260" width="600" height="280" />
        <rect x="200" y="-240" width="180" height="180" />
      </g>
      <g transform="translate(290 -150) scale(1)" fill="#ffffff">
        <circle cx="0" cy="-36" r="18" stroke-width="3" stroke="#ffffff44" />
        <rect x="-21" y="-6" width="42" height="60" rx="8" ry="8" stroke-width="3" stroke="#ffffff44"  />
        <rect x="-36" y="-12" width="72" height="21" rx="30" ry="30" stroke-width="1" stroke="#ffffff44"  />
        <rect x="-37" y="-5" width="9" height="45" rx="8" ry="8" stroke-width="1" stroke="#ffffff44"  />
        <rect x="28" y="-5" width="9" height="45" rx="8" ry="8" stroke-width="1" stroke="#ffffff44"  />
      </g>
      <g fill="#888888" fill-opacity="0.5" transform="translate(-160 -220)">
        <text transform="translate(0 80)"
          font-size="24"
          text-anchor="start">Pilot Identification</text>
        <text v-if="avatarName.length < 1" transform="translate(0 20)"
          font-size="48"
          fill="#ffffff"
          text-anchor="start">? ? ? ? ? ? ? ? ? ? ?</text>
        <text v-else
          transform="translate(-5 20)"
          :font-size="avatarName.length > 15 ? '20px' : avatarName.length > 10 ? '26px' : '38px'"
          fill="#ffffff"
          text-anchor="start">{{ avatarName }}</text>
        <text transform="translate(400 180)"
          font-size="20"
          text-anchor="start">Rank: Newb</text>
        <g transform="translate(0 120)">
          <rect x="0" y="0" width="320" height="6" />
          <rect v-for="j in 6" x="20" :y="10 + j * 10" width="300" height="3" />
        </g>
      </g>
    </g>
    <text transform="translate(-130 180)"
     font-size="38"
     text-anchor="start">Please enter your callsign:  </text>
    <g transform="translate(150 280)">
      <g >

        <rect
            x="-300" y="-50"
            width="600"
            height="100"
            rx="10"
            ry="10"
            fill="#310e5b"
            fill-opacity="1"
            stroke="#ffffff"
            stroke-width="1"
            stroke-opacity="0.25"
          />
        <InputBox @value="updateName" @submit="submit" :value="avatarName" :focus="true" />
      </g>
    </g>
  </g>

  <g v-if="panel == 2">
    <g transform="translate(-250 -250)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" >Transmitting your registration request.</text>
      <text transform="translate(0 80)">Please follow the prompts in your wallet provider.</text>
      <text transform="translate(0 350)" fill="#888888">If for some reason, you do not see a prompt, you</text>
      <text transform="translate(0 390)" fill="#888888">can click "Retry" to go back and resubmit.</text>
    </g>
  </g>

  <g v-if="panel == 3">
    <g transform="translate(-250 -250)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" fill="#ffaaff">Your transaction was either cancelled or failed.</text>
      <text transform="translate(0 40)">It's okay, we can try again.</text>
      <text transform="translate(0 360)">Please click "Retry" to go back and resubmit.</text>
    </g>
  </g>

  <g v-if="(panel == 2) || (panel == 3)">
    <g  font-size="32px" transform="translate(-200 280)" text-anchor="middle">
      <rect
          x="-125" y="-50"
          width="250"
          height="100"
          rx="10"
          ry="10"
          fill="#310e5b"
          fill-opacity="1"
          stroke="#ffffff"
          stroke-width="1"
          stroke-opacity="0.25"
        />
      <btn
        font-size="32"
        :width="200" :height="60"
        text="Retry"
        @click="panel = 1" />
    </g>
  </g>

  <g v-if="panel == 4">
    <g transform="translate(-250 -250)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" fill="#ffffff">Success!</text>
      <text transform="translate(0 40)">Welcome aboard, {{ avatarName }}.</text>
      <text transform="translate(0 360)">It's time to find you a ship.</text>
    </g>
    <g transform="translate(300 280)" text-anchor="middle" font-size="28px">

      <rect
        x="-150" y="-50"
        width="300"
        height="100"
        rx="10"
        ry="10"
        fill="#310e5b"
        fill-opacity="1"
        stroke="#ffffff"
        stroke-width="1"
        stroke-opacity="0.25"
      />
      <btn :width="250" :height="60" text="Find A Ship" @click="ui.changeMenu('home')" />
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
