<script setup lang="ts">
import btn from './ui/widgets/button-basic.svg.vue'
import SpaceBackground from './assets/sprites/SpaceBackground.svg.vue'

import { useScreen } from '../stores/screen'
import { useRouting } from '../stores/routing'
import { useAvatar } from '../stores/avatar'
</script>

<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
      avatar: useAvatar(),
      routing: useRouting(),
    }
  },
  methods: {
    async init() {
      await this.avatar.connect()
      await this.avatar.getAll()
      await this.avatar.getAllAvatars()
    },
    async createAvatar() {
      const name = prompt('What name?')
      await this.avatar.createAvatar(name)
    }
  }
}
</script>

<template>
    <SpaceBackground  />




      <g v-if="!avatar.isConnected">
        <btn :width="210" :height="50" @click="init()" font-size="20" :text="'Load Data'"  />
      </g>
      <g v-else>

        <btn :width="210" :height="50"
          @click="init()"
          font-size="20"
          :text="'Reload Data'"
          transform="translate(0 -150)" />

        <g transform="translate(0 -100)">
          <text fill="#888">Avatar Count: <tspan fill="#ffffff" font-weight="bold">{{ avatar.chainstate.avatarCount }}</tspan></text>
        </g>

        <g transform="translate(0 -20)">
          <g v-if="!avatar.chainstate.haveAvatar">
            <g transform="translate(0 -40)">
              <text>You have no avatar.</text>
            </g>
            <g transform="translate(0 -10)">
              <btn :width="140" :height="24" @click="createAvatar()" font-size="14" :text="'Create Avatar'"  />
            </g>
          </g>
          <g v-else>
            <g transform="translate(0 -40)">
              <text>My Avatar Name: {{ avatar.chainstate.myAvatarName }}</text>
            </g>
            <g transform="translate(0 -10)">
              <text>My Avatar Id: {{ avatar.chainstate.myAvatarId }}</text>
            </g>
          </g>

          <g transform="translate(0 30)">
            <text>All Avatars:</text>
          </g>
          <g v-for="(avatarName, index) in avatar.knownAvatars" font-size="10px">
            <text :transform="'translate(-40 ' + (index * 14 + 50) + ')'" text-anchor="end">{{ index }}</text>
            <text :transform="'translate(-35 ' + (index * 14 + 50) + ')'" text-anchor="start">{{ avatarName }}</text>
          </g>
        </g>
      </g>


      <g font-size="12px" :transform="'translate(0 ' + (screen.bottom - 40) + ')'">
        <btn
          :width="120" :height="20"
          text="close"
          @click="routing.switch('title')"
          />
      </g>

</template>

<style scoped>
</style>
