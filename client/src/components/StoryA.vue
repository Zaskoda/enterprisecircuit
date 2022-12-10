<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import About from './storyboard-panels/About.svg.vue'


</script>

<script lang="ts">
export default {
}
</script>

<template>
  <svgContainer>

    <g>
      <About />
    </g>

  </svgContainer>
</template>

<style scoped>

.smooth {
  transition: 0.25s ease-out;
}
</style>
