<script setup lang="ts">
import { mapState } from 'pinia'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
import { useEVM } from "../stores/evm"
import { useClock } from "../stores/clock"

import { useWorld } from '../stores/world'

import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'

import Star from './assets/sprites/Star.svg.vue'
import Planet from './assets/sprites/Planet.svg.vue'
import Moon from './assets/sprites/Moon.svg.vue'
import SpaceStation from './assets/sprites/SpaceStation.svg.vue'

</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      avatar: useAvatar(),
      galaxy: useGalaxy(),
      world: useWorld(),
      evm: useEVM(),
      clock: useClock()
    }
  },
  async mounted() {
    this.world.loadSprites()
  },
  watch: {
    gameTime() {
      this.world.updateSpriteOrbits()
    }
  },
  methods: {
    async moveTo(systemId:number) {
      await this.galaxy.moveToSystem(systemId)
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected']),
    ...mapState(useClock, ['gameTimeInSeconds', 'gameTime'])
  }
}
</script>

<template>
  <g transform="translate(0 -100)">
    <text transform="translate(0 -200)">{{  gameTime  }}</text>

    <g transform="translate(-300 00)">

      <g v-for="sprite in world.sprites" :transform="'translate(' + sprite.position.x + ' ' + sprite.position.y + ')'">
        <Star
          v-if="sprite.type == 'Star'"
          :size="sprite.metaData.size"
        />
        <Planet
          v-if="sprite.type == 'Planet'"
          :size="sprite.metaData.size"
          :rings="sprite.metaData.rings"
          :classification="sprite.metaData.classification"
        />
        <Moon
          v-if="sprite.type == 'Moon'"
          :size="sprite.metaData.size"
        />
        <SpaceStation
          v-if="sprite.type == 'SpaceStation'"
          :size="sprite.metaData.size"
        />
      </g>
    </g>

  </g>


  <g font-size="10px" transform="translate(0 200)" v-if="false">
    <g transform="translate(0 -100)">
      <text fill="#888">System Count: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.systemCount }}</tspan></text>
    </g>


    <g transform="translate(0 -80)">
      <text fill="#888">Credit Balance: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.creditBalance }}</tspan></text>
    </g>
    <g transform="translate(0 -60)">
      <text fill="#888">Ship Location: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.shipLocation }}</tspan></text>
    </g>
    <g transform="translate(0 -40)">
      <text fill="#888">Ship Id: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.shipId }}</tspan></text>
    </g>
    <g transform="translate(0 -20)">
      <text fill="#888">Ship: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.ship }}</tspan></text>
    </g>
    <g transform="translate(0 15)">
      <text transform="translate(-170 0)" fill="#888">Id: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.systemData.id }}</tspan></text>
      <text transform="translate(-135 0)" fill="#888">Name: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.systemData.name }}</tspan></text>
      <text transform="translate(-95 0)" fill="#888">Size: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.systemData.starSize }}</tspan></text>
      <text transform="translate(-30 0)" fill="#888">Birth: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.systemData.birthtime }}</tspan></text>
      <text transform="translate(150 0)" fill="#888">Disc By: <tspan fill="#ffffff" font-weight="bold">{{ galaxy.chainstate.systemData.discoveredBy }}</tspan></text>
      <text transform="translate(-150 15)" fill="#888">Neighbors: <tspan @click="moveTo(n)" class="canclick" fill="#ffffff" font-weight="bold" v-for="n in galaxy.chainstate.systemData.neighbors"> ({{  n }})  </tspan></text>
      <text transform="translate(120 15)" fill="#888">Planets: <tspan fill="#ffffff" font-weight="bold" v-for="p in galaxy.chainstate.systemData.planets"> ({{ p }}) </tspan></text>
      <text transform="translate(0 30)" fill="#888">Logs: <tspan fill="#ffffff" font-weight="bold" v-for="l in galaxy.chainstate.systemData.logs"> ({{ l }}) </tspan></text>
    </g>
    <g transform="translate(0 70)">
      <text fill="#888">Ships: <tspan fill="#ffffff" font-weight="bold" v-for="s in galaxy.chainstate.ships"> ({{ s }}) </tspan></text>
    </g>
    <g transform="translate(0 85)">
      <text fill="#888">planets: <tspan fill="#ffffff" font-weight="bold" v-for="p in galaxy.chainstate.planets"> ({{ p }}) </tspan></text>
    </g>
    <g transform="translate(0 100)">
      <text fill="#888">localPlanets: <tspan fill="#ffffff" font-weight="bold" v-for="p in galaxy.chainstate.localPlanets"> ({{ p }}) </tspan></text>
    </g>
  </g>
</template>

<style scoped>
</style>
