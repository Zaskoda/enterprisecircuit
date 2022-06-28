<script setup lang="ts">
import svgContainer from './layouts/svgContainer.vue'
import logo from './assets/logo.svg.vue'
import btn from './ui-primitives/button-basic.svg.vue'
import web3Containment from './containment/web3Containment.vue'
import { useUI } from '../stores/ui'
import { useAvatar } from '../stores/avatar'
</script>

<script lang="ts">
export default {
  data() {
    return {
      ui: useUI(),
      avatar: useAvatar()
    }
  },
  methods: {
    async init() {
      await this.avatar.connect()
      await this.avatar.getAll()
    },
    async createAvatar() {
      const name = prompt('What name?')
      await this.avatar.createAvatar(name)
    }
  }
}
</script>

<template>
<svgContainer>
  <web3Containment>

    <g :transform="'translate(0 ' + (ui.top + 80) + ')'">
      <g transform="scale(0.5)">
      <logo />
      </g>
      <line :x1="ui.left + 50" :x2="ui.right-50" y1="60" y2="60" stroke="#ffffff44" stroke-width="4" />
    </g>
    <g transform="translate(0 -300)">
      <text fill="#888">Avatar Count: <tspan fill="#ffffff" font-weight="bold">{{ avatar.chainstate.avatarCount }}</tspan></text>
    </g>

    <g v-if="!avatar.connected">
      <btn :width="210" :height="50" @click="init()" font-size="1em" :text="'Connect'"  />
    </g>
    <g v-else>
      <g v-if="!avatar.chainstate.haveAvatar">
        <btn :width="210" :height="50" @click="createAvatar()" font-size="1em" :text="'Create Avatar'"  />
      </g>
      <g v-else>
        <g transform="translate(0 -230)">
          <text>My Avatar Name: {{ avatar.chainstate.myAvatarName }}</text>
        </g>
        <g transform="translate(0 -210)">
          <text>My Avatar Id: {{ avatar.chainstate.myAvatarId }}</text>
        </g>
      </g>
      <btn :width="210" :height="50" @click="init()" font-size="1em" :text="'reConnect'"  />
    </g>


  </web3Containment>
</svgContainer>
</template>

<style scoped>
</style>
