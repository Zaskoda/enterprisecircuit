<script setup lang="ts">
import { useScreen } from '../stores/screen'
import backdrop from './assets/sprites/SpaceBackground.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
    }
  },
  watch: {
  },
  async mounted () {
  },
  beforeDestroy() {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<template>
  <g transform="translate(0 0)">
    <backdrop />
    <rect
      :x="screen.left" :y="screen.top"
      :width="screen.width" :height="screen.height"
      fill="#000000"
      fill-opacity="0.5" />
  </g>
</template>

<style scoped>


</style>
