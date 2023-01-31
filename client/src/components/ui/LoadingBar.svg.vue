<script lang="ts">
  export default {
    props: {

      statusMessage: {
        type: String,
        default: ''
      },
      percent: {
        type: Number,
        default: 10,
      }
    },
  }
  </script>

<template>
  <g>
      <defs>
      <linearGradient id="barGradient"
        x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(0)">
          <stop offset="0%" stop-color="#5c1aae" stop-opacity="1"/>
          <stop offset="10%" stop-color="#c3b3da" stop-opacity="1"/>
          <stop offset="15%" stop-color="#ffffff" stop-opacity="1"/>
          <stop offset="20%" stop-color="#c3b3da" stop-opacity="1"/>
          <stop offset="25%" stop-color="#5c1aae" stop-opacity="1"/>
          <stop offset="50%" stop-color="#5c1aae" stop-opacity="1"/>
          <stop offset="100%" stop-color="#280b4b" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect x="-302" y="-18" width="604" height="32" fill="#ff88ff" fill-opacity="0.75" stroke="#5c1aae88" stroke-width="3" rx="20" ry="20" />
      <rect x="-300" y="-15" :width="600 * (percent/100)" height="28" stroke="#5c1aae" stroke-width="2" rx="20" ry="20" class="loadingbar" fill="url(#barGradient)"/>
      <g fill="#ffffff88" font-size="28px" transform="translate(0 40)">
      <text text-anchor="start" transform="translate(-300 0)">{{ statusMessage }}</text>
      <text text-anchor="end" transform="translate(300 0)">{{ percent }}%</text>
      </g>
  </g>
</template>


<style scoped lang="scss">
  .loadingbar {
    transition: width 2s;
  }
</style>
