<script setup lang="ts">


import { useRouting } from '../../stores/routing'
import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'
import { useWorld } from '../../stores/world'

</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      screen: useScreen(),
      world: useWorld(),
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>

  <g :transform="'translate(' + (screen.left + 120) + ' ' + (screen.top + 20)  + ')'">
    <text>Ship</text>
  </g>

</template>

<style scoped>
</style>
