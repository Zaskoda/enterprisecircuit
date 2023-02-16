<script setup lang="ts">
import { useScreen } from '../stores/screen'
import FourShips from './FourShips.vue'
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
    <FourShips />
  </g>
</template>

<style scoped>


</style>
