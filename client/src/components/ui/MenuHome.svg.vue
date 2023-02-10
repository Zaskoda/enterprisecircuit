<script setup lang="ts">
import btn from './widgets/button-basic.svg.vue'
import LogoOrbiter8 from '../assets/sprites/LogoOrbiter8.svg.vue'

import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'
import { useRouting } from '../../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      screen: useScreen(),
      routing: useRouting(),
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>
    <g transform="translate(0 140)">
      <g>
        <rect
          :x="screen.left - 5"
          :y="-400 * ui.UIScale"
          :width="screen.width + 10"
          :height="500 * ui.UIScale"
          stroke="#ffffff"
          stroke-width="1"
          stroke-opacity="0.25"
          fill="#000000"
          fill-opacity="0.2"
          />
      </g>

      <g transform="translate(0 -240)">
        <g>
          <LogoOrbiter8 transform="scale(0.8)" />
        </g>
      </g>

      <g :transform="'scale(' + ui.UIScale + ')'">
        <g  font-size="48px" transform="translate(0 -50)">
          <btn
            :width="300" :height="80"
            text="Play"
            @click="ui.changeMenu('connect')"
             />
        </g>
        <g  font-size="36px" transform="translate(0 65)">
          <btn
            :width="300" :height="65"
            text="Settings"
            @click="ui.changeMenu('settings')"
            transform="translate(0 -25)" />
        </g>
        <g  font-size="28px" transform="translate(0 170) scale(0.75)">
          <btn
            :width="180" :height="50"
            text="Window"
            @click="routing.switch('window')"
            transform="translate(-300 0)" />
          <btn
            :width="180" :height="50"
            text="Portal"
            @click="routing.switch('storya')"
            transform="translate(-100 0)" />
          <btn
            :width="180" :height="50"
            text="Tween"
            @click="routing.switch('storyb')"
            transform="translate(100 0)" />
          <btn
            :width="180" :height="50"
            text="Galaxy"
            @click="routing.switch('galaxy')"
            transform="translate(300 0)" />
        </g>
        <g  font-size="28px" transform="translate(0 220) scale(0.75)">
          <btn
            :width="180" :height="50"
            text="Assets"
            @click="routing.switch('assets')"
            transform="translate(-200 0)" />
          <btn
            :width="180" :height="50"
            text="Ships"
            @click="routing.switch('four')"
            transform="translate(0 0)" />
          <btn
            :width="180" :height="50"
            text="Avatars"
            @click="routing.switch('avatars')"
            transform="translate(200 0)" />
        </g>
      </g>
    </g>


</template>

<style scoped>
</style>
