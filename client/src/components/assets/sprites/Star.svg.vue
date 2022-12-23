<script lang="ts">
export default {
  props: {
    size: {
      type: Number,
      default: 1
    }
  }
}
</script>

<template>
<g>
  <g :transform="'scale(' + (size * 2 + 0.5) + ')'">

    <circle cx="0" cy="0" r="24" stroke-width="0" fill="url(#glowingGradient)"  pointer-events="none"/>
    <circle cx="0" cy="0" r="13" stroke="#ffffff" stroke-width="0.15" fill="url(#starGradient)" />
    <circle cx="0" cy="0" r="14" stroke="#ffffff" stroke-width="0" fill="#ffffff00" />
  </g>
</g>
</template>
