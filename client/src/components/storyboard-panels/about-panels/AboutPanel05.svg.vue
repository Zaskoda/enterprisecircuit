<script setup lang="ts">
import portal from '../../assets/portal.svg.vue'
import starfield from '../../assets/starfield.svg.vue'
</script>

<script lang="ts">
export default {
  mounted() {
    this.$refs.starin.beginElement()
    this.$refs.portin.beginElement()
    this.$refs.fadein5.beginElement()
  },
}
</script>

<template>
<g>
  <g>
    <g id="star5">
      <starfield />
    </g>
      <animateTransform
        ref="starin"
        xlink:href="#star5"
        attributeName="transform"
        attributeType="XML"
        type="scale"
        dur="5s"
        values="2; 1.01; 0.99; 1.01; 1"
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        calcMode="linear"
        restart="always"
        fill="freeze"
        repeatCount="1"
      />

    <g transform="scale(5)" id="port5" >
      <portal />
    </g>
      <animateTransform
        ref="portin"
        xlink:href="#port5"
        attributeName="transform"
        attributeType="XML"
        type="scale"
        dur="5s"
        values="2; 4.9; 5; 4.9; 5"
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        calcMode="linear"
        restart="always"
        fill="freeze"
        repeatCount="1"
      />

  <animate
    ref="fadein5"
    attributeType="CSS"
    attributeName="opacity"
    dur="2s"
    values="0; 1"
    keyTimes="0; 1"
    repeatCount="1"
    restart="always"
    calcMode="linear"
    fill="freeze" />

  </g>
</g>
</template>

<style scoped>
</style>
