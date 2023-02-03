<script setup lang="ts">
import EVMStatus from './EVMStatus.svg.vue'

import btn from './button-basic.svg.vue'

import { useRouting } from '../../stores/routing'
import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'

</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      screen: useScreen(),
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>
  <EVMStatus />

  <g  font-size="42px" :transform="'translate(0 ' + (screen.bottom - 20) + ')'">
    <g :transform="'scale(' + ui.UIScale + ')'">
      <btn
        :width="200" :height="60"
        text="Close"
        @click="routing.switch('title')"
        transform="translate(0 -80)" />
    </g>
  </g>

</template>

<style scoped>
</style>
