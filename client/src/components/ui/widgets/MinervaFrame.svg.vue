<script setup lang="ts">
import MinervaScreen from '../../assets/sprites/MinervaScreen.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
  }
}
</script>

<template>
  <g>
    <g>
      <rect
        x="-360" y="-400"
        width="840"
        height="680"
        rx="10"
        ry="10"
        fill="#280b4b"
        fill-opacity="1"
        stroke="#ffffff"
        stroke-width="1"
        stroke-opacity="0.25"
      />
    </g>
    <text transform="translate(-250 -350)"
      text-anchor="start"
      fill="#aaaaaa"
      font-size="48">{{ title }}</text>
    <g transform="translate(-375 -220)">
      <MinervaScreen />
      <text></text>
    </g>
  </g>

</template>

<style scoped>
</style>
