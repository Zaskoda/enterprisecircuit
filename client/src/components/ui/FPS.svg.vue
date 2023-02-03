<script setup lang="ts">
import { mapState } from 'pinia'
import { useClock } from '../../stores/clock'
import { useScreen } from '../../stores/screen';
</script>

<script lang="ts">
export default {
  data() {
    return {
      clock: useClock(),
      screen: useScreen()
    }
  },
  computed: {
    ...mapState(useClock, ['gameTime', 'gameTimeInSeconds']),
    lines(t:number):any[] {
      const lines = this.clock.frameTimes.map(t =>  {
        const height = Math.max(Math.min( t / 4, 50 ), 1)
        return {
          h: height,
          c: 'rgb(' + Math.round(height*5) + ',' +  Math.round(250-(height * 5)) + ', 50)'
        }
      })
      return lines
    },
  }
}
</script>

<template>
  <g  :transform="'translate(' + (screen.right - 110) + '  ' + (screen.bottom - 40) + ')'">
    <g transform="translate(0 -40)" font-weight="bold" font-size="15px" fill="#ffffff">
      <text>Time: {{ gameTimeInSeconds }} @ {{ clock.fps }} fps</text>
    </g>
    <rect x="-100" y="-25" width="200" height="50" fill="#000000" fill-opacity="0.5" />
    <rect v-for="(l, index) in lines"
      :x="index * 2 - 100.1"
      width="2.2"
      :y="25 - l.h"
      :height="l.h"
      :fill="l.c"
      fill-opacity="1" />
  </g>
</template>

<style scoped>
</style>
