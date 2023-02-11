import { defineStore } from 'pinia'
import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'
import { useClock } from '../stores/clock'

import { useSprites } from './composables/sprites'
import { Sprite, Coords } from '../models/sprite'


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
        y:0
      } as Coords,
      maxMap: 6500,
      maxZoom: 100,
      minZoom: 0.005,
      selectedSprite: null as null | number,
      isLoaded: false
    }
  },
  getters: {
    getViewPoint():Coords {
      if (this.selectedSprite!= null) {
        return {
          x: this.sprites[this.selectedSprite].position.x * -1,
          y: this.sprites[this.selectedSprite].position.y * -1
        }
      }
      return this.viewPoint
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
    deselect() {
      if (this.selectedSprite != null) {
        this.viewPoint.x = this.sprites[this.selectedSprite].position.x * -1
        this.viewPoint.y = this.sprites[this.selectedSprite].position.y * -1
        this.selectedSprite = null
      }
    },
    select(id:number) {
      if (id in this.sprites) {
        this.selectedSprite= id
        this.zoomLevel = 5
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
