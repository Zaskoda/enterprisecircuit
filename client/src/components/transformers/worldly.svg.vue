<script setup lang="ts">
import { useWorld } from '../../stores/world'
</script>

<script lang="ts">
export default {
  props: {
    depth: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      world: useWorld(),
      maxDepth: 10,
      minDepth: 1
    }
  },
  methods: {
    translateAdjust(val:number) {
      return (val / Math.pow(this.restrainedDepth, 3))
    },
  },
  computed: {
    restrainedDepth() {
      return Math.max(Math.min(this.depth, this.maxDepth), this.minDepth)
    },
    viewPoint() {
      return this.translateAdjust(this.world.getViewPoint.x)
        + ' '
        + this.translateAdjust(this.world.getViewPoint.y)
    },
    lockedPercentage() {
      return (this.restrainedDepth - 1) / (this.maxDepth)
    },
    scale() {
      return this.lockedPercentage + (this.world.getZoomLevel / this.restrainedDepth) * (1 - this.lockedPercentage)
    }

  }
}
</script>

<template>
  <g :transform="'scale(' + scale +  ')'">
    <g :transform="'translate(' + viewPoint + ')'">
      <slot />
    </g>
  </g>
</template>

<style scoped>
</style>
