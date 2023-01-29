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
    <g opacity="0.25">
      <g>
        <g v-for="n in 9">
          <ellipse :transform="'rotate(' + n * 40 + ')'" cx="0" cy="0" rx="48" ry="4" stroke-width="0" fill="url(#glowingGradient)"  pointer-events="none"/>
          <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="scale" dur="40s"
                :values="'1; ' + (n % 4 / 6) + ';1'"
                repeatCount="indefinite"
              />
        </g>
        <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate" dur="720s"
              values="360; 0"
              repeatCount="indefinite"
            />
      </g>
      <g>
        <g v-for="n in 9">
          <ellipse :transform="'rotate(' + n * 40 + ')'" cx="0" cy="0" rx="48" ry="4" stroke-width="0" fill="url(#glowingGradient)"  pointer-events="none"/>          <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="scale" dur="40s"
                :values="(n % 4 / 6) + ';1;' + (n % 4 / 6)"
                repeatCount="indefinite"
              />
        </g>
        <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate" dur="720s"
              values="0; 360"
              repeatCount="indefinite"
            />
      </g>
    </g>
    <circle cx="0" cy="0" r="32" stroke-width="0" fill="url(#glowingGradient)"  pointer-events="none"/>
    <circle cx="0" cy="0" r="13" stroke="#ffffff" stroke-width="0.15" fill="url(#starGradient)" />
    <circle cx="0" cy="0" r="14" stroke="#ffffff" stroke-width="0" fill="#ffffff00" />
  </g>
</g>
</template>
