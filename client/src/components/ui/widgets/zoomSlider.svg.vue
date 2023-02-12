<script setup lang="ts">

import { useWorld } from '../../../stores/world'
</script>

<script lang="ts">
export default {
  name: 'ZoomSlider',
  data () {
    return {
      world: useWorld(),
      width: 420
    }
  },
  computed: {
    zoomLine():number {
      console.log('Log of ' + this.world.getZoomLevel + ' is ' + Math.log(this.world.getZoomLevel + 0.005))
      console.log('Log of ' + this.world.getZoomLevel + ' is ' + Math.log(this.world.getZoomLevel + 0.005))
      return Math.min(
        this.width / 2,
        Math.max(
          this.width / -2,
          (Math.log(this.world.getZoomLevel + 0.005) * this.width / 10)
        )
      )
    }
  }
}
</script>

<template>
  <g>
    <line
      stroke="#000000"
      stroke-opacity="0.5"
      stroke-width="10"
      :x1="width / -2"
      y1="0"
      :x2="width / 2"
      y2="0"
      stroke-dasharray="12 4" />
    <line
      stroke="#c3b3da66"
      stroke-width="6"
      :x1="width / -2"
      y1="0"
      :x2="width / 2"
      y2="0"
      stroke-dasharray="10 6" />

    <line
      stroke-linecap="round"
      stroke="#000000aa"
      :x1="zoomLine"
      y1="-20"
      :x2="zoomLine"
      stroke-width="10"
      y2="20" ></line>
    <line
      stroke-linecap="round"
      stroke="#c3b3daaa"
      :x1="zoomLine"
      y1="-20"
      :x2="zoomLine"
      stroke-width="8"
      y2="20" ></line>
    <g :transform="'translate(' + (width / -2) + ' 0 )'">
      <circle cx="-20" cy="0" r="25" stroke="#00000088" fill="#c3b3daee"></circle>
      <text
        x="-20" y="0"
        font-size="48px"
        fill="#000000"
        dominant-baseline="middle">&minus;</text>
      <circle @click="world.zoomOut(5)" cx="-20" cy="0" r="30" stroke-width="0" fill-opacity="0" class="canclick" />
    </g>
    <g :transform="'translate(' + (width / 2) + ' 0 )'">
      <circle cx="20" cy="0" r="25" stroke="#00000088" fill="#c3b3daee"></circle>
      <text
        x="20" y="0"
        font-size="48px"
        fill="#000000"
        dominant-baseline="middle">&plus;</text>
      <circle @click="world.zoomIn(5)" cx="20" cy="0" r="30" stroke-width="0"  fill-opacity="0" class="canclick" />
    </g>



  </g>
</template>

