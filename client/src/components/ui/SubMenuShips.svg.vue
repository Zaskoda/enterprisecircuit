<script setup lang="ts">
import SubMenu from './SubMenu.svg.vue'
import SubMenuSlot from './SubMenuSlot.svg.vue'
import SubMenuSlotShip from './SubMenuSlotShip.svg.vue'
import { useWorld } from '../../stores/world'
import { useScreen } from '../../stores/screen'
</script>

<script lang="ts">
export default {
  emits: ['close'],
  data () {
    return {
      world: useWorld(),
      screen: useScreen(),
      hover: false,
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    selectPlanet(refid:string) {
      this.world.selectByRefId(refid)
      this.$emit('close')
    },

  }
}
</script>

<template>
  <SubMenu @close="$emit('close')">
    <g v-for="(sprite, index) in world.shipSprites">
      <SubMenuSlot :slot="index" @click="selectPlanet(sprite.refid)" :highlight="world.selectedSprite == sprite.index">
        <SubMenuSlotShip :shipIndex="sprite.index" />

      </SubMenuSlot>
    </g>
  </SubMenu>
</template>
