<script setup lang="ts">
import { useAvatar } from '../../../stores/avatar'
import { useGalaxy } from '../../../stores/galaxy'
</script>

<script lang="ts">
export default {
  data() {
    return {
      avatar: useAvatar(),
      galaxy: useGalaxy(),
    }
  },
  props: {
  },
}
</script>

<template>
  <defs>
    <linearGradient id="profileGradient"
      x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(0)">
        <stop offset="0%" stop-color="#7c39cd" stop-opacity="1"/>
        <stop offset="20%" stop-color="#280b4b" stop-opacity="1"/>
        <stop offset="50%" stop-color="#5c1aae" stop-opacity="1"/>
        <stop offset="80%" stop-color="#280b4b" stop-opacity="1"/>
        <stop offset="100%" stop-color="#7c39cd" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <g font-size="14px" fill="#ffffff88" transform="translate(0 40)">
    <rect x="0" y="-40" width="240" height="120" fill="url(#profileGradient)" stroke="#ffffff22" rx="10" ry="10" stroke-width="1" />
    <rect x="4" y="-36" width="232" height="112" fill="#00000088" stroke="#000000" rx="8" ry="8" stroke-width="1" />
    <text text-anchor="start" transform="translate(40 -20)" fill="#ffffff" font-size="18px">{{ avatar.chainstate.myAvatarName }} </text>
    <text text-anchor="end" transform="translate(80 2)">Starship:</text>
    <text text-anchor="start" transform="translate(85 2)"  fill="#ffffff">{{ galaxy.chainstate.ship.name }}</text>
    <text text-anchor="end" transform="translate(80 20)">Credits:</text>
    <text text-anchor="start" transform="translate(85 20)" fill="#ffffff" > -- &cent;</text>

    <g font-size="12px">
      <text text-anchor="end" transform="translate(50 42)" fill="#ffffff">{{ galaxy.chainstate.ship.equipment }}</text>
      <text text-anchor="end" transform="translate(150 42)" fill="#ffffff">{{ galaxy.chainstate.ship.fuel }}</text>
      <text text-anchor="end" transform="translate(50 60)" fill="#ffffff">{{ galaxy.chainstate.ship.organics }}</text>
      <text text-anchor="end" transform="translate(150 60)" fill="#ffffff">{{ galaxy.chainstate.ship.cargoLimit - (galaxy.chainstate.ship.equipment + galaxy.chainstate.ship.fuel + galaxy.chainstate.ship.organics) }}</text>
      <text text-anchor="start" transform="translate(55 42)">Equipment</text>
      <text text-anchor="start" transform="translate(155 42)">Fuel</text>
      <text text-anchor="start" transform="translate(55 60)">Organics</text>
      <text text-anchor="start" transform="translate(155 60)">Empty</text>
    </g>
  </g>
</template>


