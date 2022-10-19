<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import backdrop from './assets/backdrop.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import logo from './assets/logo.svg.vue'
import ship1 from './assets/shipO8.svg.vue'
import ship2 from './assets/shipMB.svg.vue'
import ship3 from './assets/shipPG.svg.vue'
import starfield from './assets/starfield.svg.vue'
import portal from './assets/portal.svg.vue'

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
    if (this.ui.isAutoPresent) {
      setTimeout(() => { this.routing.switchScreen('about') }, 8000)
    }
  },
  methods: {
  }
}
</script>

<template>
  <svgContainer>
  <g>
    <backdrop  transform="scale(2)" />
  </g>

    <logo  :transform="'translate(0 ' + (ui.top + 120) + ') scale(0.4)'" />


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

    <g transform="translate(0 40) scale(2)">
      <g>
        <g>
          <g>
            <portal transform="scale(1.5)" />

            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="scale"
              values="0.8; 1.2; 0.8"
              dur="60s"
              repeatCount="indefinite"
            />
          </g>
          <g transform="translate(-40 40) rotate(45) scale(2)" opacity="1">
            <g>
              <ship1 :showEngines="true" />

              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="scale"
                values="0.90; 1; 0.90"
                dur="4s"
                repeatCount="indefinite"
              />
            </g>
          </g>
          <g transform="rotate(-35)">
            <g transform="translate(-40 40) rotate(45) scale(2)" opacity="1">
              <g>
                <ship2 :showEngines="true" />

                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="scale"
                  values="0.90; 1; 0.90"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          </g>
          <g transform="rotate(35)">
            <g transform="translate(-40 40) rotate(45) scale(2)" opacity="1">
              <g>
                <ship3 :showEngines="true" />

                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="scale"
                  values="0.90; 1; 0.90"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          </g>

        </g>

        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="360; 0"
          dur="240s"
          repeatCount="indefinite"
        />
      </g>
    </g>


    <g :transform="'translate(0 ' + (ui.bottom - 50) + ')'" v-if="!ui.isAutoPresent">
      <rect
        :x="ui.left"
        y="-100"
        :width="ui.right - ui.left"
        height="150"
        fill="#000000"
        fill-opacity="0.2"
        />
      <g  font-size="30px">
        <btn
          :width="300" :height="60"
          text="Begin"
           @click="routing.switchScreen('about')"
          transform="translate(0 -20)" />
      </g>


    </g>

  </svgContainer>
</template>

<style scoped>
</style>
