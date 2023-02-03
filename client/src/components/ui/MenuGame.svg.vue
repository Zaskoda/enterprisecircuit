<script setup lang="ts">
import EVMStatus from './EVMStatus.svg.vue'

import btn from './widgets/button-basic.svg.vue'

import Profile from './widgets/profile.svg.vue'
import System from './widgets/system.svg.vue'

import AvatarIcon from './icons/avatar.svg.vue'
import GearIcon from './icons/gear.svg.vue'
import BroadcastIcon from './icons/broadcast.svg.vue'
import PlanetsIcon from './icons/planets.svg.vue'
import ShipsIcon from './icons/ships.svg.vue'
import SpeakerIcon from './icons/speaker.svg.vue'
import JumpIcon from './icons/jump.svg.vue'
import InfoIcon from './icons/info.svg.vue'


import { useRouting } from '../../stores/routing'
import { useUI } from '../../stores/ui'
import { useScreen } from '../../stores/screen'

</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      routing: useRouting(),
      screen: useScreen(),
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<template>
  <EVMStatus />

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
    <JumpIcon @click="selectStar()" />
  </g>

  <g v-if="false" :transform="'translate(' + (screen.left + 60) + ' ' + (screen.bottom - 180)  + ')'">
    <SpeakerIcon @click="mute()" />
  </g>


  <g :transform="'translate(' + (screen.right - 60) + ' ' + (screen.bottom - 180)  + ')'">
    <ShipsIcon :counter="10" @click="showShips()" />
  </g>

  <g :transform="'translate(' + (screen.right - 60) + ' ' + (screen.bottom - 300)  + ')'">
    <PlanetsIcon :counter="1" @click="showPlanets()" />
  </g>

  <g :transform="'translate(' + (screen.right - 60) + ' ' + (screen.bottom - 60)  + ')'">
    <InfoIcon @click="toggleShowLabels()" />
  </g>

  <g :transform="'translate(' + (screen.left + 60) + ' ' + (screen.bottom - 180)  + ')'">
    <BroadcastIcon :counter="1" @click="showChat()"/>
  </g>




  <g  font-size="42px" :transform="'translate(0 ' + (screen.bottom - 20) + ')'">
    <g :transform="'scale(' + ui.UIScale + ')'">
      <btn
        :width="200" :height="60"
        text="Close"
        @click="routing.switch('title')"
        transform="translate(0 -80)" />
    </g>
  </g>

</template>

<style scoped>
</style>
