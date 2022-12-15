import { defineStore } from 'pinia'

/*******************************
 * Provides a global game clock with
 * - adjustable frequency
 * - ability to pause
 *******************************/

export const useClock = defineStore('clock', {
  state: () => ({
    gameClock: 0,
    updateFrequency: 40,
    //40.2 ~= 24fpx
    //33.6 = 30fps
    //16.6 = 60fps
    isRunning: false,
    lastUpdate: 0
  }),
  actions: {
    update() {
      if (this.isRunning) {
        const now = performance.now()
        const elapsedTime = now - this.lastUpdate
        this.gameClock = this.gameClock + elapsedTime
        this.lastUpdate = now
        setTimeout(this.update, this.updateFrequency)
      }
    },
    setFrequency(newFrequency:number) {
      this.updateFrequency = newFrequency
    },
    pause() {
      this.isRunning = false
    },
    play() {
      if (!this.isRunning) {
        //dismiss time while paused
        this.lastUpdate = performance.now()
        //resetart updates
        this.isRunning = true
        this.update()
      }
    }
  },
  getters: {
    gameTime():number {
      return Math.round(this.gameClock)
    },
    gameTimeInSeconds():number {
      return Math.round(this.gameClock / 1000)
    }
  }
})
