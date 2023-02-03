<script setup lang="ts">
import btn from './widgets/button-basic.svg.vue'
import { useScreen } from '../../stores/screen'
import { useUI } from '../../stores/ui'
import { useRouting } from '../../stores/routing'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      screen: useScreen(),
      routing: useRouting(),
    }
  },
  mounted() {
  },
}
</script>

<template>

  <g :transform="'scale(' + ui.UIScale + ')'">
    <g>
      <text text-anchor="end" transform="translate(-70 0)">UI Scale:</text>
      <text transform="translate(0 0)">{{ Math.round(ui.UIScale * 100) }}%</text>
      <btn
        :width="70" :height="50"
        text="+"
        @click="ui.setUIScale(ui.UIScale + 0.25)"
        transform="translate(280 0)" />
      <btn
        :width="70" :height="50"
        text="&times;"
        @click="ui.setUIScale(1)"
        transform="translate(200 0)" />
      <btn
        :width="70" :height="50"
        text="-"
        @click="ui.setUIScale(ui.UIScale - 0.25)"
        transform="translate(120 0)" />
    </g>

    <g transform="translate(0 60)">
      <text text-anchor="end" transform="translate(-70 0)">FPS:</text>
      <text v-if="ui.showFPS" transform="translate(0 0)">On</text>
      <text v-else transform="translate(0 0)">Off</text>
      <btn
        :width="70" :height="50"
        :text="ui.showFPS ? '&#9673;' :  '&#9675;'"
        @click="ui.showFPS = !ui.showFPS"
        transform="translate(150 0)" />
    </g>

    <g  font-size="12px" :transform="'translate(0 ' + (screen.top + 150) + ')'">
    <g :transform="'scale(' + ui.UIScale + ')'">
      <MinervaScreen />
    </g>
  </g>

    <g transform="translate(0 120)">
      <text text-anchor="end" transform="translate(-70 0)">Debug:</text>
      <text v-if="ui.showDebug" transform="translate(0 0)">On</text>
      <text v-else transform="translate(0 0)">Off</text>
      <btn
        :width="70" :height="50"
        :text="ui.showDebug ? '&#9673;' :  '&#9675;'"
        @click="ui.showDebug = !ui.showDebug"
        transform="translate(150 0)" />
    </g>

  </g>



  <g  font-size="42px" :transform="'translate(0 ' + (screen.bottom - 20) + ')'">
    <g :transform="'scale(' + ui.UIScale + ')'">
      <btn
        :width="200" :height="60"
        text="Close"
          @click="ui.changeMenu('home')"
        transform="translate(0 -80)" />
    </g>
  </g>

</template>

<style scoped>
</style>
