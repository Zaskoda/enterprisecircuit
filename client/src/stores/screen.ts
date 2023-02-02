import { defineStore } from 'pinia'

export const useScreen = defineStore('screen', {
  state: () => ({
    //overall scaling
    isAutoPresent: false,
    //cached values for window size and mouse position
    //default values get overwritten and don't matter much
    window: {
      width: 1200,
      height: 1200,
      mouseX: 600,
      mouseY: 600,
      mouseDirection: 0
    },
    //current resolution of the window into the SVG
    //also get overwritten
    viewport: {
      width: 200,
      height: 200
    },
    //used to preserve 16:9 or 9:16 window when scaling
    //also determines default resolution
    protectedBox: {
      long: 1920,
      short: 1200
    }
  }),
  actions: {
    resizeHandler() {
      //the window size changed, so record the new size
      this.window.width = Math.max(window.innerWidth, 400)
      this.window.height = Math.max(window.innerHeight, 400)

      //determine portrait vs landscape
      const shortSide = Math.min(this.window.width, this.window.height)
      const longSide = Math.max(this.window.width, this.window.height)

      //determine scaler that best preserves the target box
      const shortSideRatio = (shortSide / this.protectedBox.short)
      const longSideRatio = (longSide / this.protectedBox.long)

      //get the scaler for the most constrained direction
      let avgScaler = (1 / longSideRatio + 1 / shortSideRatio) / 2
      let constrainedScaler
      if (shortSideRatio > longSideRatio) {
        constrainedScaler =  1 / longSideRatio
      } else {
        constrainedScaler = 1 / shortSideRatio
      }
      let scaler = (avgScaler + constrainedScaler) / 2

      //apply new resolution to SVG's viewport based on scaler
      this.viewport.width = Math.round(this.window.width * scaler)
      this.viewport.height = Math.round(this.window.height * scaler)
    },
    mouseMoveHandler(event:any) {
      //we record the explicit mouse coords and calc SVG coords in getter
      const xdif = this.window.mouseX - event.pageX
      const ydif = this.window.mouseY - event.pageY
      this.window.mouseDirection = Math.atan2(ydif, xdif) / Math.PI * 180
      this.window.mouseX = event.pageX
      this.window.mouseY = event.pageY
    }
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

    //view modes
    portrait():boolean {
      return (this.height > this.width)
    },
    landscape():boolean {
      return (!this.portrait)
    },

    //viewbox height and width
    width():number {
      return Math.round(this.viewport.width)
    },
    height():number {
      return Math.round(this.viewport.height)
    },

    //viewable edges of SVG at current resolution
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

    //target box coords for rendering debug
    protectedBoxX(): number {
      if (this.portrait) {
        return this.protectedBox.short / -2
      }
      return this.protectedBox.long / -2
    },
    protectedBoxY(): number {
      if (this.portrait) {
        return this.protectedBox.long / -2
      }
      return this.protectedBox.short / -2
    },
    protectedBoxWidth(): number {
      if (this.portrait) {
        return this.protectedBox.short
      }
      return this.protectedBox.long
    },
    protectedBoxHeight(): number {
      if (this.portrait) {
        return this.protectedBox.long
      }
      return this.protectedBox.short
    },

    //mouse coords in SVG context
    mouseX():number {
      return this.width * (this.window.mouseX / this.window.width) - (this.width / 2)
    },
    mouseY():number {
      return this.height * (this.window.mouseY / this.window.height) - (this.height / 2)
    },

  }
})
