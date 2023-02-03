<script setup lang="ts">
import { mapState } from 'pinia'
import panelDialogue from './panelDialogue.svg.vue'
import btn from '../ui/widgets/button-basic.svg.vue'
import ship from '../assets/graphics/ShipOrbiter8.svg.vue'

import SpaceBackground from '../assets/sprites/SpaceBackground.svg.vue'

import { useTween } from '../../composables/tween'
import { useScreen } from '../../stores/screen'
import { useRouting } from '../../stores/routing'
import { useClock } from '../../stores/clock'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      clock: useClock(),
      testtween: useTween(1, 10, 1000, 0, false, true),
      panel: 0,
      panelCount: 1,
      routing: useRouting(),
      //why not just in the panel itself?
      words: [
        [
          'Orbiter 8',
          'This is a tween test.',
          '',
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
    },
    alter() {
      this.testtween = useTween(1, 5, 5000, 0, false, true)
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
      <text font-size="20">{{ testtween }}</text>
    </g>

    <g v-for="n in 10" opacity="0.5">
      <g :transform="'translate(' + (n * 100 - 550 + (testtween / 10)) + ' -120) scale(' + ((testtween)) + ') rotate(' + (testtween*-50+n) + ')'">
        <ship />
      </g>
    </g>

    <btn
        font-size="12px"
        fill="#ffffff"
        :width="50"
        :height="20"
        text="Play"
        @click="playClock()"
        transform="translate(-50 100)"
        v-if="!clock.isRunning" />
    <btn
        font-size="12px"
        fill="#ffffff"
        :width="50"
        :height="20"
        text="Pause"
        @click="pauseClock()"
        transform="translate(-50 100)"
        v-else />

    <btn
        font-size="12px"
        fill="#ffffff"
        :width="50"
        :height="20"
        text="Alter"
        @click="alter()"
        transform="translate(0 100)" />


    <btn
        font-size="12px"
        fill="#ffffff"
        :width="50"
        :height="20"
        text="Title"
        @click="close()"
        transform="translate(50 100)" />


    <panelDialogue :words="words[panel]" />

  </g>
</template>

<style scoped>

.smooth {
  transition: 0.25s ease-out;
}
</style>
