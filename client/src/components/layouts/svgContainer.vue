<script setup lang="ts">
import fps from '../fps.svg.vue'
  import { useUI } from '../../stores/ui'
  import DefaultDefinitions from '../definitions/Orbiter8.svg.vue'
  </script>

  <script lang="ts">
  export default {
    data() {
      return {
        mouseHold: false,
        ui: useUI(),
        debug: false,
        showFPS: true,
        rect: false
      }
    },
    mounted () {
      this.ui.resizeHandler() //set initial ratio
      //TODO: consider throttling these methods
      window.addEventListener('resize', this.ui.resizeHandler)
      window.addEventListener('keyup', this.keyHandler)
      window.addEventListener('wheel', this.wheelHandler)
      window.addEventListener('mousemove', this.ui.mouseMoveHandler)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.ui.resizeHandler);
      window.removeEventListener('keyup', this.keyHandler)
      window.removeEventListener('wheel', this.wheelHandler)
      window.removeEventListener('mousemove', this.ui.mouseMoveHandler)
    },
    methods: {
      wheelHandler(event:any) {
        //todo - wheel should modify map, not UI
        console.log('wheel', event.deltaY)
        if (event.deltaY > 0) {
          this.ui.setScale(this.ui.scale * 1.01)
        } else if (event.deltaY < 0) {
          this.ui.setScale(this.ui.scale / 1.01)
        }
      },
      keyHandler() {
      }
    },
    computed: {
    }
  }
  </script>

  <template>
    <div id="svgWrapper">
    <svg
      :viewBox="ui.viewBoxSize"
      :class="{ 'is-dragging': mouseHold }"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      v-on:mousedown="mouseHold = true"
      v-on:mouseup="mouseHold = false"
      text-anchor="middle"
      dominant-baseline="central"
      rendering="auto"
      text-rendering="auto"
      shape-rendering="auto"
      fill="#ffffff">

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
      <g v-if="debug">
        <rect
          :x="ui.left" :y="ui.top"
          :height="ui.height" :width="ui.width"
          fill="none" stroke="#ff00ff" stroke-width="20" />
        <circle :cx="ui.mouseX" :cy="ui.mouseY" :r="5 * ui.scale" fill="none" stroke="#ff0000" stroke-size="#ff0000" />

        <g  :transform="'translate(' + (ui.left + 150) + '  ' + (ui.bottom - 100) + ')'">
          <text transform="translate(0 00)" fill="#ffffff">Top {{ ui.top }} Bottom {{ ui.bottom }}</text>
          <text transform="translate(0 20)" fill="#ffffff">Left {{ ui.left }} Right {{ ui.right }}</text>
          <text transform="translate(0 40)" fill="#ffffff">Scale {{ ui.scale }} Resolution {{ ui.resolution }}</text>
          <text transform="translate(0 60)" fill="#ffffff">Screen orientation: <tspan v-if="ui.portrait">Portrait</tspan><tspan v-else-if="ui.landscape">Landscape</tspan><tspan v-else>Error</tspan></text>
          <text transform="translate(0 80)" fill="#ffffff">MouseX: {{ ui.mouseX.toFixed(3) }} MouseY: {{ ui.mouseY.toFixed(3) }}</text>
          <text transform="translate(0 100)" fill="#ffffff"></text>
        </g>

      </g>

      <g v-if="debug || showFPS" :transform="'translate(' + (ui.right - 150) + '  ' + (ui.bottom - 60) + ')'">
          <fps />
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
      min-width: 200px;
      min-height: 200px;
    }

    .is-dragging {
      cursor: grabbing;
    }
  </style>
