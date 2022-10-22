import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', {
  state: () => ({
    objects: {
      fill: '#ffffff',
      fillOpacity: 0.1,
      stroke: '#ffffff',
      strokeWidth: 100,
      strokeOpacity: 0.8
    }
  }),
  getters: {
    viewBoxSize():string {
      return (
        this.left +
        ' ' +
        this.top +
        ' ' +
        this.width +
        ' ' +
        this.height
      )
    },


  }
})
