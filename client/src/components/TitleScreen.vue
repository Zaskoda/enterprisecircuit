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


    <g transform="translate(0 240)">
      <g>
        <rect
          :x="ui.left"
          :y="-240 * ui.UIScale"
          :width="ui.width"
          :height="420 * ui.UIScale"
          fill="#000000"
          fill-opacity="0.2"
          />
      </g>
      <g :transform="'scale(' + ui.UIScale + ')'">
        <g  font-size="48px" transform="translate(0 -160)">
          <btn
            :width="300" :height="80"
            text="Play"
            @click="routing.switchScreen('play')"
             />
        </g>
        <g  font-size="42px" transform="translate(0 -40)">
          <btn
            :width="300" :height="65"
            text="Settings"
            @click="routing.switchScreen('settings')"
            transform="translate(0 -25)" />
        </g>
        <g  font-size="36px" transform="translate(0 50)">
          <btn
            :width="180" :height="50"
            text="Window"
            @click="routing.switchScreen('window')"
            transform="translate(-300 0)" />
          <btn
            :width="180" :height="50"
            text="Portal"
            @click="routing.switchScreen('storya')"
            transform="translate(-100 0)" />
          <btn
            :width="180" :height="50"
            text="Tween"
            @click="routing.switchScreen('storyb')"
            transform="translate(100 0)" />
          <btn
            :width="180" :height="50"
            text="Galaxy"
            @click="routing.switchScreen('galaxy')"
            transform="translate(300 0)" />
        </g>
        <g  font-size="36px" transform="translate(0 120)">
          <btn
            :width="180" :height="50"
            text="Assets"
            @click="routing.switchScreen('assets')"
            transform="translate(-200 0)" />
          <btn
            :width="180" :height="50"
            text="Ships"
            @click="routing.switchScreen('four')"
            transform="translate(0 0)" />
          <btn
            :width="180" :height="50"
            text="Avatars"
            @click="routing.switchScreen('avatars')"
            transform="translate(200 0)" />
        </g>
      </g>
    </g>

    <LogoOrbiter8  :transform="'translate(0 ' + (ui.top + 200) + ') scale(1)'" />
    <LogoPartavate  :transform="'translate(0 ' + (ui.bottom - 50) + ') scale(0.5)'" />



    <g v-if="false" :transform="'translate('+ ui.mouseX + ' ' + ui.mouseY  + ')'">
      <g :transform="'scale(' + 0.75 + ') rotate(' + (ui.window.mouseDirection - 90) + ')'">
        <g transform="translate(0 25)">
        <PlayerShip :show-engines="true" />
        </g>
      </g>
    </g>


  </svgContainer>
</template>

<style scoped>
</style>
