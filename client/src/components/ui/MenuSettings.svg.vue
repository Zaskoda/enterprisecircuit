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
  <g>
    <rect
      :x="screen.left"
      :y="screen.top"
      :height="screen.height"
      :width="screen.width"
      fill="#000000"
      opacity="0.25"
      @click="ui.goHome()"
      />
  </g>
  <g>
    <rect
      :x="-420 * ui.UIScale"
      :y="screen.top - 5"
      :height="screen.height + 10"
      :width="420 * 2 * ui.UIScale"
      stroke="#ffffff"
      stroke-width="2"
      stroke-opacity="0.1"
      fill="#000000"
      fill-opacity="0.4"
      />
  </g>

  <g :transform="'scale(' + ui.UIScale + ')'">
    <g transform="translate(0 -300)" v-if="ui.homeMenu == 'game'">
      <btn
        font-size="30px"
        :width="350" :height="50"
        text="Quit to Title Screen"
        @click="routing.switch('title')"
        transform="translate(0 0)" />
    </g>
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
        @click="ui.goHome()"
        transform="translate(0 -80)" />
    </g>
  </g>

</template>

<style scoped>
</style>
