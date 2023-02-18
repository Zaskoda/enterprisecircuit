<script setup lang="ts">
import btn from './widgets/button-basic.svg.vue'
import LogoOrbiter8 from '../assets/sprites/LogoOrbiter8.svg.vue'

import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'
import { useRouting } from '../../stores/routing'
import { useWorld } from '../../stores/world'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      screen: useScreen(),
      routing: useRouting(),
      world: useWorld()
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>
    <g transform="translate(0 100)">
      <g>
        <rect
          :x="screen.left - 5"
          :y="-420 * ui.UIScale"
          :width="screen.width + 10"
          :height="640 * ui.UIScale"
          stroke="#ffffff"
          stroke-width="2"
          stroke-opacity="0.1"
          fill="#000000"
          fill-opacity="0.4"
          />
      </g>

      <g transform="translate(0 -270)">
        <g>
          <LogoOrbiter8 transform="scale(1.25)" />
        </g>
      </g>

      <g :transform="'scale(' + ui.UIScale + ')'">
        <g  font-size="48px" transform="translate(0 20)">
          <g v-if="!world.isConnected">
            <btn
              :width="520" :height="100"
              text="Connect"
              @click="ui.changeMenu('connect')"
              />
            </g>
          <g v-else-if="!world.avatar.haveAvatar">
            <btn
              fill="#ffffff"
              :width="520"
              :height="100"
              text="Begin"
              @click="routing.switch('play')"
            />
          </g>
          <g v-else-if="!world.galaxy.haveShip">
            <btn
              fill="#ffffff"
              :width="520"
              :height="100"
              text="Launch"
              @click="routing.switch('play')"
            />
          </g>
          <g v-else>
            <btn
              fill="#ffffff"
              :width="520"
              :height="100"
              text="Continue"
              @click="routing.switch('play')"
            />
          </g>
        </g>
        <g  font-size="34px" transform="translate(0 140)">
          <btn
            :width="240" :height="65"
            text="Network"
            @click="ui.changeMenu('connect')"
            transform="translate(140 0)" />
          <btn
            :width="240" :height="65"
            text="Settings"
            @click="ui.changeMenu('settings')"
            transform="translate(-140 0)" />
        </g>
        <g  font-size="28px" transform="translate(0 240) scale(0.5)">
          <btn
            :width="180" :height="50"
            text="Window"
            @click="routing.switch('window')"
            transform="translate(-285 0)" />
          <btn
            :width="180" :height="50"
            text="Portal"
            @click="routing.switch('storya')"
            transform="translate(-95 0)" />
          <btn
            :width="180" :height="50"
            text="Tween"
            @click="routing.switch('storyb')"
            transform="translate(95 0)" />
          <btn
            :width="180" :height="50"
            text="Galaxy"
            @click="routing.switch('galaxy')"
            transform="translate(285 0)" />
        </g>
        <g  font-size="28px" transform="translate(0 270) scale(0.5)">
          <btn
            :width="180" :height="50"
            text="Assets"
            @click="routing.switch('assets')"
            transform="translate(-190 0)" />
          <btn
            :width="180" :height="50"
            text="Ships"
            @click="routing.switch('four')"
            transform="translate(0 0)" />
          <btn
            :width="180" :height="50"
            text="Avatars"
            @click="routing.switch('avatars')"
            transform="translate(190 0)" />
        </g>
      </g>
    </g>


</template>

<style scoped>
</style>
