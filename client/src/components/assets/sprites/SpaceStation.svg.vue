<script setup lang="ts">
import SpaceStation from '../geometry/SpaceStation.svg.vue'
</script>

<script lang="ts">
export default {
  props: {
    size: {
      type: Number,
      default: 1
    },
    rotation: {
      type: Number,
      default: 0
    }
  }
}
</script>

<template>
<g>
  <g :transform="'scale(' + (size / 1000 + 0.02) + ') rotate(' + rotation + ')'">
    <circle cx="0" cy="0" r="400" stroke-width="0" fill="#c3b3da00" />
    <space-station />
  </g>
</g>
</template>
