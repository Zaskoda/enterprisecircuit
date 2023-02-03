<script setup lang="ts">
import btn from './ui/widgets/button-basic.svg.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'

import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'
import { useGalaxy } from '../stores/galaxy'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      galaxy: useGalaxy(),
      routing: useRouting(),
    }
  },
  methods: {
    async init() {
      await this.galaxy.connect()
      await this.galaxy.getAll()
    },
    async moveTo(systemId:number) {
      await this.galaxy.moveToSystem(systemId)
      await this.galaxy.getAll()
    }
  }
}
</script>

<template>
    <SpaceBackground  />

      <g v-if="!galaxy.isConnected">
        <btn :width="210" :height="50" @click="init()" font-size="20" :text="'Load Data'"  />
      </g>
      <g v-else font-size="9px">
        <btn :width="210" :height="50"
          @click="init()"
          font-size="20"
          :text="'Reload Data'"
          transform="translate(0 -150)" />

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


      <g font-size="12px" :transform="'translate(0 ' + (screen.bottom - 40) + ')'">
        <btn
          :width="120" :height="20"
          text="close"
          @click="routing.switch('title')"
          />
      </g>
</template>

<style scoped>
</style>
