<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import logo from './assets/logo.svg.vue'
import web3Containment from './containment/web3Containment.vue'
import { useUI } from '../stores/ui'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
    }
  },
}
</script>

<template>
<svgContainer>
  <web3Containment>

    <g :transform="'translate(0 ' + (ui.top + 80) + ')'">
      <g transform="scale(0.5)">
      <logo />
      </g>
      <line :x1="ui.left + 50" :x2="ui.right-50" y1="60" y2="60" stroke="#ffffff44" stroke-width="4" />
    </g>

  </web3Containment>
</svgContainer>
</template>

<style scoped>
</style>
