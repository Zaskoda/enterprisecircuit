<script setup lang="ts">
import DefaultDefinitions from '../components/definitions/Orbiter8.svg.vue'
import { useScreen } from '../stores/screen'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
    }
  },
  mounted () {
    this.screen.resizeHandler() //set initial ratio
    //TODO: consider throttling these methods
    window.addEventListener('resize', this.screen.resizeHandler)
    window.addEventListener('mousemove', this.screen.mouseMoveHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screen.resizeHandler);
    window.removeEventListener('mousemove', this.screen.mouseMoveHandler)
  },
  methods: {
  },
  computed: {
  }
}
</script>

<template>
  <div id="svgWrapper">
    <svg
      :viewBox="screen.viewBoxSize"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      text-anchor="middle"
      dominant-baseline="central"
      rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      shape-rendering="geometricPrecision"
      fill="#ffffff"
      font-size="48px">

      <default-definitions />
      <slot />


    </svg>
  </div>
</template>


<style scoped lang="scss">
  svg {
    min-width: 100%;
    min-height: 100%;
  }

  div#svgWrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    min-width: 320px;
    min-height: 320px;
  }
</style>
