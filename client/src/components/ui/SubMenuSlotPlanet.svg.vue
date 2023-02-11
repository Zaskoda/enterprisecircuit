<script setup lang="ts">

import { useWorld } from '../../stores/world'
import Planet from '../assets/sprites/Planet.svg.vue'
import Moon from '../assets/sprites/Moon.svg.vue'
import SpaceStation from '../assets/sprites/SpaceStation.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['close'],
  props: {
    planetIndex: {
      type: Number,
      default: 0
    },
  },
  data () {
    return {
      world: useWorld(),
    }
  },
  computed: {
    planet() {
      return this.world.sprites[this.planetIndex]
    },
    moons() {
      return this.world.sprites.filter(sprite => {
        return (
          (sprite.type == 'Moon') &&
          (sprite.orbit.parent == this.planetIndex)
        )
      })
    },
    station() {
      return this.world.sprites.filter(sprite => {
        return (
          (sprite.type == 'Station') &&
          (sprite.orbit.parent == this.planetIndex)
        )
      })
    }
  },
}
</script>

<template>
   <g>
      <Planet
        transform="translate(-360 0)"
        :size="planet.meta.size * 1.5 + 5"
        :classification="planet.meta.class"
        :luminance-intensity="0.5"
        :luminance-rotation="160"
        :rings="planet.meta.rings" />
        <g transform="translate(-150 0)"  font-size="28px" text-anchor="end">
          <g transform="translate(2 -8)">
            <text stroke="#000000" stroke-width="4" fill="#000000">{{ planet.meta.name }}</text>
          </g>
          <g transform="translate(0 -10)">
            <text fill="#ffddff">{{ planet.meta.name }}</text>
          </g>
          <g transform="translate(2 22)" font-size="20px">
            <text stroke="#000000" stroke-width="4" fill="#000000">{{ planet.meta.className }}</text>
          </g>
          <g transform="translate(0 24)" font-size="20px">
            <text fill="#ffffdd">{{ planet.meta.className }}</text>
          </g>
        </g>
        <g transform="translate(-40 38)">
          <g v-for="moon,index in moons" :transform="'translate(' + (index * 70) + ' 0)'">
            <g transform="translate(-20 -20)">
              <Moon :size="moon.meta.size + 2" />
            </g>
            <g transform="translate(-5 -10) rotate(-40)">
              <text text-anchor="middle" font-size="14px" fill="#888888">{{ moon.meta.name }}</text>
            </g>
          </g>
        </g>
        <g transform="translate(-50 -20)" v-if="station.length > 0">
          <g transform="translate(0 0)">
            <g transform="translate(-35 0)">
              <SpaceStation :size="station[0].meta.size * 4 + 4"  />
            </g>
            <g transform="">
              <text text-anchor="start" font-size="22px" fill="#aaaaaa">[{{ station[0].getPortType() }}] {{ station[0].meta.name }}</text>
            </g>
          </g>
        </g>
  </g>
</template>

<style scoped>
</style>