import { defineStore } from 'pinia'

export const useUI = defineStore('ui', {
  state: () => ({
    //resolution is a target average svg resolution
    resolution: 800,
    maxRes: 1200,
    minRes: 400,
    //scale reflects the browser scaling setting
    scale: 1,
    window: {
      width: 1200,
      height: 1200,
      mouseX: 600,
      mouseY: 600
    },
    viewport: {
      width: 1200,
      height: 1200
    }
  }),
  actions: {
    resizeHandler() {
      this.scale = window.outerWidth / window.document.documentElement.clientWidth
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      let divisor = Math.min(this.window.width, this.window.height)
      let ratio = this.resolution / divisor
      this.viewport.width = Math.round(this.window.width * ratio)
      this.viewport.height = Math.round(this.window.height * ratio)
    },
    mouseMoveHandler(event:any) {
      this.window.mouseX = event.pageX
      this.window.mouseY = event.pageY
    },
    setResoltion(newResolution:number) {
      this.resolution = Math.max(
        this.minRes,
        Math.min(
          this.maxRes,
          newResolution
        )
      )
      this.resizeHandler()
    },
  },
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
    portrait():boolean {
      return (this.height > this.width)
    },
    landscape():boolean {
      return (!this.portrait)
    },
    top():number {
      return this.height / -2
    },
    bottom():number {
      return this.height / 2
    },
    left():number {
      return this.width / -2
    },
    right():number {
      return this.width / 2
    },
    width():number {
      return Math.round(this.scale * this.viewport.width)
    },
    height():number {
      return Math.round(this.scale * this.viewport.height)
    },
    mouseX():number {
      return this.width * (this.window.mouseX / this.window.width) - (this.width / 2)
    },
    mouseY():number {
      return this.height * (this.window.mouseY / this.window.height) - (this.height / 2)
    }
  }
})
