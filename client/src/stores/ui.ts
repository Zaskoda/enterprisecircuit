import { defineStore } from 'pinia'

export const useUI = defineStore('ui', {
  state: () => ({
    //overall scaling
    UIScale: 1,
    showFPS: false,
    showDebug: false,
    maxScale: 4,
    minScale: 0.5,
    showMenu: true,
    menu: 'home',
    menuOptions: [
      'home',
      'settings'
    ]
  }),
  actions: {
    setUIScale(scale:number) {
      this.UIScale = Math.max(Math.min(scale, this.maxScale), this.minScale)
      //this.resizeHandler()
    },
    changeMenu(name:string) {
      if (this.menuOptions.includes(name)) {
        this.menu = name
      }
    }
  }
})
