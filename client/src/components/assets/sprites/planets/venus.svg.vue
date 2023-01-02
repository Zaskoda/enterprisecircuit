<script setup lang="ts">
import orbit from '../../animations/_orbit.svg.vue'
import planet from '../../graphics/Planet.svg.vue'
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
        :classification="5"
        :size="9.5"
        :rotationPeriod="rotationPeriod"
      />
    </g>
    <g v-if="showMoons">
    </g>
    <g v-if="showStation">
      <orbit :duration="40" :distance="30">
        <station
          :size="1"
        />
        <orbit :duration="20" :distance="12">
          <shipO8
            transform="rotate(180)"
            :size="0.75"
          />
        </orbit>
      </orbit>
    </g>
  </g>
</template>

