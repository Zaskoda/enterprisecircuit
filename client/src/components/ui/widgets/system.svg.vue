<script setup lang="ts">
import { useGalaxy } from '../../../stores/galaxy'
</script>

<script lang="ts">
export default {
  data() {
    return {
      galaxy: useGalaxy(),
    }
  },
  props: {
  },
}
</script>

<template>

<g>
  <text
        x="0" y="-10"
        font-size="16px"
        fill="#00000000"
        stroke="#000000aa"
        stroke-width="6"
        text-anchor="end"
        alignment-baseline="central">Star System {{ galaxy.chainstate.systemData.id }}</text>
  <text
        x="0" y="-10"
        font-size="16px"
        fill="#ffffffaa"
        text-anchor="end"
        stroke="#ffffff99"
        stroke-width="0.25"
        alignment-baseline="central">Star System {{ galaxy.chainstate.systemData.id }}</text>
  <text
        x="0" y="20"
        font-size="32px"
        fill="#00000000"
        stroke="#000000aa"
        stroke-width="6"
        text-anchor="end"
        alignment-baseline="central">{{ galaxy.chainstate.systemData.name }}</text>
  <text
        x="0" y="20"
        font-size="32px"
        fill="#ffffffaa"
        stroke="#ffffff88"
        stroke-width="1"
        text-anchor="end"
        alignment-baseline="central">{{ galaxy.chainstate.systemData.name }}</text>
</g>
</template>


