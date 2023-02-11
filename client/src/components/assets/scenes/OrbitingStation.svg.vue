<script setup lang="ts">
import SpaceStation from '../sprites/SpaceStation.svg.vue'
import PlayerShip from '../sprites/PlayerShip.svg.vue'

</script>

<script lang="ts">
export default {
}
</script>

<template>
<g>
  <g>
    <g>
      <g transform="translate(140 0) scale(1)" opacity="1">
        <g>
          <SpaceStation :size="30" />

          <g transform="translate(20 0) scale(1)">
            <PlayerShip :type="137" />
          </g>
          <g transform="translate(-20 0) scale(1) rotate(180)">
            <PlayerShip :type="288" />
          </g>
          <g transform="translate(0 20) scale(1) rotate(90)">
            <PlayerShip :type="1284" />
          </g>
          <g transform="translate(0 -20) scale(1) rotate(270)">
            <PlayerShip :type="1" />
          </g>

          <g transform="translate(20 0)">
            <g>
              <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="0; 360"
                dur="10s"
                repeatCount="indefinite"
              />
            </g>
            <g>
              <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="360; 0"
                dur="14s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          <g transform="translate(-20 0)">
            <g>
              <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="0; 360"
                dur="14s"
                repeatCount="indefinite"
              />
            </g>
            <g>
              <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="360; 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </g>
          </g>


          <g transform="translate(0 20)">
            <g>
              <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="0; 360"
                dur="10s"
                repeatCount="indefinite"
              />
            </g>
            <g>
              <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="360; 0"
                dur="14s"
                repeatCount="indefinite"
              />
            </g>
          </g>


          <g transform="translate(0 -20)">
            <g>
              <circle r="8" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 30" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="0; 360"
                dur="14s"
                repeatCount="indefinite"
              />
            </g>
            <g>
              <circle r="10" stroke="#ffffff" stroke-opacity="0.75" stroke-width="1" fill="none" stroke-dasharray="1 20" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="360; 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </g>
          </g>

          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0; 360"
            dur="30s"
            repeatCount="indefinite"
          />
        </g>
      </g>
    </g>

    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      values="360; 0"
      dur="360s"
      repeatCount="indefinite"
    />
  </g>
</g>

</template>

<style scoped>
</style>
