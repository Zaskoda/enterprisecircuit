<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'
import btn from './ui/button-basic.svg.vue'

import Planet from './assets/sprites/Planet.svg.vue'
import Moon from './assets/sprites/Moon.svg.vue'
import Star from './assets/sprites/Star.svg.vue'
import SpaceStation from './assets/sprites/SpaceStation.svg.vue'

import OrbitingStation from './assets/scenes/OrbitingStation.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
import { useTween } from '../composables/tween'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      sampleTween: useTween(0, 1, 40000, 0 , false, false)
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

  <radialGradient id="windowGradient" r="100%" cx="50%" cy="40%">
    <stop offset="0%" stop-color="#c3b3da"/>
    <stop offset="60%" stop-color="#280b4b"/>
  </radialGradient>

  <g>
    <rect :x="ui.left" :y="ui.top" :width="ui.width" :height="ui.height" fill="url(#windowGradient)" />
  </g>

  <radialGradient id="windowBorderGradient" r="100%" cx="50%" cy="40%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5" />
    <stop offset="70%" stop-color="#ffffff" stop-opacity="0" />
  </radialGradient>

  <g fill-opacity="1" fill="url(#windowBorderGradient)" stroke-opacity="0.25" stroke="#000000" stroke-width="10">
  <path :d="
      ' M' +  (ui.left + 240) + ' ' + (ui.top + 240) +
      ' L' +  (ui.left + 340) + ' ' + (ui.top + 140) +
      ' L' +  (ui.right - 340) + ' ' + (ui.top + 140) +
      ' L' +  (ui.right - 240) + ' ' + (ui.top + 240) +
      ' L' +  (ui.right - 240) + ' ' + (ui.bottom - 540) +
      ' L' +  (ui.right - 340) + ' ' + (ui.bottom - 440) +
      ' L' +  (ui.left + 340) + ' ' + (ui.bottom - 440) +
      ' L' +  (ui.left + 240) + ' ' + (ui.bottom - 540) +
      ' Z'
    " />
  </g>

  <rect :x="ui.left" :y="ui.top + 100" :width="ui.width" :height="ui.height - 400" fill="#000000" fill-opacity="0.25" />


  <mask id="windowMask">
    <path :d="
      ' M' +  (ui.left + 250) + ' ' + (ui.top + 250) +
      ' L' +  (ui.left + 350) + ' ' + (ui.top + 150) +
      ' L' +  (ui.right - 350) + ' ' + (ui.top + 150) +
      ' L' +  (ui.right - 250) + ' ' + (ui.top + 250) +
      ' L' +  (ui.right - 250) + ' ' + (ui.bottom - 550) +
      ' L' +  (ui.right - 350) + ' ' + (ui.bottom - 450) +
      ' L' +  (ui.left + 350) + ' ' + (ui.bottom - 450) +
      ' L' +  (ui.left + 250) + ' ' + (ui.bottom - 550) +
      ' Z'
    " />
  </mask>
  <g mask="url(#windowMask)" v-if="true">
    <SpaceBackground  transform="scale(1)" />

    <g :transform="'translate(0 ' + (100 - 250 * sampleTween)  + ')'">
      <Star :size="3" />
    </g>


    <g :transform="'translate(' + (400 - (sampleTween * 400))  + ' 0)'">
      <OrbitingStation />
    </g>

    <g :transform="'translate(0 ' + (400 + (400 * sampleTween))  + ')'">
      <Planet
        :light-direction="90"
        :light-intensity="sampleTween * 0.25 + 0.1"
        :classification="5"
        :size="900 * (0.75 + sampleTween * 0.5) "
        :rings="0" />
    </g>


  </g>

  <g fill-opacity="0" stroke-opacity="0.15" stroke="#ffffff" stroke-width="10">
  <path :d="
      ' M' +  (ui.left + 250) + ' ' + (ui.top + 250) +
      ' L' +  (ui.left + 350) + ' ' + (ui.top + 150) +
      ' L' +  (ui.right - 350) + ' ' + (ui.top + 150) +
      ' L' +  (ui.right - 250) + ' ' + (ui.top + 250) +
      ' L' +  (ui.right - 250) + ' ' + (ui.bottom - 550) +
      ' L' +  (ui.right - 350) + ' ' + (ui.bottom - 450) +
      ' L' +  (ui.left + 350) + ' ' + (ui.bottom - 450) +
      ' L' +  (ui.left + 250) + ' ' + (ui.bottom - 550) +
      ' Z'
    " />
  </g>

  <linearGradient id="floorGradient"
    x1="50%" y1="0%" x2="50%" y2="100%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.1"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.75"/>
  </linearGradient>
  <rect :x="ui.left" :y="ui.bottom - 300" :width="ui.width" :height="300" fill="url(#floorGradient)" />

  <linearGradient id="cielingGradient"
    x1="50%" y1="0%" x2="50%" y2="100%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.75"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.15"/>
  </linearGradient>
  <rect :x="ui.left" :y="ui.top" :width="ui.width" :height="100" fill="url(#cielingGradient)" />


  <g fill="#000000" stroke="#000000" stroke-width="10" stroke-opacity="0.2" fill-opacity="0.2" >
    <rect :x="ui.left" :y="ui.top + 300" width="270" height="200" rx="2" ry="2"  />
    <rect :x="ui.left" :y="ui.top + 600" width="270" height="200" rx="2" ry="2"  />
    <rect :x="ui.right - 270" :y="ui.top + 300" width="270" height="200" rx="2" ry="2"  />
    <rect :x="ui.right - 270" :y="ui.top + 600" width="270" height="200" rx="2" ry="2"  />
  </g>

  <g fill="#140626" stroke="#d4c4eb" stroke-width="1" >
    <rect :x="ui.left-10" :y="ui.top + 300" width="280" height="200" rx="2" ry="2"  />
    <rect :x="ui.left-10" :y="ui.top + 600" width="280" height="200" rx="2" ry="2"  />
    <rect :x="ui.right - 270" :y="ui.top + 300" width="280" height="200" rx="2" ry="2"  />
    <rect :x="ui.right - 270" :y="ui.top + 600" width="280" height="200" rx="2" ry="2"  />
    <g stroke="#ffffff" stroke-opacity="0.5" fill-opacity="0" :transform="'translate(' + (ui.left+100) + ' ' + (ui.top + 400) + ')'">
      <moon :size="50" />
    </g>
    <g stroke="#ffffff" stroke-opacity="0.5" fill-opacity="0" :transform="'translate(' + (ui.left+100) + ' ' + (ui.top + 400) + ')'">
      <g>
        <ellipse :cx="0" :cy="0" rx="50" ry="10" stroke="#ffffff" stroke-opacity="0.5" />
        <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="360; 0"
            dur="20s"
            repeatCount="indefinite"
          />
      </g>
      <g>
        <ellipse :cx="0" :cy="0" rx="10" ry="50" stroke="#ffffff" stroke-opacity="0.5" />
        <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0; 360"
            dur="5s"
            repeatCount="indefinite"
          />
      </g>
    </g>
  </g>

  <g :transform="'translate(' + (ui.left+100) + ' ' + (ui.top + 700) + ')'">
    <g>
    <moon :size="150" />
      <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="360; 0"
          dur="60s"
          repeatCount="indefinite"
        />
     </g>
  </g>

  <g :transform="'translate(' + (ui.right-100) + ' ' + (ui.top + 400) + ')'" opacity="0.75">
    <rect x="-140" y="-70" width="150" height="4" />
    <rect x="-120" y="-20" width="70" height="2" />
    <rect x="-120" y="0" width="100" height="2" />
    <rect x="-120" y="10" width="110" height="2" />
    <rect x="-120" y="20" width="60" height="2" />
    <rect x="20" y="-30" width="60" height="20" />
    <rect x="20" y="10" width="60" height="30" />
  </g>
  <g :transform="'translate(' + (ui.right-100) + ' ' + (ui.top + 700) + ')'">
    <g>
    <SpaceStation :size="75" />
      <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="360; 0"
          dur="60s"
          repeatCount="indefinite"
        />
     </g>
  </g>

   <g font-size="20px" :transform="'translate(0 ' + (ui.bottom - 50) + ')'">
        <btn
          :width="120" :height="40"
          text="close"
           @click="routing.switchScreen('title')"
          transform="translate(0 -25)" />
      </g>
  </svgContainer>
</template>

<style scoped>
</style>
