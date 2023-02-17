<script setup lang="ts">
import minerva from '../geometry/Minerva.svg.vue'
</script>

<template>
<g>
  <rect
    x="-110"
    y="-64"
    width="220"
    height="192"
    fill="#310e5b"
    fill-opacity="1"
    stroke="#ffffff"
    stroke-width="1"
    stroke-opacity="0.25"
    rx="10"
    ry="10"
  />
  <minerva />
  <text transform="translate(0 80)"
    font-size="29px"
    font-family="monospace"
    fill="#aaaaaa"
    >MINERVA AMI</text>
  <text transform="translate(0 108)"
    font-size="14px"
    fill="#888888"
    >
    Artificial Machine Intelligence
  </text>
</g>
</template>