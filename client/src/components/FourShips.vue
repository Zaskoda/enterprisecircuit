<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'
import btn from './ui/button-basic.svg.vue'
import PlayerShip from './assets/sprites/PlayerShip.svg.vue'
import LogoMoonbeam from './assets/sprites/LogoMoonbeam.svg.vue'
import LogoPolygon from './assets/sprites/LogoPolygon.svg.vue'
import LogoBoba from './assets/sprites/LogoBoba.svg.vue'
import LogoEthereum from './assets/sprites/LogoEthereum.svg.vue'

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
    if (this.ui.isAutoPresent) {
      setTimeout(() => { this.routing.switchScreen('about') }, 8000)
    }
  },
  methods: {
  }
}
</script>

<template>
  <svgContainer>
  <g >
    <SpaceBackground  transform="scale(1)" />
  </g>
  <rect :x='ui.left' :y='ui.top' :height='ui.height' :width='ui.width' fill="#000000" fill-opacity="0.5" />
  <g stroke-linecap="round" transform="translate(0 30) scale(1.25)" >

<g transform="translate(-150 87)">
  <circle
    r="40"
    stroke-dasharray="8 4"
    stroke-width="1.5"
    stroke-opacity="0.5"
    stroke="#ccff00"
    fill="#0c0f00"
    fill-opacity="1" />

  <g transform="translate(0 0) scale(1) rotate(15)">
    <PlayerShip :type="288" :show-engines="true" />
  </g>
</g>

<g transform="translate(150 87)">
  <circle
    r="40"
    stroke-dasharray="8 4"
    stroke-width="1.5"
    stroke-opacity="0.5"
    stroke="#E1177C"
    fill="#0e0107"
    fill-opacity="1" />
  <g transform="translate(0 0) scale(1) rotate(15)">
    <PlayerShip :type="1284" :show-engines="true" />
  </g>
</g>


<g transform="translate(0 -173)">
  <circle
    r="40"
    stroke-dasharray="8 4"
    stroke-width="1.5"
    stroke-opacity="0.5"
    stroke="#7950DD"
    fill="#051014"
    fill-opacity="1" />
  <g transform="translate(0 0) scale(1) rotate(15)">
    <PlayerShip :type="137" :show-engines="true" />
  </g>
</g>



<g transform="translate(0 0) scale(1.3)">
  <circle
    r="67"
    stroke-dasharray="8 4"
    stroke-width="1.5"
    stroke-opacity="0.25"
    stroke="#ffffff"
    fill="#280b4b"
    fill-opacity="0.5" />
  <g transform="translate(0 0) scale(2) rotate(15)">
    <PlayerShip :type="1" :show-engines="true" />
  </g>
</g>



<g transform="rotate(120)">
  <line x1="0" y1="-100" x2="0" y2="-125" stroke="#E1177C" stroke-width="12" stroke-opacity="0.25" />
  <line x1="0" y1="-105" x2="0" y2="-118" stroke="#E1177C" stroke-width="6" stroke-opacity="0.75" />
  <g transform="translate(0 -88) scale(0.26)">
    <g transform="rotate(-120)">
      <circle
        r="40"
        stroke-dasharray="12 6"
        stroke-width="4"
        stroke-opacity="0.5"
        stroke="#ffffff"
        fill="#280b4b"
        fill-opacity="1" />
      <Portal />
      <LogoEthereum transform="translate(0 9) scale(1.5) " />
    </g>
  </g>
  <g transform="translate(0 -135) scale(0.26)">
    <g transform="rotate(-120)">
      <circle
        r="40"
        stroke-dasharray="12 6"
        stroke-width="4"
        stroke-opacity="0.5"
        stroke="#E1177C"
        fill="#0e0107"
        fill-opacity="1" />
      <LogoMoonbeam transform="translate(0 0) scale(1.5)" />
    </g>
  </g>
</g>
<g transform="rotate(-120)">
  <line x1="0" y1="-100" x2="0" y2="-125" stroke="#ccff00" stroke-width="12" stroke-opacity="0.25" />
  <line x1="0" y1="-105" x2="0" y2="-118" stroke="#ccff00" stroke-width="6" stroke-opacity="0.75" />
  <g transform="translate(0 -88) scale(0.26)">
    <g transform="rotate(120)">
      <circle
        r="40"
        stroke-dasharray="12 6"
        stroke-width="4"
        stroke-opacity="0.5"
        stroke="#ffffff"
        fill="#280b4b"
        fill-opacity="1" />
      <LogoEthereum transform="translate(0 9) scale(1.5) " />
    </g>
  </g>
  <g transform="translate(0 -135) scale(0.26)">
    <g transform="rotate(120)">
      <circle
        r="40"
        stroke-dasharray="12 6"
        stroke-width="4"
        stroke-opacity="0.5"
        stroke="#ccff00"
        fill="#0c0f00"
        fill-opacity="1" />
      <LogoBoba transform="translate(0 0) scale(1.5)" />
    </g>
  </g>
</g>
<g transform="rotate(0)">
  <line x1="0" y1="-100" x2="0" y2="-125" stroke="#7950DD" stroke-width="12" stroke-opacity="0.25" />
  <line x1="0" y1="-105" x2="0" y2="-118" stroke="#7950DD" stroke-width="6" stroke-opacity="0.75" />
  <g transform="translate(0 -88) scale(0.26)">
    <g transform="rotate(0)">
      <circle
        r="40"
        stroke-dasharray="12 6"
        stroke-width="4"
        stroke-opacity="0.5"
        stroke="#ffffff"
        fill="#280b4b"
        fill-opacity="1" />
      <LogoEthereum transform="translate(0 9) scale(1.5) " />
    </g>
  </g>
  <g transform="translate(0 -135) scale(0.26)">
    <g transform="rotate(0)">
      <circle
        r="40"
        stroke-dasharray="12 6"
        stroke-width="4"
        stroke-opacity="0.5"
        stroke="#7950DD"
        fill="#051014"
        fill-opacity="1" />
      <LogoPolygon transform="translate(0 0) scale(1.5)" />
    </g>
  </g>
</g>

<g>

</g>




  </g>
  <g  font-size="12px" :transform="'translate(0 ' + (ui.bottom - 50) + ')'">
        <btn
          :width="120" :height="20"
          text="close"
           @click="routing.switchScreen('title')"
          transform="translate(0 -25)" />
      </g>
  </svgContainer>
</template>

<style scoped>
</style>
