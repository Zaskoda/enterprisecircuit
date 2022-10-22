<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import backdrop from './sprites/SpaceBackground.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import LogoOrbiter8 from './sprites/LogoOrbiter8.svg.vue'
import SpaceStation from './sprites/SpaceStation.svg.vue'
import starfield from './assets/starfield.svg.vue'
import LogoPartavate from './assets/LogoPartavate.svg.vue'

import { useUI } from '../stores/ui'
import { useRouting } from '../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
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
  <svgContainer>
  <g>
    <backdrop  transform="scale(1)" />
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

    <g transform="translate(0 0)">
      <g>
        <g>
          <g transform="translate(-260 0) scale(1)" opacity="1">
            <g>
              <SpaceStation :size="30" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="0; 360"
                dur="20s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </g>

        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="360; 0"
          dur="360s"
          repeatCount="indefinite"
        />
      </g>
    </g>


    <g :transform="'translate(0 90)'" v-if="!ui.isAutoPresent">
      <g>
        <rect
          :x="ui.left"
          y="-70"
          :width="ui.right - ui.left"
          height="220"
          fill="#000000"
          fill-opacity="0.2"
          />
      </g>
      <g  font-size="22px">
        <btn
          :width="300" :height="45"
          text="START"
           @click="routing.switchScreen('play')"
          transform="translate(0 -25)" />
      </g>
      <g  font-size="18px" transform="translate(0 55)">
        <btn
          :width="240" :height="36"
          text="The Story"
           @click="routing.switchScreen('about')"
          transform="translate(0 -25)" />
      </g>
      <g  font-size="14px" transform="translate(0 100)">
        <btn
          :width="180" :height="24"
          text="Settings"
           @click="routing.switchScreen('settings')"
          transform="translate(0 -25)" />
      </g>
      <g  font-size="10px" transform="translate(0 135)">
        <btn
          :width="120" :height="20"
          text="Asset Viewer"
           @click="routing.switchScreen('assets')"
          transform="translate(0 -25)" />
      </g>
    </g>

    <LogoOrbiter8  :transform="'translate(0 -80) scale(0.5)'" />
    <LogoPartavate  :transform="'translate(0 ' + (ui.bottom - 25) + ') scale(0.1)'" />

  </svgContainer>
</template>

<style scoped>
</style>
