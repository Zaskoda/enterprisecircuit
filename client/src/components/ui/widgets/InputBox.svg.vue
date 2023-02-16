
<script lang="ts">
export default {
  emits: [
    'value'
  ],
  data() {
    return {
      editing: false,
      editingClicked: false,
      returnValue: '',
      hover: false
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (this.editing) {
        this.keyHandler(e.key)
      }
    }),
    window.addEventListener('click', () => {
      this.editing = this.editingClicked
      this.editingClicked = false
    })
    this.returnValue = this.value
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    keyHandler(key:string) {
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
        this.$emit('value', this.returnValue)
      }

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

   <rect x="-280" y="-25" width="500" height="40" fill-opacity="0" class="canclick" @click="editingClicked = true" />

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
      @click="$emit('value', returnValue)"
      :stroke-width="0" />


</template>