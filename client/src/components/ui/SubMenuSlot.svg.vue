<script setup lang="ts">
import { useScreen } from '../../stores/screen'
</script>

<script lang="ts">
export default {
  emits: ['close'],
  props: {
    highlight: {
      type: Boolean,
      default: false
    },
    slot: {
      type: Number,
      default: 0
    },
    maxSlots: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      hover: false,
      screen: useScreen(),
    }
  },
  computed: {
    slotBackground() {
      if (this.hover) {
        return '#00000066'
      }
      return '#00000044'
    },
    slotBorder() {
      if (this.highlight) {
        return '#ffffff88'
      }
      else if (this.hover) {
        return '#ffffff66'
      }
      return '#ffffff22'
    },
    width():number {
      return Math.min(this.screen.width, 900)
    },
    height():number {
      return this.screen.height / (this.maxSlots + 2)
    },
    padding():number {
      return this.height / this.maxSlots
    },
    top() {
      return this.screen.top + ((this.slot * (this.height + this.padding)) + 60 )
    }
  },
}
</script>

<template>
   <g>
    <g :transform="'translate(' + (width / -2) + ' ' + top + ')'" @mouseover="hover = true" @mouseleave="hover = false" class="canclick" >
      <defs>
        <clipPath id="menu-slot-clip">
          <rect x="5" y="5" :width="width" rx="10" ry="10" :height="height" />
        </clipPath>
      </defs>

      <rect x="5" y="5" :width="width" rx="10" ry="10" :height="height" :fill="slotBackground" stroke-width="1" :stroke="slotBorder" />

      <g  clip-path="url(#menu-slot-clip)">
        <g  :transform="'translate(' + width/2 + ' ' + height / 2 + ')'">
          <slot />
        </g>
      </g>
    </g>
  </g>
</template>

<style scoped>
</style>