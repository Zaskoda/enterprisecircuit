<script setup lang="ts">
import SubMenu from './SubMenu.svg.vue'
import SubMenuSlot from './SubMenuSlot.svg.vue'
import { useWorld } from '../../stores/world'
import { useScreen } from '../../stores/screen'
</script>

<script lang="ts">
export default {
  emits: ['close'],
  data () {
    return {
      world: useWorld(),
      screen: useScreen()
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
    }
  }
}
</script>

<template>
  <SubMenu>
    <g v-for="(sprite, index) in world.planetSprites">
      <SubMenuSlot :slot="index" @click="selectPlanet(sprite.refid)">
        <text>- {{ sprite.meta.name }}</text>
      </SubMenuSlot>
    </g>
  </SubMenu>
</template>
