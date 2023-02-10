<script setup lang="ts">
import backdrop from './assets/sprites/SpaceBackground.svg.vue'
import OrbitingStation from './assets/scenes/OrbitingStation.svg.vue'
import starfield from './assets/Starfield.svg.vue'
import Star from './assets/sprites/Star.svg.vue'
import Planet from './assets/sprites/Planet.svg.vue'


import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'

import PlayerShip from './assets/sprites/PlayerShip.svg.vue'
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

    <g transform="rotate(0)">
      <g>
        <g>
          <g transform="rotate(69)">
            <PlayerShip :size="1" :showEngines="true" />
          </g>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="scale"
          from="0"
          to="40"
          dur="160s"
          repeatCount="indefinite"
        />
        </g>
      </g>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="translate"
        :from="(screen.right * 2) + ' ' + (screen.top * 2)"
        :to="(screen.left * 3) + ' ' + (screen.bottom * 2)"
        dur="160s"
        repeatCount="indefinite"
      />
    </g>

  </g>

  <g :transform="'translate(' + (screen.left + 200) + ' ' + (screen.top + 150) + ')'">
    <Star :size="3" />/
    <g>
      <starfield />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="360"
        to="0"
        dur="240s"
        repeatCount="indefinite"
      />
    </g>
    <g>
      <g>
        <g transform="rotate(0)">
          <g :transform="'translate(' + 100 + ' -40)'">
            <PlayerShip :size="1" :showEngines="true" />
          </g>
        </g>

        <g transform="rotate(120)">
          <g :transform="'translate(' + 100 + ' -40)'">
            <PlayerShip :size="1" :showEngines="true" />
          </g>
        </g>

        <g transform="rotate(240)">
          <g :transform="'translate(' + 100 + ' -40)'">
            <PlayerShip :size="1  " :showEngines="true" />
          </g>
        </g>

      </g>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0"
        to="360"
        dur="45s"
        repeatCount="indefinite"
      />
    </g>
  </g>
  <g :transform="'translate(' + (screen.right - 150) + ' ' + (screen.bottom - 150) + ')'">
    <g transform="scale(1)">
      <Planet :classification="2" :rings="8" :size="160" :luminance-intensity="0.5" v-bind:luminance-rotation="36" />
      <g transform="rotate(180)">
        <OrbitingStation transform="scale(2.5)" v-if="true" />
      </g>
      <g>
        <OrbitingStation transform="scale(2.5)" v-if="true" />
      </g>
    </g>
  </g>
  <g>
  </g>
</template>

<style scoped>
</style>
