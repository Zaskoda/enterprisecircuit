<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import backdrop from './assets/backdrop.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import logo from './assets/logo.svg.vue'
import ship from './assets/shipO8.svg.vue'
import shipm from './assets/shipMB.svg.vue'
import shipp from './assets/shipPG.svg.vue'
import shipb from './assets/shipBB.svg.vue'
import starfield from './assets/starfield.svg.vue'
import portal from './assets/portal.svg.vue'
import moonbeam from './assets/moonbeam.svg.vue'
import poly from './assets/polygon.svg.vue'
import boba from './assets/boba.svg.vue'
import ethereum from './assets/ethereum.svg.vue'

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
  <g>
    <backdrop  transform="scale(1)" />
  </g>
  <g stroke-linecap="round" transform="translate(0 20) scale(1.45)" >


<g transform="translate(-150 87)">
  <circle
    r="60"
    stroke-dasharray="8 4"
    stroke-width="1.5"
    stroke-opacity="0.5"
    stroke="#ccff00"
    fill="#0c0f00"
    fill-opacity="1" />

  <g transform="translate(-5 -10) scale(5.5) rotate(30)">
    <shipb :show-engines="true" />
  </g>

  <g transform="translate(25 30) scale(0.5)">
    <boba transform="translate(0 9) scale(0.15)" />
  </g>
</g>

<g transform="translate(150 87)">
  <circle
    r="60"
    stroke-dasharray="8 4"
    stroke-width="1.5"
    stroke-opacity="0.5"
    stroke="#E1177C"
    fill="#0e0107"
    fill-opacity="1" />
  <g transform="translate(-5 -10) scale(5.5) rotate(30)">
    <shipm :show-engines="true" />
  </g>

  <g transform="translate(25 30) scale(0.5)">
    <moonbeam transform="translate(0 -2) scale(0.75)"/>
  </g>
</g>


<g transform="translate(0 -173)">
  <circle
    r="60"
    stroke-dasharray="8 4"
    stroke-width="1.5"
    stroke-opacity="0.5"
    stroke="#7950DD"
    fill="#051014"
    fill-opacity="1" />
  <g transform="translate(-5 -10) scale(5.5) rotate(30)">
    <shipp :show-engines="true" />
  </g>

  <g transform="translate(25 30) scale(0.5)">
    <poly transform="translate(0 0) scale(1.25)" />
  </g>
</g>



<g transform="translate(0 0) scale(1.3)">
  <circle
    r="60"
    stroke-dasharray="8 4"
    stroke-width="2"
    stroke-opacity="0.5"
    stroke="#5c1aae"
    fill="#280b4b"
    fill-opacity="0.5" />
  <g transform="translate(-5 -10) scale(5.5) rotate(30)">
    <ship :show-engines="true" />
  </g>

  <g transform="translate(25 30) scale(0.5)">
    <ethereum transform="translate(0 9) scale(0.3)" />
  </g>
</g>



<g transform="rotate(120)">
  <line x1="0" y1="-85" x2="0" y2="-105" stroke="#7950DD" stroke-width="5" stroke-opacity="0.25" />
</g>
<g transform="rotate(-120)">
  <line x1="0" y1="-85" x2="0" y2="-105" stroke="#ccff00" stroke-width="5" stroke-opacity="0.25" />
</g>
<g transform="rotate(0)">
  <line x1="0" y1="-85" x2="0" y2="-105" stroke="#7950DD" stroke-width="5" stroke-opacity="0.25" />
</g>

<g>

</g>




  </g>
  </svgContainer>
</template>

<style scoped>
</style>
