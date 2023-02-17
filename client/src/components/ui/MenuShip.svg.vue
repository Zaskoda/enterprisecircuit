<script setup lang="ts">
import InputBox from './widgets/InputBox.svg.vue'
import MinervaFrame from './widgets/MinervaFrame.svg.vue'
import btn from './widgets/button-basic.svg.vue'
import Ship from '../assets/geometry/ShipOrbiter8.svg.vue'
import { useRouting } from '../../stores/routing'
import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'
import { useWorld } from '../../stores/world'

</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      shipName: '',
      panel: 0,
      screen: useScreen(),
      world: useWorld(),
    }
  },
  mounted() {
  },
  methods: {
    updateName(value:string) {
      this.shipName = value
    },
    submit() {
      this.panel = 1
      this.world.galaxy.launchShip(
        this.shipName,
        ()=>{this.handleSuccess()},
        ()=>{this.handleFailed()},
        ()=>{this.handleRejected()},
      )
    },
    handleSuccess() {
      this.panel = 3
      this.world.loadFromNetwork()
    },
    handleFailed() {
      this.panel = 2
    },
    handleRejected() {
      this.panel = 2
    }
  }
}
</script>

<template>
  <g>
    <MinervaFrame title="Star Ship Registration" />
  </g>

  <g v-if="panel == 0">

    <text transform="translate(-250 -240)"
      font-size="28px"
      text-anchor="start">Registered Owner: {{  world.avatar.me.name }} </text>

    <text transform="translate(-130 180)"
     font-size="38"
     text-anchor="start">Please name your Orbiter 8:  </text>
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
        <InputBox @value="updateName" @submit="submit" :value="shipName" :focus="true" />
      </g>
    </g>
  </g>

  <g v-if="panel == 1">
    <g transform="translate(-250 -250)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" >Transmitting your ship registration.</text>
      <text transform="translate(0 80)">Please follow the prompts in your wallet provider.</text>
      <text transform="translate(0 350)" fill="#888888">If for some reason, you do not see a prompt, you</text>
      <text transform="translate(0 390)" fill="#888888">can click "Retry" to go back and resubmit.</text>
    </g>
  </g>

  <g v-if="panel == 2">
    <g transform="translate(-250 -250)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" fill="#ffaaff">Your transaction was either cancelled or failed.</text>
      <text transform="translate(0 40)">It's okay, we can try again.</text>
      <text transform="translate(0 360)">Please click "Retry" to go back and resubmit.</text>
    </g>
  </g>

  <g v-if="(panel == 1) || (panel == 2)">
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
        @click="panel = 0" />
    </g>
  </g>

  <g v-if="panel == 3">
    <g transform="translate(-250 -250)" font-size="28px" text-anchor="start">
      <text transform="translate(0 0)" fill="#ffffff">Success!</text>
      <text transform="translate(0 40)">You're ready to take command of {{ shipName }}.</text>
      <text transform="translate(0 360)">Liberta Galactica!</text>
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
        <btn :width="250" :height="60" text="Take Command" @click="ui.changeMenu('home')" />
    </g>
  </g>

  <g v-if="(panel == 0) || (panel == 1)">

    <g transform="translate(30 -100)" v-if="panel == 0">
      <g v-for="x in 6">
        <g :transform="'translate(' + (x * 50 - 25) + ' 0) scale(0.75)'" opacity="0.1">
          <Ship transform="scale(0.01) "  />
        </g>
        <g :transform="'translate(' + (x * 55 - 20) + ' 25) scale(0.9)'" opacity="0.25">
          <Ship transform="scale(0.01) "  />
        </g>
        <g :transform="'translate(' + (x * 60 - 15) + ' 60) scale(1)'" opacity="0.55">
          <Ship transform="scale(0.01) "  />
        </g>
      </g>
    </g>

    <g fill="#ffffff" transform="translate(50 0)">
      <Ship transform="translate(-100 10) scale(0.0275) "  />
      <rect x="-180" y="50" width="160" height="8"  rx="4" ry="4" />

      <rect x="-220" y="-32" width="6" height="90" rx="4" ry="4" />
      <rect x="-190" y="-32" width="6" height="90" rx="4" ry="4" />

      <g v-if="panel == 0">
        <rect x="-220" y="-40" width="90" height="4" rx="4" ry="4" />
        <rect x="-180" y="-30" width="50" height="4" rx="4" ry="4" />
      </g>

      <rect x="-210" y="-30" width="16" height="4" rx="4" ry="4" />
      <rect x="-210" y="-10" width="16" height="4" rx="4" ry="4" />
      <rect x="-210" y="10" width="16" height="4" rx="4" ry="4" />
      <rect x="-210" y="30" width="16" height="4" rx="4" ry="4" />
      <rect x="-210" y="50" width="16" height="4" rx="4" ry="4" />
      <g v-if="panel > 0">
            <g transform="translate(-100 40)">
            <circle cx="0" cy="0" r="5" fill="#ffffff44" class="smoke1" />
            <circle cx="0" cy="0" r="10" fill="#ffffff44" class="smoke2" />
            <circle cx="0" cy="0" r="15" fill="#ffffff44" class="smoke3" />

            <circle cx="0" cy="10" r="15" fill="#ffffff44" class="smoke1" />
            <circle cx="0" cy="10" r="15" fill="#ffffff44" class="smoke2" />
            <circle cx="0" cy="10" r="15" fill="#ffffff44" class="smoke3" />
            </g>

            <g transform="translate(-150 40)">
            <circle cx="0" cy="0" r="6" fill="#ffffff66" class="smoke1" />
            <circle cx="0" cy="0" r="8" fill="#ffffff66" class="smoke2" />
            <circle cx="0" cy="0" r="10" fill="#ffffff66" class="smoke3" />

            <circle cx="0" cy="10" r="15" fill="#ffffff66" class="smoke1" />
            <circle cx="0" cy="10" r="15" fill="#ffffff66" class="smoke2" />
            <circle cx="0" cy="10" r="15" fill="#ffffff66" class="smoke3" />
            </g>
            <g transform="translate(-50 40)">
            <circle cx="0" cy="0" r="6" fill="#ffffff66" class="smoke1" />
            <circle cx="0" cy="0" r="8" fill="#ffffff66" class="smoke2" />
            <circle cx="0" cy="0" r="10" fill="#ffffff66" class="smoke3" />

            <circle cx="0" cy="10" r="15" fill="#ffffff66" class="smoke1" />
            <circle cx="0" cy="10" r="15" fill="#ffffff66" class="smoke2" />
            <circle cx="0" cy="10" r="15" fill="#ffffff66" class="smoke3" />
            </g>
        </g>

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
.smoke1 {
  animation-name: smoke;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.smoke2 {
  animation-name: smoke;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.smoke3 {
  animation-name: smoke;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}


@keyframes smoke {
  0%   {fill:#ffffff; scale: 0}
  100% {fill: #ffffff00; scale: 1}
}

</style>
