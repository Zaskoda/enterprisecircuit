<script lang="ts">
export default {
  props: {
    size: {
      type: Number,
      default: 1
    },
    classification:  {
      type: Number,
      default: 5
    },
    rings:  {
      type: Number,
      default: 0
    },
    luminanceRotation: {
      type: Number,
      default: 0
    },
    luminanceIntensity: {
      type: Number,
      default: 0.75
    }
  },
  computed: {
    lightLimited() {
      return Math.min(1, Math.max(0, this.luminanceIntensity))
    },
    planetFill() {
      if (this.lightLimited < 0.5) {
        return '#170034'
      }
      return '#ffffff'
    },
    planetStroke() {
      if (this.lightLimited < 0.5) {
        return '#5c1aae'
      }
      return '#ffffff'
    },
    shadowOpacity() {
      if (this.lightLimited < 0.5) {
        return (this.lightLimited * 2)
      }
      return (1 - this.lightLimited) * 2
    }
  }
}
</script>


<template>
<g>
  <g :transform="'scale(' + (size / 16 + 0.5) + ')'">
    <defs>
      <clipPath id="just-the-planet">
        <circle cx="0" cy="0" r="10" />
      </clipPath>
    </defs>

    <circle cx="0" cy="0" r="12" stroke="none" fill="#ffffff00" />

    <g >
      <circle
        cx="0" cy="0" r="10"
        :stroke="planetStroke"
        stroke-width="0.25"
        :fill="planetFill" />
    </g>
    <g :transform="'rotate(' + luminanceRotation + ')'" :opacity="shadowOpacity">
      <circle
        cx="0" cy="0" r="10"
        stroke="#c3b3da"
        stroke-width="0.25"
        fill="url(#planetGradient)" />
    </g>

    <g clip-path="url(#just-the-planet)">

      <g v-if="classification == 0"  stroke-width="0.5" stroke="#ffffff11" fill="#ffffff22" >
      <!-- Earth Like -->
        <rect x="-2" y="-8" width="12" height="2" rx="1" ry="1" />
        <rect x="0" y="-6" width="14" height="2" rx="1" ry="1" />
        <rect x="-2" y="-5" width="7" height="2" rx="1" ry="1" />
        <rect x="-9" y="-7" width="6" height="2" rx="1" ry="1"  />
        <rect x="-10" y="-4" width="10" height="2" rx="1" ry="1"  />
        <rect x="-1" y="-2" width="12" height="2" rx="1" ry="1"  />
        <rect x="-12"  y="1" width="12" height="2" rx="1" ry="1"  />
        <rect x="-10"  y="3" width="14" height="2" rx="1" ry="1"  />
        <rect x="-4"  y="4" width="14" height="2" rx="1" ry="1"  />
        <rect x="0"  y="6" width="6" height="2" rx="1" ry="1"  />
        <rect x="-6"  y="8" width="4" height="2" rx="1" ry="1"  />
        <rect x="-10"  y="9" width="12" height="2" rx="1" ry="1"  />
      </g>
      <g v-if="classification == 1" stroke-width="0.5" stroke="#00000011" fill="#340f6122">
        <circle cx="-5" cy="-5" r="1" />
        <circle cx="-4" cy="8" r="0.75" />
        <circle cx="-8" cy="-5" r="1.5" />
        <circle cx="3" cy="-7" r="0.5" />
        <circle cx="-7" cy="-6" r="1" />
        <circle cx="-3" cy="3" r="1.5" />
        <circle cx="-5" cy="-5" r="0.75" />
        <circle cx="2" cy="-1" r="0.5" />

        <circle cx="2" cy="6" r="1" />
        <circle cx="5" cy="8" r="0.75" />
        <circle cx="9" cy="-2" r="1.5" />
        <circle cx="-1" cy="-7" r="0.5" />
        <circle cx="6" cy="-6" r="1" />
        <circle cx="4" cy="3" r="1.5" />
        <circle cx="5" cy="-5" r="0.75" />
        <circle cx="-2" cy="-1" r="0.5" />
      </g>
      <g v-if="classification == 2">
      </g>
      <g v-if="classification == 3">
      </g>
      <g v-if="classification == 4"  stroke-width="0" stroke="#ffffff11" fill="#ffffff22" >
      <!-- Thin Atmo -->
        <rect x="-2" y="-8" width="12" height="1" rx="1" ry="1" />
        <rect x="-9" y="-7" width="6" height="1" rx="1" ry="1"  />
        <rect x="-10" y="-4" width="10" height="1" rx="1" ry="1"  />
        <rect x="-10"  y="3" width="14" height="1" rx="1" ry="1"  />
        <rect x="0"  y="6" width="6" height="1" rx="1" ry="1"  />
        <rect x="-6"  y="8" width="4" height="1" rx="1" ry="1"  />
      </g>
    <!-- gassy rocky -->
      <g v-if="classification == 5" stroke-width="0.5" stroke="#ffffff11" fill="#00000022">
        <rect x="-10" y="-9" width="17" height="4" rx="2" ry="2" />
        <rect x="4" y="-7" width="10" height="4" rx="2" ry="2" />
        <rect x="-9" y="-6" width="12" height="4" rx="2" ry="2"  />
        <rect x="-2" y="-5" width="12" height="4" rx="2" ry="2" />
        <rect x="-10" y="-3" width="6" height="4" rx="2" ry="2"  />
        <rect x="-1" y="-2" width="12" height="4" rx="2" ry="2"  />
        <rect x="-10"  y="0" width="18" height="4" rx="2" ry="2"  />
        <rect x="-6"  y="1" width="18" height="4" rx="2" ry="2"  />
        <rect x="-12"  y="3" width="12" height="4" rx="2" ry="2"  />
        <rect x="0"  y="5" width="12" height="4" rx="2" ry="2"  />
        <rect x="-6"  y="6" width="10" height="4" rx="2" ry="2"  />
        <rect x="-10"  y="8" width="12" height="4" rx="2" ry="2"  />
      </g>
    <!-- gas giant -->
      <g v-if="classification == 6" stroke-width="0.5" stroke="#5c1aae22" fill="#ffffff22">
        <rect x="-10" y="-9" width="17" height="4" rx="2" ry="2" />
        <rect x="4" y="-7" width="10" height="4" rx="2" ry="2" />
        <rect x="-9" y="-6" width="12" height="4" rx="2" ry="2"  />
        <rect x="-2" y="-5" width="12" height="4" rx="2" ry="2" />
        <rect x="-10" y="-3" width="6" height="4" rx="2" ry="2"  />
        <rect x="-1" y="-2" width="12" height="4" rx="2" ry="2"  />
        <rect x="-10"  y="0" width="18" height="4" rx="2" ry="2"  />
        <rect x="-6"  y="1" width="18" height="4" rx="2" ry="2"  />
        <rect x="-12"  y="3" width="12" height="4" rx="2" ry="2"  />
        <rect x="0"  y="5" width="12" height="4" rx="2" ry="2"  />
        <rect x="-6"  y="6" width="10" height="4" rx="2" ry="2"  />
        <rect x="-10"  y="8" width="12" height="4" rx="2" ry="2"  />
      </g>
    <!-- ferrous -->
      <g v-if="classification == 7" stroke="#c3b3da44" stroke-width="0.15" fill="#340f6122">
        <circle cx="-2.5" cy="2" r="1.5" />
        <circle cx="2" cy="-2.5" r="0.75"  />
        <circle cx="3" cy="2" r="1"  />
        <circle cx="-2.5" cy="-3.5" r="0.5"  />
        <circle cx="-6" cy="-2" r="1"  />
        <circle cx="6" cy="-1" r="1"  />
        <circle cx="-2" cy="-6" r="0.75"  />
        <circle cx="-0.5" cy="6" r="0.5"  />
        <circle cx="7" cy="3" r="3"  />
        <circle cx="10" cy="-4" r="1"  />
        <circle cx="-5" cy="-6" r="2"  />
        <circle cx="-5" cy="6" r="1"  />
      </g>
    <!-- Lava -->
      <g v-if="classification == 8" stroke-width="0" stroke="none" fill="#ffffff44">
        <circle cx="0" cy="0" r="9" />
      </g>
    <!-- Swamp -->
      <g v-if="classification == 9">
      </g>
    </g>

    <g  :transform="'rotate(' + luminanceRotation + ')'">
      <circle
        v-if="rings"
        cy="0"
        :r="20"
        stroke="url(#ringGradient)"
        opacity="0.5"
        :stroke-width="rings"
        fill="none" />
      <circle
        v-for="n in parseInt(rings)"
        :key="n"
        cx="0"
        cy="0"
        :r="20 + (n - (rings/2))"
        stroke="url(#ringGradient)"
        opacity="0.2"
        :stroke-width="0.1 + ((rings/2) - Math.abs(n - (rings/2)))/100"
        fill="none" />
    </g>
  </g>
</g>
</template>

