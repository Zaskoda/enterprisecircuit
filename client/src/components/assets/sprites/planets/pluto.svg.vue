<script setup lang="ts">
import orbit from '../../animations/_orbit.svg.vue'
import planet from '../../graphics/Planet.svg.vue'
import moon from '../../graphics/Moon.svg.vue'
import station from '../../graphics/Station.svg.vue'
import shipO8 from '../../graphics/ShipOrbiter8.svg.vue'
</script>


<script lang="ts">
export default {
  props: {
    showMoons: {
        type: Boolean,
        default: true
    },
    showStation: {
        type: Boolean,
        default: true
    },
    rotationPeriod: {
      type: Number,
      default: 50
    }
  }
}
</script>


<template>
  <g id="earth-glump">
    <g>
      <planet
        :classification="1"
        :size="1"
        :rotationPeriod="rotationPeriod"
      />
    </g>
    <g v-if="showMoons">
      <orbit :duration="40" :distance="40">
        <moon
          :size="1"
        />
      </orbit>
    </g>
    <g v-if="showStation">
      <orbit :duration="60" :distance="20">
        <station
          :size="1"
        />
      </orbit>
    </g>
  </g>
</template>

