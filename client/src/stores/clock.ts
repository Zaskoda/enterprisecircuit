import { defineStore } from 'pinia'

/*******************************
 * Provides a global game clock with
 * - adjustable frequency
 * - ability to pause
 *******************************/

export const useClock = defineStore('clock', {
  state: () => ({
    gameClock: Date.now(),
    updateFrequency: 18,
    //40.2 ~= 24fpx
    //33.6 = 30fps
    //16.6 = 60fps
    isRunning: false,
    lastUpdate: Date.now(),
    fps: '0.0' as string,
    frameTimes: [] as number[],
    updatingClock: false
  }),
  actions: {
    async update() {
      if (this.isRunning) {
        //requestAnimationFrame restricts FPS to browser refresh rate
        setTimeout(() => requestAnimationFrame(this.update), this.updateFrequency)
        if (!this.updatingClock) {
          this.updatingClock = true
          const now = Date.now()
          const elapsedTime = now - this.lastUpdate
          this.gameClock = now
          this.lastUpdate = now

          //calcualte FPS
          if (this.frameTimes.length >= 100) this.frameTimes.shift()
          this.frameTimes.push(elapsedTime)
          const totaltime = this.frameTimes.reduce((x, y) => {return x+y}, 0)
          const totalframes = this.frameTimes.length
          this.fps = ((totalframes / totaltime) * 1000).toFixed(1)
          this.updatingClock = false
        }


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
