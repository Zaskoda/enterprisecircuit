import { defineStore } from 'pinia'
import { useUI } from './ui'

export const useRouting = defineStore('routing', {
  state: () => ({
    currentRoute: 'title',
    ui: useUI(),
    routes: [
      'title',
      'play',
      'storya',
      'storyb',
      'four',
      'assets',
      'avatars',
      'galaxy',
      'window'
    ],
    autoOpenUIRoutes: [
      'title'
    ]
  }),
  actions: {
    async switch(route:string) {
      if (this.routes.includes(route))
      this.currentRoute = route
      // we always close the open menu unless
      // we want to auto open it
      if (this.autoOpenUIRoutes.includes(route)) {
        this.ui.showMenu = true
      } else {
        this.ui.showMenu = false
      }
    },
  },
  getters: {
    is: (state) => {
      return (route:string) => state.currentRoute === route
    }
  }
})
