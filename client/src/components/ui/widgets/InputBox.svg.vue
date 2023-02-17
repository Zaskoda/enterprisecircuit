
<script lang="ts">
export default {
  emits: [
    'value',
    'submit'
  ],
  data() {
    return {
      editing: false,
      returnValue: '',
      hover: false,
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyHandler),
    window.addEventListener('mousedown', this.mousedownHandler)
    this.returnValue = this.value
    this.editing = this.focus
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyHandler),
    window.removeEventListener('mousedown', this.mousedownHandler)
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    mousedownHandler() {
      this.editing = false
    },
    keyHandler(e:Event) {
      let key:string = e.key
      if (!this.editing) {
        return
      }
      if(key.length == 1 || (key.length > 1 && /[^a-zA-Z0-9]/.test(key))) {
        if (this.returnValue.length < 26) {
          this.returnValue += key
        }
      }
      if (key == 'Backspace') {
        this.returnValue = this.returnValue.slice(0, -1)
      }
      if (key == 'Escape') {
        this.editing = false
      }
      if (key == 'Enter') {
        this.$emit('submit')
      }
      this.$emit('value', this.returnValue)

    },
  },
  computed: {
    displayText() {
      if (this.editing) {
        return this.returnValue + '|'
      }
      return this.returnValue
    }
  }
}
</script>

<template>
    <rect
      x="-280" y="-25" width="500" height="50"
      rx="15" ry="15"
      fill="#000000"
      :fill-opacity="editing? 0.5 : 0.3"
      :stroke-width="editing ? 3 : 1"
      stroke="#ffffff"
      :stroke-opacity="editing ? 0.5 : 0.25" />

    <text font-size="28px"
      text-anchor="start"
      font-family="monospace"
      transform="translate(-250 0)" fill="#ffffff">{{ displayText }}</text>

   <rect x="-280" y="-25"
     width="500" height="50"
     fill-opacity="0" class="canclick" @click="editing = true" />

   <rect
      x="230" y="-25" width="50" height="50"
      rx="15" ry="15"
      fill="#000000"
      :fill-opacity="returnValue.length > 0 ? 0.5 : 0.1"
      stroke-width="1"
      stroke="#ffffff"
      stroke-opacity="0.2" />

    <text font-size="28px"
      v-if="returnValue.length > 0"
      text-anchor="middle"
      transform="translate(255 0)" fill="#ffffff">&#8617;</text>

    <rect
      v-if="returnValue.length > 0"
      @mouseover="hover = true" @mouseleave="hover = false"
      x="230" y="-25" width="50" height="50"
      rx="15" ry="15"
      class="canclick"
      fill-opacity="0"
      stroke-width="3"
      stroke="#ffffff"
      :stroke-opacity="hover ? 1 : 0.5"
      @click="$emit('submit')"
      />


</template>