<script setup lang="ts">
import { useWorld } from '../../stores/world'
</script>

<script lang="ts">

export default {
  data() {
    return {
      world: useWorld(),
    }
  },

}
</script>

<template>
    <g>
      <radialGradient id="glowGradient">
        <stop offset="0%" stop-color="#5c1aae"  stop-opacity="0.3"/>
        <stop offset="40%" stop-color="#4c2777"  stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#310e5c"  stop-opacity="0.0"/>
      </radialGradient>

      <circle
        cx="0"
        cy="0"
        r="2800"
        stroke="#310e5c"
        stroke-width="0"
        fill="url(#glowGradient)" />

      <circle
        cx="0"
        cy="0"
        r="8000"
        stroke="#ffffff"
        stroke-width="4"
        fill="transparent" />

      <g stroke="#c3b3da" stroke-opacity="0.5" :stroke-width="0.05 / world.getZoomLevel + 0.1">
        <g >
          <line x1="-4000" y1="0" x2="4000" y2="0"></line>
          <line x1="0" y1="-4000" x2="0" y2="4000"></line>
          <line x1="-2100" y1="-2100" x2="2100" y2="2100"></line>
          <line x1="-2100" y1="2100" x2="2100" y2="-2100"></line>
        </g>
        <g >
          <line x1="-2100" y1="-1000" x2="2100" y2="1000"></line>
          <line x1="-2100" y1="1000" x2="2100" y2="-1000"></line>
          <line x1="-1000" y1="-2100" x2="1000" y2="2100"></line>
          <line x1="-1000" y1="2100" x2="1000" y2="-2100"></line>
        </g>
      </g>

      <g stroke="#c3b3da" stroke-width="0.1">
        <line x1="-50" y1="-500" x2="50" y2="-500"></line>
        <line x1="-50" y1="-400" x2="50" y2="-400"></line>
        <line x1="-50" y1="-300" x2="50" y2="-300"></line>
        <line x1="-50" y1="-200" x2="50" y2="-200"></line>
        <line x1="-50" y1="-100" x2="50" y2="-100"></line>
        <line x1="-50" y1="100" x2="50" y2="100"></line>
        <line x1="-50" y1="200" x2="50" y2="200"></line>
        <line x1="-50" y1="300" x2="50" y2="300"></line>
        <line x1="-50" y1="400" x2="50" y2="400"></line>
        <line x1="-50" y1="500" x2="50" y2="500"></line>

        <line x1="-500" y1="-50" x2="-500" y2="50"></line>
        <line x1="-400" y1="-50" x2="-400" y2="50"></line>
        <line x1="-300" y1="-50" x2="-300" y2="50"></line>
        <line x1="-200" y1="-50" x2="-200" y2="50"></line>
        <line x1="-100" y1="-50" x2="-100" y2="50"></line>
        <line x1="100" y1="-50" x2="100" y2="50"></line>
        <line x1="200" y1="-50" x2="200" y2="50"></line>
        <line x1="300" y1="-50" x2="300" y2="50"></line>
        <line x1="400" y1="-50" x2="400" y2="50"></line>
        <line x1="500" y1="-50" x2="500" y2="50"></line>
      </g>
      <g stroke="#c3b3da" stroke-width="0.05">
        <line v-for="n in 100" :key="'line-a-' + n" :x1="-10500" :y1="n*100" :x2="10500" :y2="n*100"></line>
        <line v-for="n in 100" :key="'line-b-' + n" :x1="-10500" :y1="n*-100" :x2="10500" :y2="n*-100"></line>
        <line v-for="n in 100" :key="'line-c-' + n" :y1="-10500" :x1="n*100" :y2="10500" :x2="n*100"></line>
        <line v-for="n in 100" :key="'line-d-' + n" :y1="-10500" :x1="n*-100" :y2="10500" :x2="n*-100"></line>
      </g>
      <g stroke="#c3b3da" stroke-width="0.01">
        <line v-for="n in 1000" :key="'line-e-' + n" :x1="-10500" :y1="n*10" :x2="10500" :y2="n*10"></line>
        <line v-for="n in 1000" :key="'line-f-' + n" :x1="-10500" :y1="n*-10" :x2="10500" :y2="n*-10"></line>
        <line v-for="n in 1000" :key="'line-g-' + n" :y1="-10500" :x1="n*10" :y2="10500" :x2="n*10"></line>
        <line v-for="n in 1000" :key="'line-h-' + n" :y1="-10500" :x1="n*-10" :y2="10500" :x2="n*-10"></line>
      </g>
`    </g>
</template>
