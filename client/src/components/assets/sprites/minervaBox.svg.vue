<script setup lang="ts">
import minerva from '../geometry/Minerva.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      state: '',
      xOffset: 0,
      heightPercent: 1
    }
  }
}
</script>

<template>
<g>
  <rect
    x="-100"
    y="-64"
    width="200"
    height="128"
    fill="#280b4b"
    fill-opacity="1"
    stroke="#ffffff"
    stroke-width="1"
    stroke-opacity="0.25"
    rx="10"
    ry="10"
  />

  <g fill-opacity="0.75">
    <ellipse rx="4" :ry="4 * heightPercent" :cx="-28 + xOffset" cy="-2"  />
    <ellipse rx="4" :ry="4 * heightPercent" :cx="28 + xOffset" cy="-2"  />
  </g>

  <minerva />
</g>
</template>