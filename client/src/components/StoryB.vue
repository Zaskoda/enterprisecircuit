<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import TweenDemo from './storyboard-panels/TweenDemo.svg.vue'


</script>

<script lang="ts">
export default {
}
</script>

<template>
  <svgContainer>

    <g>
      <TweenDemo />
    </g>

  </svgContainer>
</template>

<style scoped>

.smooth {
  transition: 0.25s ease-out;
}
</style>
