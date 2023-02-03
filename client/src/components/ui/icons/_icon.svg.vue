<script setup lang="ts">
</script>

<script lang="ts">
export default {
  data () {
    return {
      hover: false
    }
  },
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    counter: {
      type: Number,
      default: 0
    }
  },
  computed: {
    fillColor: function() {
      if (this.hover || this.selected) {
        return "#140828"
      } else {
        return "#230b41"
      }
    },
    scaleSize: function() {
      if (this.hover || this.selected) {
        return 1.35
      } else {
        return 1.2
      }
    }
  }
}
</script>

<template>
  <g @mouseover="hover = true" @mouseleave="hover = false">
    <defs>
      <clipPath id="icon-clip">
        <circle
          cx="0"
          cy="0"
          r="36"
          stroke-width="1" />
      </clipPath>
    </defs>

    <g  clip-path="url(#icon-clip)">
      <circle
        cx="0"
        cy="0"
        r="36"
        stroke="#ffffff22"
        stroke-width="1"
        :fill="fillColor" />
      <g :transform="'scale(' + scaleSize + ')'">
        <slot />
      </g>
    </g>
    <circle
      class="canclick"
      cx="0"
      cy="0"
      r="46"
      stroke-width="0"
      fill-opacity="0"
      fill="#000000" />
    <g v-if="counter > 0" font-size="14px" font-weight="bold" transform="translate(25 25)">
      <circle cx=0 cy=0 fill="#230b41" stroke="#ffffff88" stroke-width="0.75" r="12" />
      <text text-anchor="middle" dominant-baseline="middle" fill="#ffffffaa">{{ counter }}</text>
    </g>
  </g>
</template>


