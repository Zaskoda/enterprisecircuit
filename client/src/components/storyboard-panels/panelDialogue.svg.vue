<script setup lang="ts">
  import minerva from '../assets/sprites/minervaBox.svg.vue'

  import { useUI } from '../../stores/ui'
</script>

<script lang="ts">
export default {
  props: {
    words: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      ui: useUI()
    }
  },
}
</script>

<template>
  <g>
    <g :transform="'translate(0 ' + (ui.top + 15) + ')'" v-if="ui.showText"  >
      <g transform="scale(1)">
        <g fill="#000000"
          fill-opacity="0.25"
          stroke="#ffffff"
          stroke-width="0.5"
          stroke-opacity="0.25">
          <rect
            v-if="ui.portrait"
            x="-290"
            y="0"
            width="590"
            height="170"
            rx="20"
            ry="20"
          />
          <rect
            v-else
            x="-390"
            y="0"
            width="790"
            height="115"
            rx="20"
            ry="20"
          />
        </g>

        <g v-if="ui.portrait" transform="translate(-250 45)">
          <minerva transform="translate(0 0) scale(0.5)" />
        </g>
        <g v-else transform="translate(-350 45)">
          <minerva transform="translate(0 0) scale(0.5)" />
        </g>

        <g v-if="ui.portrait" transform="translate(-170 0)" text-anchor="start">
          <text
            font-size="40px"
            transform="translate(0 35)"
          >{{ words[0] }}
          </text>
          <text
            font-size="30px"
            transform="translate(0 85)"
          >{{ words[1] }}
          </text>
          <text
            font-size="30px"
            transform="translate(0 135)"
          >{{ words[2] }}
          </text>
        </g>
        <g v-else transform="translate(-275 0)" text-anchor="start">
          <text
            font-size="35px"
            transform="translate(0 35)"
          >{{ words[0] }}
          </text>
          <text
            font-size="25px"
            transform="translate(0 85)"
          >{{ words[1] }} {{ words[2] }}
          </text>
        </g>
      </g>
    </g>
  </g>
</template>

<style scoped>
</style>
