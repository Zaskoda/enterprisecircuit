import { defineStore } from 'pinia'
import { useRouting } from './routing'

export const useUI = defineStore('ui', {
  state: () => ({
    //overall scaling
    routing: useRouting(),
    UIScale: 1,
    showFPS: false,
    showDebug: false,
    maxScale: 4,
    minScale: 0.5,
    showMenu: true,
    menu: 'title',
    menuOptions: [
      'title', //title
      'settings',
      'connect',
      'game', //world? or maybe game, game is good
      'avatar', //signup screen
      'ship',   //signup screen
    ]
  }),
  getters: {
    homeMenu():string {
      this.routing.currentRoute
      switch(this.routing.currentRoute) {
        case 'play':
          return 'game'
      }
      return 'title'
    }
  },
  actions: {
    goHome() {
      this.changeMenu(this.homeMenu)
    },
    setUIScale(scale:number) {
      this.UIScale = Math.max(Math.min(scale, this.maxScale), this.minScale)
      //this.resizeHandler()
    },
    changeMenu(name:string) {
      this.showMenu = true
      if (this.menuOptions.includes(name)) {
        this.menu = name
      }
    }
  },
})
