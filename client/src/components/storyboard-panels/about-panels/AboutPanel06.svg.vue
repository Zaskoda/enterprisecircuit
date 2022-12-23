<script setup lang="ts">
import { useUI } from '../../../stores/ui'
import starfield from '../../assets/starfield.svg.vue'
import portal from '../../assets/portal.svg.vue'
import ship from '../../assets/shipO8.svg.vue'
import shipb from '../../assets/shipBB.svg.vue'
import shipm from '../../assets/shipMB.svg.vue'
import shipp from '../../assets/shipPG.svg.vue'
import moonbeam from '../../assets/moonbeam.svg.vue'
import boba from '../../assets/boba.svg.vue'
import ethereum from '../../assets/ethereum.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI()
    }
  },
  props: {
  },
  mounted() {
    this.$refs.fadeinnet.beginElement()
    this.$refs.scalein6.beginElement()
    this.$refs.fadein6.beginElement()
    this.$refs.shipmove.beginElement()
  },
  computed: {
  }
}
</script>

<template>
<g stroke-linecap="round" >


  <g transform="translate(-150 100)">
    <circle
      r="100"
      stroke-dasharray="8 4"
      stroke-width="2.5"
      stroke-opacity="0.5"
      stroke="#ccff00"
      fill-opacity="0" />
    <starfield :showLines="true"  transform="scale(0.15) rotate(-90)"/>
  </g>

  <g transform="translate(150 -100)">
    <circle
      r="100"
      stroke-dasharray="8 4"
      stroke-width="2.25"
      stroke-opacity="0.5"
      stroke="#E1177C"
      fill-opacity="0" />
    <starfield :showLines="true"  transform="scale(0.15) rotate(90)"/>
  </g>


  <g transform="translate(50 -100) scale(0.75)">
    <circle
      r="40"
      fill="#280b4b"
      stroke-dasharray="4 2"
      stroke-width="2.5"
      stroke-opacity="0.5"
      stroke="#e1177c" />
    <moonbeam transform="translate(0 -2) scale(0.75)"/>
  </g>
  <g transform="translate(-50 100) scale(0.75)">
    <circle
      r="40"
      fill="#280b4b"
      stroke-dasharray="4 2"
      stroke-width="2.5"
      stroke-opacity="0.5"
      stroke="#ccff00" />
    <boba transform="translate(0 9) scale(0.15)" />
  </g>
  <g>
    <g transform="translate(140 65) scale(0.75)">
      <circle
        r="35"
        fill="#280b4b"
        stroke-dasharray="4 2"
        stroke-width="1"
        stroke-opacity="0.5"
        stroke="#ccaaff" />
      <ethereum transform="translate(0 9) scale(0.2)" />
    </g>
    <g transform="translate(225 40) scale(0.75)">
      <circle
        r="20"
        fill="#280b4b"
        stroke-dasharray="4 2"
        stroke-width="0.5"
        stroke-opacity="0.5"
        stroke="#aaffaa" />
    </g>
    <g transform="translate(-135 -60) scale(0.75)">
      <circle
        r="20"
        fill="#280b4b"
        stroke-dasharray="4 2"
        stroke-width="0.5"
        stroke-opacity="0.5"
        stroke="#aaffaa" />
    </g>
    <line x1="140" y1="45" x2="120" y2="-35" stroke="#88ff88" stroke-dasharray="1 1" stroke-width="0.25" />
    <line x1="220" y1="35" x2="120" y2="-35" stroke="#88ff88" stroke-dasharray="1 1" stroke-width="0.25" />
    <line x1="-120" y1="35" x2="-130" y2="-55" stroke="#88ff88" stroke-dasharray="1 1" stroke-width="0.25" />
    <line x1="140" y1="45" x2="-130" y2="-55" stroke="#88ff88" stroke-dasharray="1 1" stroke-width="0.1" />
    <line x1="140" y1="45" x2="220" y2="35" stroke="#88ff88" stroke-dasharray="1 1" stroke-width="0.1" />


    <animate
      ref="fadeinnet"
      attributeType="CSS"
      attributeName="opacity"
      dur="6s"
      values="0; 0; 1"
      keyTimes="0; 0.75; 1"
      repeatCount="1"
      restart="always"
      calcMode="linear"
      fill="freeze"
    />
  </g>

  <line x1="-120" y1="35" x2="120" y2="-35" stroke="#88ff88" stroke-dasharray="2 2" />


  <g transform="translate(-10 2.85) scale(1.5) rotate(-106)">
    <g>
      <ship :showEngines="true" />
      <animateTransform
        ref="shipmove"
        attributeName="transform"
        attributeType="XML"
        type="translate"
        dur="20s"
        values="0 15; 0 -15"
        keyTimes="0; 1"
        calcMode="linear"
        restart="always"
        fill="freeze"
        repeatCount="1"
      />
    </g>
  </g>

  <g transform="translate(-120 35) scale(0.4)">
    <portal />
  </g>

  <g transform="translate(120 -35) scale(0.3)">
    <portal />
  </g>


  <animateTransform
    ref="scalein6"
    attributeName="transform"
    attributeType="XML"
    type="scale"
    dur="8s"
    values="50; 1; 1.1"
    keyTimes="0; 0.25; 1"
    calcMode="linear"
    restart="always"
    fill="freeze"
    repeatCount="1"
  />

  <animate
    ref="fadein6"
    attributeType="CSS"
    attributeName="opacity"
    dur="2s"
    values="0; 1"
    keyTimes="0; 1"
    repeatCount="1"
    restart="always"
    calcMode="linear"
    fill="freeze"
  />

</g>
</template>

<style scoped>
</style>
