<script lang="ts">

interface Star {
  x: number,
  y: number,
  s: number
}

export default {
  props: {
    count: {
      type: Number,
      default: 10
    },
    range: {
      type: Number,
      default: 1000
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      stars: [] as Star[],
    }
  },
  mounted() {
    this.generateStars();
  },
  computed: {
    scaledRange() {
      return this.range * this.scale
    }
  },
  methods: {
    generateStars() {
      for (let n = 0; n <this.count; n++) {
        this.stars[n] = {
          x: Math.random() * this.scaledRange * 2 - this.scaledRange,
          y: Math.random() * this.scaledRange * 2 - this.scaledRange,
          s: Math.random() * this.scale + 4
        }
      }
    }
  }
}
</script>

<template>
<g>
  <circle
    v-for="(star, key) in stars"
    :key="'star-glare-' + key"
    :cx="star.x"
    :cy="star.y"
    :r="star.s"
    stroke-width="0"
    :fill-opacity="1"
    fill="#5a1ca6"  />
</g>

</template>

<style scoped>
</style>
