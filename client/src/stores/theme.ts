import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', {
  state: () => ({
    objects: {
      fill: '#ffffff',
      fillOpacity: 1,
      stroke: '#ffffff',
      strokeWidth: 0,
      strokeOpacity: 0
    }
  }),
  getters: {
  }
})
