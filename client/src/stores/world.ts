import { defineStore } from 'pinia'
import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'
import { useClock } from '../stores/clock'

import { useSprites } from './composables/sprites'
import { Sprite, Coords } from '../models/sprite'
import { useTween } from '../composables/tween'

const maxPlanets = 14
const planetDistance = 600
const planetGap = 500

const maxMoons = 8
const moonDistance = 60
const moonGap = 20

const stationDistance = 25



export const useWorld = defineStore('world', {
  state: () => {
    return {
      avatar: useAvatar(),
      galaxy: useGalaxy(),
      clock: useClock(),
      sprites: [] as Sprite[],
      updating: false,
      zoomLevel: 1,
      viewPoint: {
        x: 0,
        y: 0,
      } as Coords,
      tweens: {
        x: useTween(),
        y: useTween(),
        z: useTween()
      },
      maxMap: 6500,
      maxZoom: 100,
      minZoom: 0.005,
      selectedSprite: null as null | number,
      isLoaded: false
    }
  },
  getters: {
    getViewPoint():Coords {

      let x = this.viewPoint.x
      let y = this.viewPoint.y
      if (this.selectedSprite!= null) {
        x = this.sprites[this.selectedSprite].position.x * -1,
        y = this.sprites[this.selectedSprite].position.y * -1
      }
      return {
        x: x + this.tweens.x,
        y: y + this.tweens.y
      }
    },
    getZoomLevel():number {
      return (this.zoomLevel + this.tweens.z)
    },
    planetSprites():Sprite[] {
      return this.sprites.filter(sprite => {
        return sprite.type == 'Planet'
      })
    },
    shipSprites():Sprite[] {
      return this.sprites.filter(sprite => {
        return sprite.type == 'Ship'
      })
    },
    isConnected():boolean {
      return (this.avatar.isConnected && this.galaxy.isConnected)
    }
  },
  actions: {
    async loadFromNetwork() {
      await Promise.all([
        this.avatar.getAll(),
        this.galaxy.getAll()
      ])
      await this.avatar.preloadForAddresses(
        this.galaxy.knownAddresses
      )

    },
    newWorldZoom() {
      this.zoomLevel = 2
      this.tweens.z = useTween(
        this.minZoom - 2,
        0,
        4000
      )
    },
    deselect() {
      if (this.selectedSprite != null) {
        this.viewPoint.x = this.sprites[this.selectedSprite].position.x * -1
        this.viewPoint.y = this.sprites[this.selectedSprite].position.y * -1
        this.selectedSprite = null
      }
    },
    select(id:number) {
      if (id in this.sprites) {

        let viewPoint:Coords = this.getViewPoint
        let target:Coords = this.sprites[id].position
        let offset:Coords = {
          x: viewPoint.x + target.x,
          y: viewPoint.y + target.y
        }
        let time = Math.sqrt(offset.x * offset.x + offset.y * offset.y)
        time = time / 2 + 200
        this.tweens.x = useTween(
          offset.x,
          0,
          time
        )
        this.tweens.y = useTween(
          offset.y,
          0,
          time
        )

        let preferredZoom = 5
        if (this.sprites[id].type == "Star") {
          preferredZoom = 2
        }
        if (this.sprites[id].type == "Planet") {
          preferredZoom = 4
        }
        this.selectedSprite= id
        this.tweens.z = useTween(
          -1 * preferredZoom + this.zoomLevel,
          0,
          time
        )
        this.zoomLevel = preferredZoom
      }
    },
    selectByRefId(refid:string) {
      this.select(this.findByRefId(refid))
    },
    findByRefId(refid:string) {
      return this.sprites.findIndex((sprite) => {
        return sprite.refid == refid
      }, refid)
    },
    zoomOut(multiplier:number = 1) {
      this.zoomLevel = Math.max(
        (this.zoomLevel * Math.pow(0.9, multiplier)),
        this.minZoom
      )
    },
    zoomIn(multiplier:number = 1) {
      this.zoomLevel = Math.min(
        (this.zoomLevel * Math.pow(1.1, multiplier)),
        this.maxZoom
      )
    },
    moveViewTo(x:number, y:number) {
      this.deselect()
      this.viewPoint.x = Math.max(Math.min(x, this.maxMap), this.maxMap * -1)
      this.viewPoint.y = Math.max(Math.min(y, this.maxMap), this.maxMap * -1)
    },
    async updateSpriteOrbits() {
      if (this.updating) {
        console.log('skipping')
        return
      }
      this.updating = true
      let gameTime = this.clock.gameTime

      this.sprites.forEach((sprite, index) => {
// note: foreach may be running out of order in some browsers for optimization
//      for (let i = 0; i < this.sprites.length; i++) {
//        let sprite = this.sprites[i]

        let throttle = 0.0000001
        let theta = (gameTime * sprite.orbit.period * throttle + sprite.orbit.offset) % (Math.PI * 2)
        let translatex = (sprite.orbit.distance * Math.cos(theta))
        let translatey = (sprite.orbit.distance * Math.sin(theta))

        let rad = Math.atan2(translatey, translatex)
        let rotation  = rad * (180 / Math.PI)
        if (sprite.type == 'Planet') {
        sprite.luminance.rotation = rotation
        }
        if (sprite.type == 'Ship') {
          sprite.rotation = (rotation + 0) % 360
        }

        if ((sprite.orbit.parent > 0)) {
          let parent = this.sprites[sprite.orbit.parent]
          sprite.position.x = translatex + parent.position.x
          sprite.position.y = translatey + parent.position.y
        } else {
          sprite.position.x = translatex
          sprite.position.y = translatey
        }
      })
      this.updating = false
    },
    async loadEntities() {
      await Promise.all([
        this.avatar.getAll(),
        this.galaxy.getAll()
      ])

      this.sprites = useSprites(this.galaxy.chainstate)

      //todo: this should probably move to useSprites
      this.updateSpriteOrbits()

      this.isLoaded = true
    },
  }
})
