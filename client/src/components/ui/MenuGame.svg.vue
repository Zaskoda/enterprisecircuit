<script setup lang="ts">
import EVMStatus from './EVMStatus.svg.vue'

import btn from './widgets/button-basic.svg.vue'

import Profile from './widgets/profile.svg.vue'
import System from './widgets/system.svg.vue'
import ZoomSlider from './widgets/zoomSlider.svg.vue'

import AvatarIcon from './icons/avatar.svg.vue'
import GearIcon from './icons/gear.svg.vue'
import BroadcastIcon from './icons/broadcast.svg.vue'
import PlanetsIcon from './icons/planets.svg.vue'
import ShipsIcon from './icons/ships.svg.vue'
import SpeakerIcon from './icons/speaker.svg.vue'
import JumpIcon from './icons/jump.svg.vue'
import InfoIcon from './icons/info.svg.vue'

import SubMenuPlanets from './SubMenuPlanets.svg.vue'
import SubMenuShips from './SubMenuShips.svg.vue'

import { useRouting } from '../../stores/routing'
import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'
import { useWorld } from '../../stores/world'

</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      screen: useScreen(),
      world: useWorld(),
      showPlanetsMenu: false,
      showShipsMenu: false
    }
  },
  mounted() {
  },
  methods: {
    selectMyShip() {
      this.world.selectMyShip()
    }
  }
}
</script>

<template>

  <g :transform="'translate(' + (screen.left + 120) + ' ' + (screen.top + 20)  + ')'">
    <Profile />
  </g>

  <g :transform="'translate(' + (screen.right - 120) + ' ' + (screen.top + 45) + ')'" >
    <System />
  </g>

  <g :transform="'translate(' + (screen.left + 60) + ' ' + (screen.top + 60)  + ')'">
    <AvatarIcon @click="selectMyShip()" />
  </g>


  <g :transform="'translate(' + (screen.left + 60) + ' ' + (screen.bottom - 60)  + ')'">
    <GearIcon @click="routing.switch('title')" />
  </g>


  <g :transform="'translate(' + (screen.right - 60) + ' ' + (screen.top + 60)  + ')'">
    <JumpIcon @click="world.select(0)" />
  </g>


  <g :transform="'translate(' + (screen.right - 60) + ' ' + (screen.bottom - 180)  + ')'">
    <ShipsIcon :counter="world.shipSprites.length" @click="showShipsMenu = true" />
  </g>

  <g :transform="'translate(' + (screen.right - 60) + ' ' + (screen.bottom - 300)  + ')'">
    <PlanetsIcon :counter="world.planetSprites.length" @click="showPlanetsMenu = true" />
  </g>

  <g :transform="'translate(' + (screen.right - 60) + ' ' + (screen.bottom - 60)  + ')'">
    <InfoIcon @click="toggleShowLabels()" />
  </g>

  <g :transform="'translate(' + (screen.left + 60) + ' ' + (screen.bottom - 180)  + ')'">
    <BroadcastIcon :counter="1" @click="showChat()"/>
  </g>

  <g :transform="'translate(0 ' + (screen.bottom - 80)  + ')'">
  <ZoomSlider transform="scale(1)" />
  </g>


  <g>
    <SubMenuPlanets :show="showPlanetsMenu" @close="showPlanetsMenu = false" />
  </g>


  <g>
    <SubMenuShips :show="showShipsMenu" @close="showShipsMenu = false" />
  </g>



</template>

<style scoped>
</style>
