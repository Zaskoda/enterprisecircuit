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
        <linearGradient id="engineGradientbb"
        gradientTransform="rotate(90)"
        x1="0%" y1="0%" x2="100%" y2="0">
            <stop offset="0%" stop-color="#ccff00" stop-opacity="0.8"/>
            <stop offset="3%" stop-color="#FFFFFF" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <g transform="scale(0.0025)">
      <circle cx="0" cy="0" r="4000" stroke-width="0" fill="#c3b3da00" />
      <g v-if="showEngines">

        <rect
            x="-850"
            y="950"
            width="750"
            height="8000"
            ry="200"
            rx="200"
            stroke-width="0"
            fill="url(#engineGradientbb)" />

        <rect
            x="100"
            y="950"
            width="750"
            height="8000"
            ry="200"
            rx="200"
            stroke-width="0"
            fill="url(#engineGradientbb)" />
      </g>

      <g
          :fill="theme.objects.fill"
          :fill-opacity="theme.objects.fillOpacity"
          :stroke="theme.objects.stroke"
          :stroke-width="theme.objects.strokeWidth / 2"
          :stroke-opacity="theme.objects.strokeOpacity"
        >
        <g transform="scale(2.25) rotate(270) translate(-420,-775)">
          <path class="fil0" d="M1502.44 774.76c0,57.31 -43.29,113.63 -109.15,170.87 -68.9,59.9 -160.54,121.05 -263.36,153.09 -6.06,1.89 -12.08,3.62 -18.08,5.22l0 223.19c0,49.99 -58.71,103.92 -130.32,120.01 -73.89,16.59 -147.74,33.4 -221.57,49.98 -73.78,16.58 -147.67,33.08 -221.5,49.67 -71.6,16.09 -130.24,-21.63 -130.24,-83.79l269.03 -275.49c44.34,-45.4 50.41,-102.88 42.99,-164.6l-158.08 49.11 0 60.32c0,32.36 -41.44,67.27 -91.99,77.68 -52.16,10.74 -104.29,21.62 -156.4,32.36 -52.09,10.73 -104.24,21.41 -156.36,32.15 -50.54,10.42 -91.93,-14 -91.93,-54.24l0 -109.18 -65.48 0 0 -258.68 65.48 0 0 -77.72 0 -77.5 -65.48 0 0 -258.68 65.48 0 0 -109.29c0,-40.24 41.37,-64.52 91.93,-54.15 52.1,10.69 104.27,21.43 156.36,32.15 52.11,10.74 104.24,21.62 156.4,32.36 50.55,10.41 91.99,45.01 91.99,77.37l0 62.73 156.92 55.86c9.12,-65.16 4.72,-126.06 -41.83,-173.68l-269.03 -275.29c-46.47,-47.55 58.61,-99.64 130.24,-83.63 73.8,16.5 147.72,33.09 221.5,49.67 73.83,16.59 147.68,33.39 221.57,49.99 71.61,16.08 130.32,69.53 130.32,119.52l0 223.56c6,1.58 12.02,3.31 18.08,5.2 102.82,32.13 194.47,93.08 263.36,152.91 65.87,57.21 109.15,113.65 109.15,170.96z"/>
        </g>
      </g>
    </g>
  </g>
</g>
</template>

