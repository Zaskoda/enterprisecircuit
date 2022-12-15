<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import Prezie from './storyboard-panels/Prezie.svg.vue'


</script>

<script lang="ts">
export default {
}
</script>

<template>
  <svgContainer>

    <g>
      <Prezie />
    </g>

  </svgContainer>
</template>

<style scoped>

.smooth {
  transition: 0.25s ease-out;
}
</style>
