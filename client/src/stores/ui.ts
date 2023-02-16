import { defineStore } from 'pinia'

export const useUI = defineStore('ui', {
  state: () => ({
    //overall scaling
    UIScale: 1,
    showNetworkSelect: false,
    showFPS: false,
    showDebug: false,
    maxScale: 4,
    minScale: 0.5,
    showMenu: true,
    menu: 'home',
    menuOptions: [
      'home',
      'settings',
      'connect',
      'game',
      'avatar',
      'ship'
    ]
  }),
  actions: {
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
  }
})
