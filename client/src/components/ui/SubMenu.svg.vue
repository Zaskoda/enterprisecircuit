<script setup lang="ts">
import { useScreen } from '../../stores/screen'
import btn from './widgets/button-basic.svg.vue'
</script>

<script lang="ts">
export default {
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      screen: useScreen(),
      padding: 25,
      maxWidth: 1000
    }
  },
  computed: {
    menuLeft():number {
      let shift = 0
      if (this.screen.width > this.maxWidth) {
        shift = (this.screen.width - this.maxWidth) / 2
      }
      return this.screen.left + this.padding / 2 + shift
    },
    menuTop():number {
      return this.screen.top + this.padding
    },
    menuWidth():number {
      return Math.min(this.maxWidth, this.screen.width) - (this.padding)
    },
    menuHeight():number {
      return this.screen.height
    }
  },
}
</script>

<template>
  <g v-if="show">
    <rect
      :x="screen.left"
      :y="screen.top"
      :width="screen.width"
      :height="screen.height"
      v-on:click.prevent="$emit('close')"
      fill-opacity="0.5"
      fill="#000000" />
  </g>
  <g :class="[show ? 'slidein' : 'slideout', 'slide']">
    <g>
      <g>
        <linearGradient id="menuGradient"
        x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5c1aae" stop-opacity="0.9"/>
          <stop offset="10%" stop-color="#280b4b" stop-opacity="1"/>
          <stop offset="50%" stop-color="#5c1aae" stop-opacity="1"/>
          <stop offset="90%" stop-color="#280b4b" stop-opacity="1"/>
          <stop offset="100%" stop-color="#5c1aae" stop-opacity="0.9"/>
        </linearGradient>


        <rect
        :x="menuLeft"
        :y="menuTop"
        :width="menuWidth"
        :height="menuHeight"
        fill="url(#menuGradient)"
        stroke-width="4"
        stroke="#00000022"
        rx="10" ry="10" />

      <rect
        :x="menuLeft + padding / 2"
        :y="menuTop + padding / 2"
        :width="menuWidth - padding"
        :height="menuHeight - padding"
        fill="#280b4baa"
        stroke="#ffffff22"
        stroke-width="4"
        rx="5" ry="5" />
      </g>

      <slot />

      <g :transform="'translate(' + 0 + ' ' + (screen.bottom - 60)  + ') scale(0.75)'">
        <btn
          font-size="42px"
          fill="#ffffff"
          :width="500"
          :height="68"
          text="Close"
          @click="$emit('close')"
        />
      </g>
    </g>
  </g>
</template>

<style scoped>
  .slide {
    transition: transform 0.5s;
  }
  .slidein {
    transform: translate(0px, 0px);
  }
  .slideout {
    transform: translate(0px, 3000px);
  }
</style>