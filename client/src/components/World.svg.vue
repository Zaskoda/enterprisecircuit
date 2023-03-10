<script setup lang="ts">
import { mapState } from 'pinia'

import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'
import { useEVM } from "../stores/evm"
import { useClock } from "../stores/clock"

import { useWorld } from '../stores/world'

import Sprite from './Sprite.svg.vue'

import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'
import Gridlines from './assets/Gridlines.svg.vue'
import StarfieldRandom from './assets/StarfieldRandom.svg.vue'

import Worldly from './transformers/worldly.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      mouseHold: false,
      screen: useScreen(),
      routing: useRouting(),
      world: useWorld(),
      evm: useEVM(),
      clock: useClock(),
      dragOriginX: 0,
      dragOriginY: 0,
    }
  },
  watch: {
    gameTime() {
      this.world.updateSpriteOrbits()
    }
  },
  async mounted () {
    window.addEventListener('keyup', this.keyHandler)
    window.addEventListener('wheel', this.wheelHandler)
    window.addEventListener('mousemove', this.mouseMoveHandler)

    this.world.newWorldZoom()
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.wheelHandler)
    window.removeEventListener('keyup', this.keyHandler)
    window.removeEventListener('mousemove', this.mouseMoveHandler)
  },
  methods: {
    async moveTo(systemId:number) {
      await this.world.galaxy.moveToSystem(systemId)
    },
    wheelHandler(event:any) {
      if (event.deltaY > 0) {
        this.world.zoomOut()
      } else if (event.deltaY < 0) {
        this.world.zoomIn()
      }
    },
    keyHandler() {
    },
    logSprite(sprite:Object) {
      console.log(JSON.stringify(sprite))
    },
    mouseDragOn() {
      console.log('dragging')
      this.world.deselect()
      this.mouseHold = true
      this.dragOriginX = this.screen.mouseX
      this.dragOriginY = this.screen.mouseY
    },
    mouseDragOff() {
      if (this.mouseHold) {
        this.mouseHold = false
        console.log('not draggin')
      }
    },
    mouseMoveHandler(event:any) {
      if (this.mouseHold) {
        let newX = this.screen.mouseX
        let newY = this.screen.mouseY
        let xDiff = (newX - this.dragOriginX) / this.world.getZoomLevel
        let yDiff = (newY - this.dragOriginY) / this.world.getZoomLevel
        this.world.moveViewTo(this.world.viewPoint.x + xDiff, this.world.viewPoint.y + yDiff)
        this.dragOriginX = newX
        this.dragOriginY = newY
      }
    }
  },
  computed: {
    ...mapState(useEVM, ['block', 'isConnected']),
    ...mapState(useClock, ['gameTimeInSeconds', 'gameTime']),
  }
}
</script>

<template>
  <g transform="translate(0 0)">

    <Worldly :depth="9">
      <SpaceBackground />
    </Worldly>

    <Worldly v-for="n in 6" :depth="8 - n">
      <StarfieldRandom :count="250" :scale="10 + (n / 2)" :range="4000 / n" />
    </Worldly>

    <Worldly>
      <Gridlines />
    </Worldly>

    <g :class="{ 'is-dragging': mouseHold }"
        v-on:mousedown="mouseDragOn()"
        v-on:mouseup="mouseDragOff()"
        >
      <rect
        :x="screen.left" :y="screen.top"
        :width="screen.width" :height="screen.height"
        opacity="0"
        fill="#000000" />
    </g>

    <Worldly>
      <g v-for="(sprite, index) in world.sprites" @click="world.select(index)" class="canclick">
        <Sprite
          :selected="world.selectedSprite == index"
          :sprite="sprite"
        />
      </g>
    </Worldly>
  </g>

  <g font-size="10px" transform="translate(0 200)" v-if="false">
    <g transform="translate(0 -100)">
      <text fill="#888">System Count: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.systemCount }}</tspan></text>
    </g>

    <g transform="translate(0 -80)">
      <text fill="#888">Credit Balance: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.creditBalance }}</tspan></text>
    </g>
    <g transform="translate(0 -60)">
      <text fill="#888">Ship Location: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.shipLocation }}</tspan></text>
    </g>
    <g transform="translate(0 -40)">
      <text fill="#888">Ship Id: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.shipId }}</tspan></text>
    </g>
    <g transform="translate(0 -20)">
      <text fill="#888">Ship: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.ship }}</tspan></text>
    </g>
    <g transform="translate(0 15)">
      <text transform="translate(-170 0)" fill="#888">Id: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.systemData.id }}</tspan></text>
      <text transform="translate(-135 0)" fill="#888">Name: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.systemData.name }}</tspan></text>
      <text transform="translate(-95 0)" fill="#888">Size: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.systemData.starSize }}</tspan></text>
      <text transform="translate(-30 0)" fill="#888">Birth: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.systemData.birthtime }}</tspan></text>
      <text transform="translate(150 0)" fill="#888">Disc By: <tspan fill="#ffffff" font-weight="bold">{{ world.galaxy.chainstate.systemData.discoveredBy }}</tspan></text>
      <text transform="translate(-150 15)" fill="#888">Neighbors: <tspan @click="moveTo(n)" class="canclick" fill="#ffffff" font-weight="bold" v-for="n in world.galaxy.chainstate.systemData.neighbors"> ({{  n }})  </tspan></text>
      <text transform="translate(120 15)" fill="#888">Planets: <tspan fill="#ffffff" font-weight="bold" v-for="p in world.galaxy.chainstate.systemData.planets"> ({{ p }}) </tspan></text>
      <text transform="translate(0 30)" fill="#888">Logs: <tspan fill="#ffffff" font-weight="bold" v-for="l in world.galaxy.chainstate.systemData.logs"> ({{ l }}) </tspan></text>
    </g>
    <g transform="translate(0 70)">
      <text fill="#888">Ships: <tspan fill="#ffffff" font-weight="bold" v-for="s in world.galaxy.chainstate.ships"> ({{ s }}) </tspan></text>
    </g>
    <g transform="translate(0 85)">
      <text fill="#888">planets: <tspan fill="#ffffff" font-weight="bold" v-for="p in world.galaxy.chainstate.planets"> ({{ p }}) </tspan></text>
    </g>
    <g transform="translate(0 100)">
      <text fill="#888">localPlanets: <tspan fill="#ffffff" font-weight="bold" v-for="p in world.galaxy.chainstate.localPlanets"> ({{ p }}) </tspan></text>
    </g>
  </g>
</template>

<style scoped>
.is-dragging {
  cursor: grabbing;
}

</style>
