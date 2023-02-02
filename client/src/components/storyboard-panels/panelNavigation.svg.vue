<script setup lang="ts">
  import btn from '../ui/button-basic.svg.vue'

  import { useScreen } from '../../stores/screen'
</script>

<script lang="ts">
export default {
  emits: ['panel', 'finish', 'close'],
  props: {
    panelCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      screen: useScreen(),
      panel: 0
    }
  },
  watch: {
    panel(newPanel) {
      this.$emit('panel', newPanel)
    }
  },
  methods: {
    emit() {
      this.$emit('panel', this.panel)
    },
    next() {
      this.panel = (this.panel + 1) % this.panelCount
    },
    prev() {
      if (this.panel > 0) {
        this.panel --
      }
    },
    seek(n:number) {
      if ((n >= 0) && (n < this.panelCount)) {
        this.panel = n
      }
    },
    finish() {
      this.$emit('finish')
    }
  }
}
</script>

<template>
  <g>
    <g :transform="'translate(0 ' + (screen.bottom - 50) + ')'" v-if="!screen.isAutoPresent">
      <rect
        :x="screen.left"
        y="-50"
        :width="screen.right - screen.left"
        height="100"
        fill="#000000"
        fill-opacity="0.2"
        />
      <g font-size="10px">
        <g fill-opacity="0.5"
          :transform="'translate(' + ((panelCount + 3) * -25) + ' 0)'"
        >
          <btn
            v-if="panel > 0"
            fill="#ffff88"
            :width="20" :height="20"
            @click="prev" text="&larr;"
            transform="scale(1.75)" />
            />
          <btn
            v-if="panel == 0"
            fill="#ff88ff"
            :width="40" :height="20"
            @click="$emit('close')" text="Close"
            transform="scale(1.5)" />
            />
        </g>
        <g fill-opacity="0.75" fill="#ffff88"
          :transform="'translate(' + ((panelCount + 3) * 25) + ' 0)'">
          <btn
            :width="60" :height="20"
            @click="next" text="next &rarr;"
            v-if="panel != (panelCount-1)"
            transform="scale(1.75)" />
          <btn
            :width="60" :height="20"
            @click="finish" text="Try It"
            v-else
            transform="scale(2)" />
        </g>
      </g>

      <btn
        v-for="n in panelCount"
        v-bind:key="n"
        font-size="12px"
        fill="#ffffff"
        :width="30"
        :height="20"
        :text="(n).toString()"
        :selected="n <= panel + 1"
        @click="seek(n - 1)"
        :transform="'translate(' + ((n * 50) - ((panelCount + 1) * 25)) + ' 0) scale(1.25)'" />

    </g>
  </g>
</template>

<style scoped>
</style>
