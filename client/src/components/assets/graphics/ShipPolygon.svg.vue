<script setup lang="ts">
import { useTheme } from '../../../stores/theme'
</script>

<script lang="ts">
export default {
  data() {
    return {
      theme: useTheme(),
    }
  },
  props: {
    size: {
      type: Number,
      default: 1
    },
    showEngines: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
<g>
  <g :transform="'scale(' + size +  ')'">
    <defs v-if="showEngines">
        <linearGradient id="engineGradientpg"
        gradientTransform="rotate(90)"
        x1="0%" y1="0%" x2="100%" y2="0">
            <stop offset="0%" stop-color="#7950DD" stop-opacity="0.8"/>
            <stop offset="3%" stop-color="#ffffff" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <g transform="scale(0.0025)">
      <circle cx="0" cy="0" r="4000" stroke-width="0" fill="#c3b3da00" />
      <g v-if="showEngines">
        <rect
            x="-300"
            y="1150"
            width="600"
            height="10000"
            ry="200"
            rx="200"
            stroke-width="0"
            fill="url(#engineGradientpg)" />

        <rect
            x="-1400"
            y="1000"
            width="500"
            height="6000"
            ry="200"
            rx="200"
            stroke-width="0"
            fill="url(#engineGradientpg)" />

        <rect
            x="900"
            y="1000"
            width="500"
            height="6000"
            ry="200"
            rx="200"
            stroke-width="0"
            fill="url(#engineGradientpg)" />
      </g>

      <g
          :fill="theme.objects.fill"
          :fill-opacity="theme.objects.fillOpacity"
          :stroke="theme.objects.stroke"
          :stroke-width="theme.objects.strokeWidth / 2"
          :stroke-opacity="theme.objects.strokeOpacity"
        >
        <g transform="scale(2) rotate(270) translate(-600,-700)">
          <path d="M1949.56 780.87l-75.97 131.57 -75.96 131.57c-25.77,44.63 -70.01,70.17 -121.54,70.17l-151.92 0 -151.92 0c-51.53,0 -95.77,-25.54 -121.54,-70.17l-75.96 -131.57 -20.73 -35.91 -149.11 0 -133.26 404.52c-24.18,73.42 -63.08,140.34 -140.34,140.34l-479.11 0c-85.16,0 -154.61,-69.45 -154.61,-154.61l0 -22.43c0,-85.16 69.45,-154.61 154.61,-154.61l150.61 0c-16.56,-11.54 -30.68,-26.94 -41.52,-45.73l-75.96 -131.57 -13.48 -23.34 -117.24 0c-85.16,0 -154.61,-69.45 -154.61,-154.61l0 -47.58c0,-85.16 69.45,-154.61 154.61,-154.61l117.24 0 13.47 -23.33 75.96 -131.57c10.84,-18.79 24.97,-34.19 41.52,-45.73l-150.61 0c-85.16,0 -154.61,-69.45 -154.61,-154.61l0 -22.43c0,-85.16 69.45,-154.61 154.61,-154.61l479.11 0c77.3,0 116.16,66.93 140.34,140.34l133.26 404.53 149.11 0 20.73 -35.91 75.96 -131.57c25.77,-44.63 70.01,-70.17 121.54,-70.17l151.92 0 151.92 0c51.53,0 95.77,25.54 121.54,70.17l75.96 131.57 75.97 131.57c25.76,44.62 25.76,95.71 0,140.34z"/>
        </g>
      </g>
    </g>
  </g>
</g>
</template>

