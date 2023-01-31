<script setup lang="ts">
import Star from './assets/sprites/Star.svg.vue'
import Planet from './assets/sprites/Planet.svg.vue'
import Moon from './assets/sprites/Moon.svg.vue'
import SpaceStation from './assets/sprites/SpaceStation.svg.vue'
import Ship from './assets/sprites/PlayerShip.svg.vue'
import { Sprite } from '../models/sprite'
</script>

<script lang="ts">
export default {
  props: {
    sprite: {
      type: Sprite,
      default: new Sprite({})
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <g :transform="'translate(' + sprite.position.x + ' ' + sprite.position.y + ')'">
    <circle
          fill-opacity="0" fill="#000000"
          stroke="#ffffff"
          stroke-opacity="0.75"
          :stroke-width="0.05 * sprite.meta.size"
          stroke-dasharray="2 2"
          :r="sprite.meta.size * 2 + 5"
          v-if="selected"
          />
      <Star
        v-if="sprite.type == 'Star'"
        :size="sprite.meta.size"
      />
      <Planet
        v-if="sprite.type == 'Planet'"
        :size="sprite.meta.size"
        :rings="sprite.meta.rings"
        :classification="sprite.meta.class"
        :luminance-rotation="sprite.luminance.rotation"
        :luminance-intensity="sprite.luminance.intensity"
      />
      <Moon
        v-if="sprite.type == 'Moon'"
        :size="sprite.meta.size"
      />
      <SpaceStation
        v-if="sprite.type == 'Station'"
        :size="sprite.meta.size"
      />
      <Ship
        v-if="sprite.type == 'Ship'"
        :size="1"
        :show-engines="true"
        :rotation="sprite.rotation"
      />
  </g>
</template>

<style scoped>
</style>
