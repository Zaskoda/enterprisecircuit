<script setup lang="ts">
import { useTheme } from '../../stores/theme'
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
        <linearGradient id="engineGradientmb"
        gradientTransform="rotate(90)"
        x1="0%" y1="0%" x2="100%" y2="0">
            <stop offset="0%" stop-color="#E1177C" stop-opacity="0.8"/>
            <stop offset="3%" stop-color="#FFFFFF" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <g transform="scale(0.0025)">
      <circle cx="0" cy="0" r="4000" stroke-width="0" fill="#c3b3da00" />
      <g v-if="showEngines">



        <rect
            x="-700"
            y="950"
            width="550"
            height="12000"
            ry="200"
            rx="200"
            stroke-width="0"
            fill="url(#engineGradientmb)" />

        <rect
            x="150"
            y="950"
            width="550"
            height="12000"
            ry="200"
            rx="200"
            stroke-width="0"
            fill="url(#engineGradientmb)" />
      </g>

        <g
          :fill="theme.objects.fill"
          :fill-opacity="theme.objects.fillOpacity"
          :stroke="theme.objects.stroke"
          :stroke-width="theme.objects.strokeWidth / 2"
          :stroke-opacity="theme.objects.strokeOpacity"
        >
        <g transform="scale(2) rotate(270) translate(-480,-640)">
          <path d="M1779.1 749.31l-93.66 93.66c-21.06,21.06 -46.7,31.68 -76.48,31.68l-409.51 0c-29.79,0 -55.42,-10.62 -76.48,-31.68l-96.15 -96.14 -227.93 0c33.98,194.67 156.88,358.76 325.31,448.9 -88.87,47.57 -190.4,74.56 -298.25,74.56 -231.78,0 -434.44,-124.58 -544.72,-310.42l-277 0 0 -219.13 197.16 0c-5.54,-33.68 -8.47,-68.23 -8.47,-103.47 0,-35.25 2.92,-69.81 8.47,-103.48l-197.15 0 -0.01 -219.13 277 0c110.3,-185.84 312.94,-310.42 544.72,-310.43 107.84,0 209.38,27 298.25,74.57 -168.44,90.14 -291.34,254.23 -325.32,448.91l227.93 0 96.14 -96.15c21.07,-21.06 46.7,-31.68 76.49,-31.68l409.51 0c29.79,-0 55.43,10.62 76.49,31.68l93.65 93.66c61.71,61.71 61.72,162.38 0,224.09z"/>
        </g>
      </g>
    </g>
  </g>
</g>
</template>

