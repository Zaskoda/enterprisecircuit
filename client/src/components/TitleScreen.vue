<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import backdrop from './assets/sprites/SpaceBackground.svg.vue'
import OrbitingStation from './assets/scenes/OrbitingStation.svg.vue'
import btn from './ui/button-basic.svg.vue'
import LogoOrbiter8 from './assets/sprites/LogoOrbiter8.svg.vue'
import SpaceStation from './assets/sprites/SpaceStation.svg.vue'
import PlayerShip from './assets/sprites/PlayerShip.svg.vue'
import starfield from './assets/Starfield.svg.vue'
import LogoPartavate from './assets/sprites/LogoPartavate.svg.vue'
import EVMStatus from './ui/EVMStatus.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting()
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>
  <svgContainer>
  <g>
    <backdrop />
  </g>


    <g>
      <starfield />

      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0"
        to="360"
        dur="600s"
        repeatCount="indefinite"
      />
    </g>
    <OrbitingStation transform="scale(3)" />


    <g :transform="'translate(0 90)'">
      <g>
        <rect
          :x="ui.left"
          y="-120"
          :width="ui.right - ui.left"
          height="420"
          fill="#000000"
          fill-opacity="0.2"
          />
      </g>
      <g  font-size="40px">
        <btn
          :width="300" :height="65"
          text="START"
           @click="routing.switchScreen('play')"
          transform="translate(0 -65)" />
      </g>
      <g  font-size="18px" transform="translate(0 35)">
        <btn
          :width="100" :height="36"
          text="Window"
           @click="routing.switchScreen('window')"
          transform="translate(-200 -25)" />
        <btn
          :width="100" :height="36"
          text="Portal"
           @click="routing.switchScreen('storya')"
          transform="translate(-100 -25)" />
        <btn
          :width="100" :height="36"
          text="Tween"
           @click="routing.switchScreen('storyb')"
          transform="translate(-0 -25)" />
        <btn
          :width="100" :height="36"
          text="Avatars"
           @click="routing.switchScreen('avatars')"
          transform="translate(100 -25)" />
        <btn
          :width="100" :height="36"
          text="Galaxy"
           @click="routing.switchScreen('galaxy')"
          transform="translate(200 -25)" />
      </g>
      <g  font-size="30px" transform="translate(0 100)">
        <btn
          :width="200" :height="40"
          text="Settings"
           @click="routing.switchScreen('settings')"
          transform="translate(0 -25)" />
      </g>
      <g  font-size="30px" transform="translate(0 160)">
        <btn
          :width="200" :height="40"
          text="Assets"
           @click="routing.switchScreen('assets')"
          transform="translate(0 -25)" />
      </g>
      <g  font-size="30px" transform="translate(0 220)">
        <btn
          :width="200" :height="40"
          text="Ships"
           @click="routing.switchScreen('four')"
          transform="translate(0 -25)" />
      </g>
    </g>

    <LogoOrbiter8  :transform="'translate(0 -300) scale(1.5)'" />
    <LogoPartavate  :transform="'translate(0 ' + (ui.bottom - 25) + ') scale(0.1)'" />



    <g v-if="false" :transform="'translate('+ ui.mouseX + ' ' + ui.mouseY  + ')'">
      <g :transform="'scale(' + 0.75 + ') rotate(' + (ui.window.mouseDirection - 90) + ')'">
        <g transform="translate(0 25)">
        <PlayerShip :show-engines="true" />
        </g>
      </g>
    </g>


    <EVMStatus />
  </svgContainer>
</template>

<style scoped>
</style>
