<script setup lang="ts">
import { useScreen } from '../../stores/screen'
import { useWorld } from '../../stores/world'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      world: useWorld(),
    }
  },
}
</script>

<template>
  <g font-size="20px">
    <rect
      :x="screen.left" :y="screen.top"
      :height="screen.height" :width="screen.width"
      fill="none" stroke="#ff00ff" stroke-width="20" />

      <rect
        :x="screen.protectedBoxX"
        :y="screen.protectedBoxY"
        :width="screen.protectedBoxWidth"
        :height="screen.protectedBoxHeight"
        fill="none"
        stroke="#ff00ff"
        stroke-width="1.5"
        stroke-dasharray="2 1"
        stroke-opacity="0.75" />


    <circle :cx="screen.mouseX" :cy="screen.mouseY" :r="5" fill="none" stroke="#ff0000" stroke-size="#ff0000" />
    <g :transform="'translate(' + (screen.left + 160) + '  ' + (screen.bottom - 160) + ')'">
      <text transform="translate(0 00)" fill="#ffffff">Top {{ screen.top }} Bottom {{ screen.bottom }}</text>
      <text transform="translate(0 20)" fill="#ffffff">Left {{ screen.left }} Right {{ screen.right }}</text>
      <text transform="translate(0 40)" fill="#ffffff">UI Scale {{ screen.UIScale }} Rez {{ screen.width }} x  {{ screen.height }}</text>
      <text transform="translate(0 60)" fill="#ffffff">Orientation: <tspan v-if="screen.portrait">Portrait</tspan><tspan v-else-if="screen.landscape">Landscape</tspan><tspan v-else>Error</tspan></text>
      <text transform="translate(0 80)" fill="#ffffff">MX: {{ screen.mouseX.toFixed(3) }} MY: {{ screen.mouseY.toFixed(3) }}</text>
      <text transform="translate(0 100)" fill="#ffffff">Zoom: {{ world.zoomLevel.toFixed(3) }}</text>
      <text transform="translate(0 120)" fill="#ffffff">WX: {{ world.viewPoint.x.toFixed(3) }} WY: {{ world.viewPoint.y.toFixed(3) }}</text>
    </g>
  </g>

</template>

<style scoped>
</style>
