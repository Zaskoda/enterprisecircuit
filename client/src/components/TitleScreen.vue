<script setup lang="ts">
import backdrop from './assets/sprites/SpaceBackground.svg.vue'
import OrbitingStation from './assets/scenes/OrbitingStation.svg.vue'
import starfield from './assets/Starfield.svg.vue'

import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
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
</template>

<style scoped>
</style>
