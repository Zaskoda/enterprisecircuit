<script setup lang="ts">
import { useScreen } from '../../../stores/screen'
import planets from '../../assets/sprites/planets/_planets.svg.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      expansion: 0.25
    }
  },
  methods: {
    expand() {
      this.expansion = 1
    }
  },
  mounted() {
    this.$refs.zoomin.beginElement()
    setTimeout(() => { this.expand() }, 10)
  },
  props: {
  },
  computed: {
  }
}
</script>

<template>
<g>

  <g id="planets">
    <g>
      <planets :expansion="expansion" :showSats="true" />
    </g>

    <animateTransform
      ref="zoomin"
      xlink:href="#planets"
      attributeName="transform"
      attributeType="XML"
      type="scale"
      dur="1.5s"
      values="2.5; 1"
      keyTimes="0; 1"
      calcMode="linear"
      restart="always"
      fill="freeze"
      repeatCount="1"
      additive="sum"
    />

  </g>


</g>
</template>

<style scoped>
</style>
