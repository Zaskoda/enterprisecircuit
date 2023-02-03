<script setup lang="ts">
import backdrop from './assets/sprites/SpaceBackground.svg.vue'
import btn from './ui/widgets/button-basic.svg.vue'

import PlayerShip from './assets/sprites/PlayerShip.svg.vue'

import LogoOrbiter8 from './assets/sprites/LogoOrbiter8.svg.vue'
import LogoPartavate from './assets/sprites/LogoPartavate.svg.vue'
import LogoEthereum from './assets/sprites/LogoEthereum.svg.vue'
import LogoBoba from './assets/sprites/LogoBoba.svg.vue'
import LogoMoonbeam from './assets/sprites/LogoMoonbeam.svg.vue'
import LogoPolygon from './assets/sprites/LogoPolygon.svg.vue'

import Planet from './assets/sprites/Planet.svg.vue'
import Moon from './assets/sprites/Moon.svg.vue'
import Star from './assets/sprites/Star.svg.vue'
import SpaceStation from './assets/sprites/SpaceStation.svg.vue'

import MinervaScreen from './assets/sprites/MinervaScreen.svg.vue'

import Portal from './assets/sprites/Portal.svg.vue'

import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      routing: useRouting(),
      backFillColor: '#000000',
      backFillOpacity: 0
    }
  },
  mounted() {
  },
  methods: {
    setFill(color: string, opacity:number) {
      this.backFillColor = color
      this.backFillOpacity = opacity
    }
  },
}
</script>

<template>
  <g>
    <backdrop  transform="scale(1)" />
  </g>

  <rect :x="screen.left + 10" :y="screen.top+10" :width="screen.width - 40" :height="screen.height - 120" :fill="backFillColor" :opacity="backFillOpacity" rx="20" ry="20" />

  <g transform="translate(0 -180)">
    <g transform="translate(-160 0)" >
      <PlayerShip :type="137" :showEngines="true" />
    </g>
    <g transform="translate(-60 0)" >
      <PlayerShip :type="1284" :showEngines="true" />
    </g>
    <g transform="translate(60 0)" >
      <PlayerShip :type="288" :showEngines="true" />
    </g>
    <g transform="translate(160)" >
      <PlayerShip :type="1" :showEngines="true" />
    </g>
  </g>


  <g transform="translate(0 -90)">
    <g v-for="i in 9" transform="translate(-160 0)" >
      <g :transform="'translate(' + ((i * 70) - 200) + ' 0)'">
        <Planet :classification="i" :size="5 + ((i % 4 )* 7)" :rings="(((i) % 3) * i)" />
      </g>
    </g>
  </g>

  <g transform="translate(0 10)">
    <g v-for="i in 3" transform="translate(-160 0)" >
      <g :transform="'translate(' + ((i * 40) - 150) + ' 0)'">
        <Moon :size="1 + i * 5" />
      </g>
    </g>
    <g v-for="i in 3" transform="translate(-160 0)" >
      <g :transform="'translate(' + ((i * 25) + 150 + i * i * i) + ' 0) scale(0.25)'">
        <SpaceStation :size="i*30 + 20" />
      </g>
    </g>

  </g>

  <g transform="translate(200 25) scale(0.75)">
    <MinervaScreen />
  </g>
  <g transform="translate(-220 100) scale(1.5)">
    <Portal />
  </g>

  <g transform="translate(0 -260)">
    <LogoOrbiter8  :transform="'translate(-200 0) scale(0.15)'" />
    <LogoPartavate  :transform="'translate(-50 0) scale(0.15)'" />
    <LogoEthereum  :transform="'translate(50 0) scale(1)'" />
    <LogoPolygon  :transform="'translate(100 0) scale(1)'" />
    <LogoMoonbeam  :transform="'translate(150 0) scale(1)'" />
    <LogoBoba  :transform="'translate(200 0) scale(1)'" />
  </g>

  <g  font-size="12px" :transform="'translate(0 ' + (screen.bottom - 80) + ')'" stroke="#888888" stroke-width="1" >
    <g transform="translate(-50 0)">
      <rect x="-10" y="-10" width="20" height="20" fill="#000000" fill-opacity="1" @click="setFill('#000000',1)" rx="5" ry="5"/>
    </g>
    <g transform="translate(-25 0)">
      <rect x="-10" y="-10" width="20" height="20" fill="#000000" fill-opacity="0.5" @click="setFill('#000000',0.5)" rx="5" ry="5"/>
    </g>
    <g transform="translate(0 0)">
      <rect x="-10" y="-10" width="20" height="20" fill="#888888" fill-opacity="0" @click="setFill('#ffffff',0)" rx="5" ry="5" />
    </g>
    <g transform="translate(25 0)">
      <rect x="-10" y="-10" width="20" height="20" fill="#ffffff" fill-opacity="0.5" @click="setFill('#ffffff',0.25)" rx="5" ry="5" />
    </g>
    <g transform="translate(50 0)">
      <rect x="-10" y="-10" width="20" height="20" fill="#ffffff" fill-opacity="1" @click="setFill('#ffffff',1)" rx="5" ry="5" />
    </g>
  </g>

  <g  font-size="12px" :transform="'translate(0 ' + (screen.bottom - 20) + ')'">
        <btn
          :width="120" :height="20"
          text="close"
           @click="routing.switch('title')"
          transform="translate(0 -25)" />
      </g>
</template>

<style scoped>
</style>
