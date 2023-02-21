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
      'window'
    ]
  }),
  actions: {
    async switch(route:string) {
      if (this.routes.includes(route))
      this.currentRoute = route

      switch(route) {
        case 'title':
          this.ui.changeMenu('home')
          break
        case 'play':
          this.ui.changeMenu('game')
          break
        case 'storya':
        case 'storyb':
        case 'four':
        case 'assets':
        case 'avatars':
        case 'galaxy':
        case 'window':
          this.ui.showMenu = false
          break
      }
    },
  },
  getters: {
    is: (state) => {
      return (route:string) => state.currentRoute === route
    }
  }
})
