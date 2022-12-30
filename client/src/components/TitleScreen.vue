<script setup lang="ts">
import EVMStatus from './EVMStatus.svg.vue'
import svgContainer from './layouts/svgContainer.vue'
import backdrop from './assets/sprites/SpaceBackground.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import LogoOrbiter8 from './assets/sprites/LogoOrbiter8.svg.vue'
import SpaceStation from './assets/sprites/SpaceStation.svg.vue'
import PlayerShip from './assets/sprites/PlayerShip.svg.vue'
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
          <g transform="translate(-300 0) scale(1.25)" opacity="1">
            <g>
              <SpaceStation :size="30" />
              <g transform="translate(30 0) scale(0.30) rotate(180)">
                <PlayerShip :type="137" />
              </g>
              <g transform="translate(-30 0) scale(0.30)">
                <PlayerShip :type="288" />
              </g>
              <g transform="translate(0 30) scale(0.35) rotate(270)">
                <PlayerShip :type="1284" />
              </g>
              <g transform="translate(0 -30) scale(0.30) rotate(90)">
                <PlayerShip :type="1" />
              </g>

              <g transform="translate(20 0)">
                <g>
                  <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="0; 360"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </g>
                <g>
                  <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="360; 0"
                    dur="14s"
                    repeatCount="indefinite"
                  />
                </g>
              </g>

              <g transform="translate(-20 0)">
                <g>
                  <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="0; 360"
                    dur="14s"
                    repeatCount="indefinite"
                  />
                </g>
                <g>
                  <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="360; 0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </g>
              </g>


              <g transform="translate(0 20)">
                <g>
                  <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="0; 360"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </g>
                <g>
                  <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="360; 0"
                    dur="14s"
                    repeatCount="indefinite"
                  />
                </g>
              </g>


              <g transform="translate(0 -20)">
                <g>
                  <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="0; 360"
                    dur="14s"
                    repeatCount="indefinite"
                  />
                </g>
                <g>
                  <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="360; 0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </g>
              </g>

              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="0; 360"
                dur="30s"
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


    <g :transform="'translate(0 90)'">
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
          :width="120" :height="36"
          text="Portal"
           @click="routing.switchScreen('storya')"
          transform="translate(-125 -25)" />
        <btn
          :width="120" :height="36"
          text="Tween"
           @click="routing.switchScreen('storyb')"
          transform="translate(0 -25)" />
        <btn
          :width="120" :height="36"
          text="Avatars"
           @click="routing.switchScreen('avatars')"
          transform="translate(125 -25)" />
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
      <g  font-size="10px" transform="translate(0 160)">
        <btn
          :width="80" :height="15"
          text="Ships"
           @click="routing.switchScreen('four')"
          transform="translate(0 -25)" />
      </g>
    </g>

    <LogoOrbiter8  :transform="'translate(0 -80) scale(0.5)'" />
    <LogoPartavate  :transform="'translate(0 ' + (ui.bottom - 25) + ') scale(0.1)'" />


    <g>
      <EVMStatus />
    </g>

    <g v-if="false" :transform="'translate('+ ui.mouseX + ' ' + ui.mouseY  + ')'">
      <g :transform="'scale(' + 0.75 + ') rotate(' + (ui.window.mouseDirection - 90) + ')'">
        <g transform="translate(0 25)">
        <PlayerShip :show-engines="true" />
        </g>
      </g>
    </g>

  </svgContainer>
</template>

<style scoped>
</style>
