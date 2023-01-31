<script setup lang="ts">
  import FPS from '../ui/FPS.svg.vue'
  import { useUI } from '../../stores/ui'
  import { useWorld } from '../../stores/world'
  import DefaultDefinitions from '../definitions/Orbiter8.svg.vue'
  </script>

  <script lang="ts">
  export default {
    data() {
      return {
        ui: useUI(),
        world: useWorld(),
        rect: false
        //TODO: move debug toggles to UI store & settings page
      }
    },
    mounted () {
      this.ui.resizeHandler() //set initial ratio
      //TODO: consider throttling these methods
      window.addEventListener('resize', this.ui.resizeHandler)
      window.addEventListener('mousemove', this.ui.mouseMoveHandler)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.ui.resizeHandler);
      window.removeEventListener('mousemove', this.ui.mouseMoveHandler)
    },
    methods: {
    },
    computed: {
    }
  }
  </script>

  <template>
    <div id="svgWrapper">
    <svg
      :viewBox="ui.viewBoxSize"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      text-anchor="middle"
      dominant-baseline="central"
      rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      shape-rendering="geometricPrecision"
      fill="#ffffff"
      font-size="48px">

      <default-definitions />
      <slot />

      <rect
        v-if="rect"
        :x="ui.protectedBoxX"
        :y="ui.protectedBoxY"
        :width="ui.protectedBoxWidth"
        :height="ui.protectedBoxHeight"
        fill="none"
        stroke="#ff00ff"
        stroke-width="1.5"
        stroke-dasharray="2 1"
        stroke-opacity="0.75" />
      <g v-if="ui.debug" font-size="20px">
        <rect
          :x="ui.left" :y="ui.top"
          :height="ui.height" :width="ui.width"
          fill="none" stroke="#ff00ff" stroke-width="20" />
        <circle :cx="ui.mouseX" :cy="ui.mouseY" :r="5" fill="none" stroke="#ff0000" stroke-size="#ff0000" />

        <g  :transform="'translate(' + (ui.left + 160) + '  ' + (ui.bottom - 160) + ')'">
          <text transform="translate(0 00)" fill="#ffffff">Top {{ ui.top }} Bottom {{ ui.bottom }}</text>
          <text transform="translate(0 20)" fill="#ffffff">Left {{ ui.left }} Right {{ ui.right }}</text>
          <text transform="translate(0 40)" fill="#ffffff">UI Scale {{ ui.UIScale }} Rez {{ ui.width }} x  {{ ui.height }}</text>
          <text transform="translate(0 60)" fill="#ffffff">Orientation: <tspan v-if="ui.portrait">Portrait</tspan><tspan v-else-if="ui.landscape">Landscape</tspan><tspan v-else>Error</tspan></text>
          <text transform="translate(0 80)" fill="#ffffff">MX: {{ ui.mouseX.toFixed(3) }} MY: {{ ui.mouseY.toFixed(3) }}</text>
          <text transform="translate(0 100)" fill="#ffffff">Zoom: {{ world.zoomLevel.toFixed(3) }}</text>
          <text transform="translate(0 120)" fill="#ffffff">WX: {{ world.viewPoint.x.toFixed(3) }} WY: {{ world.viewPoint.y.toFixed(3) }}</text>

        </g>

      </g>

      <g v-if="ui.debug || ui.showFPS" :transform="'translate(' + (ui.right - 110) + '  ' + (ui.bottom - 40) + ')'">
          <FPS />
        </g>
    </svg>
    </div>
  </template>


  <style scoped lang="scss">
    svg {
      min-width: 100%;
      min-height: 100%;
    }

    div#svgWrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      overflow: hidden;
      min-width: 400px;
      min-height: 400px;
    }

  </style>
