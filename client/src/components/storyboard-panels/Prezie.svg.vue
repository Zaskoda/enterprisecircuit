<script setup lang="ts">
import { mapState } from 'pinia'
import panelNavigation from './panelNavigation.svg.vue'
import panelDialogue from './panelDialogue.svg.vue'
import btn from '../ui-primitives/button-basic.svg.vue'

import SpaceBackground from '../sprites/SpaceBackground.svg.vue'

import { useTween } from './composables/tween'
import { useUI } from '../../stores/ui'
import { useRouting } from '../../stores/routing'
import { useClock } from '../../stores/clock'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      clock: useClock(),
      testtween: useTween(-100, 100, 10000, 0, false, true),
      panel: 0,
      panelCount: 2,
      routing: useRouting(),
      //why not just in the panel itself?
      words: [
        [
          'By the year 2140,',
          'every planet in our solar',
          'system is overpopulated.',
        ],
      ],
    }
  },
  watch: {
    panel(newPanel, oldPanel) {
      this.lastScale = this.backgroundScale[oldPanel]
      this.$refs.adjustbackdrop.beginElement()
    },
  },
  computed: {
    ...mapState(useClock, ['gameTime', 'gameTimeInSeconds'])
  },
  methods: {
    pauseClock() {
      this.clock.pause()
    },
    playClock() {
      this.clock.play()
    }
  }
}
</script>

<template>
  <g>
    <g>
      <SpaceBackground  />
      <text font-size="50">{{ testtween }} | {{ gameTimeInSeconds }}</text>
    </g>


    <btn
        font-size="12px"
        fill="#ffffff"
        :width="50"
        :height="20"
        text="Play"
        @click="playClock()"
        transform="translate(0 100)"
        v-if="!clock.isRunning" />
    <btn
        font-size="12px"
        fill="#ffffff"
        :width="50"
        :height="20"
        text="Pause"
        @click="pauseClock()"
        transform="translate(0 100)"
        v-else />


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
