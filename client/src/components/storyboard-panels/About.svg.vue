<script setup lang="ts">
import panelNavigation from './panelNavigation.svg.vue'
import panelDialogue from './panelDialogue.svg.vue'

import AboutPanel01 from './about-panels/AboutPanel01.svg.vue'
import AboutPanel02 from './about-panels/AboutPanel02.svg.vue'
import AboutPanel03 from './about-panels/AboutPanel03.svg.vue'
import AboutPanel04 from './about-panels/AboutPanel04.svg.vue'
import AboutPanel05 from './about-panels/AboutPanel05.svg.vue'
import AboutPanel06 from './about-panels/AboutPanel06.svg.vue'
import SpaceBackground from '../assets/sprites/SpaceBackground.svg.vue'

import { useAutoPlay } from './composables/autoPlay'

import { useScreen } from '../../stores/screen'
import { useRouting } from '../../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      panel: 0,
      panelCount: 6,
      routing: useRouting(),
      //why not just in the panel itself?
      words: [
        [
          'By the year 2140,',
          'every planet in our solar',
          'system is overpopulated.',
        ],
        [
          'Still bound to our sun,',
          'we\'ve continued our longing',
          'for the stars.',
        ],
        [
          'That was until today!',
          'The first starships',
          'have arrived.',
        ],
        [
          'Orbiter 8 is an MMO',
          'galaxy-exploring strategy',
          'game for the EVM.',
        ],
        [
          'Introducing Portals!',
          'Starships will soon cross',
          'more than just the galaxy.',
        ],
        [
          'Portals are Bridges',
          'connecting distinct universes',
          'into a multiverse.',
        ],
      ],
      backgroundScale: [
        2,
        1.5,
        4,
        2,
        1.5,
        0.75
      ],
      waitTime: [
        3000,
        7000,
        14000,
        9000,
        8000,
        10000
      ],
      lastScale: 1
    }
  },
  mounted() {
    if (this.screen.isAutoPresent) {
      this.panel = useAutoPlay(this.waitTime)
    }
  },
  watch: {
    panel(newPanel, oldPanel) {
      if (newPanel >= this.panelCount) {
        this.finish()
      } else {
        this.lastScale = this.backgroundScale[oldPanel]
        this.$refs.adjustbackdrop.beginElement()
      }
    }
  },
  methods: {
    finish() {
      this.routing.switch('play')
    },
    close() {
      this.routing.switch('title')
    }

  }
}
</script>

<template>
  <g>
    <g>
      <SpaceBackground  />

      <animateTransform
        ref="adjustbackdrop"
        attributeName="transform"
        attributeType="XML"
        type="scale"
        dur="2s"
        :from="lastScale"
        :to="backgroundScale[panel]"
        calcMode="linear"
        restart="always"
        fill="freeze"
        repeatCount="1"
      />
    </g>

    <AboutPanel01 v-if="panel == 0"  />
    <AboutPanel02 v-if="panel == 1"  />
    <AboutPanel03 v-if="panel == 2"  />
    <AboutPanel04 v-if="panel == 3"  />
    <AboutPanel05 v-if="panel == 4"  />
    <AboutPanel06 v-if="panel == 5"  />

    <panelDialogue :words="words[panel]" />

    <panelNavigation
      :panel-count="panelCount"
      @panel="(p) => panel = p"
      @finish="finish()"
      @close="close()" />
  </g>
</template>

<style scoped>

.smooth {
  transition: 0.25s ease-out;
}
</style>
