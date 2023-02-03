<script setup lang="ts">
import icon from './_icon.svg.vue'
import Ship from '../../assets/geometry/ShipOrbiter8.svg.vue'
</script>

<script lang="ts">
export default {
  props: {
    counter: {
      type: Number,
      default: 0
    }
  },
}
</script>

<template>
  <icon :counter="counter">
    <Ship transform="translate(16 -6) scale(0.0025)" />
    <Ship transform="translate(6 0)   scale(0.0035)" />
    <Ship transform="translate(-8 8)  scale(0.0050)" />
  </icon>
</template>


