<script setup lang="ts">
import { useTheme } from '../../../stores/theme'
import ShipBoba from '../geometry/ShipBoba.svg.vue'
import ShipBobaEngine from '../geometry/ShipBobaEngine.svg.vue'
import ShipMoonbeam from '../geometry/ShipMoonbeam.svg.vue'
import ShipMoonbeamEngine from '../geometry/ShipMoonbeamEngine.svg.vue'
import ShipOrbiter8 from '../geometry/ShipOrbiter8.svg.vue'
import ShipOrbiter8Engine from '../geometry/ShipOrbiter8Engine.svg.vue'
import ShipPolygon from '../geometry/ShipPolygon.svg.vue'
import ShipPolygonEngine from '../geometry/ShipPolygonEngine.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      theme: useTheme(),
    }
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 1
    },
    showEngines: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: Number,
      default: 0
    }
  }
}
</script>

<template>
<g>
  <g :transform="'scale(' + size +  ')'">
    <g :transform="'rotate(' + ((rotation + 180) % 360) + ')'">
      <g transform="scale(0.001)">
        <circle cx="0" cy="0" r="4000" stroke-width="0" stroke="#ffffff" fill="#c3b3da00" />

        <g>
          <g v-if="type == 137">
            <ship-polygon />
            <ship-polygon-engine v-if="showEngines" />
          </g>
          <g v-if="type == 288">
            <ship-boba />
            <ship-boba-engine v-if="showEngines" />
          </g>
          <g v-if="type == 1284">
            <ship-moonbeam />
            <ship-moonbeam-engine v-if="showEngines" />
          </g>
          <g v-if="type == 1">
            <ship-orbiter8 />
            <ship-orbiter8-engine v-if="showEngines" />
          </g>
        </g>
      </g>
    </g>
  </g>
</g>
</template>

