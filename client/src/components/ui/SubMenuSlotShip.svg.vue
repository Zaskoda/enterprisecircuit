<script setup lang="ts">

import { useWorld } from '../../stores/world'
import Ship from '../assets/sprites/PlayerShip.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['close'],
  props: {
    shipIndex: {
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
    ship() {
      return this.world.sprites[this.shipIndex]
    },
    owner():string {
      let ownerAddress = this.ship.owner
      console.log('finding owner')
      console.log(JSON.stringify(this.world.avatar.addressToName))
      if (this.world.avatar.addressToName[ownerAddress]) {
       return this.world.avatar.addressToName[ownerAddress]
      }
      return ownerAddress
    },
    orbiting():string {
      let parentSprite = this.world.sprites[this.ship.orbit.parent]
      return parentSprite.meta.name
    }
  },
}
</script>

<template>
   <g>
      <Ship
        :size="10"
        :show-engines="true"
        transform="translate(-260 0) rotate(220)"/>
        <g transform="translate(-180 -10)"  font-size="32px" text-anchor="start">
          <g transform="translate(52 -8)">
            <text stroke="#000000" stroke-width="4" fill="#000000">{{ ship.meta.name }}</text>
          </g>
          <g transform="translate(50 -10)">
            <text fill="#ffddff">{{ ship.meta.name }}</text>
          </g>
          <g transform="translate(100 25)" font-size="20px" text-anchor="end">
            <text fill="#888888">Command:</text>
          </g>
          <g transform="translate(100 50)" font-size="20px" text-anchor="end">
            <text fill="#888888">Orbiting:</text>
          </g>
          <g transform="translate(105 25)" font-size="20px">
            <text fill="#ffffff">{{ owner }}</text>
          </g>
          <g transform="translate(105 50)" font-size="20px">
            <text fill="#ffffff">{{ orbiting }}</text>
          </g>
        </g>
  </g>
</template>

<style scoped>
</style>