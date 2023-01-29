import { defineStore } from 'pinia'
import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'
import { useClock } from '../stores/clock'

interface Sprite {
  type: string,
  parent: number,
  orbit: number,
  velocity: number,
  distance: number,
  speed: number,
  position: { x: number, y: number },
  metaData: {}
}

const maxPlanets = 14
const planetDistance = 600
const planetGap = 500

const maxMoons = 8
const moonDistance = 60
const moonGap = 20

const stationDistance = 25


interface Coords {
  x: number,
  y: number,
}


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
      maxZoom: 10,
      minZoom: 0.005,
      selectedSprite: null as null | number
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
  },
  actions: {
    deselect() {
      if (this.selectedSprite != null) {
        this.viewPoint.x = this.sprites[this.selectedSprite].position.x * -1
        this.viewPoint.y = this.sprites[this.selectedSprite].position.y * -1
        this.selectedSprite = null
      }
    },
    select(id:number) {
      this.selectedSprite= id
      this.zoomLevel = 10
    },
    zoomOut() {
      this.zoomLevel = Math.max(
        (this.zoomLevel * 0.9),
        this.minZoom
      )
    },
    zoomIn() {
      this.zoomLevel = Math.min(
        (this.zoomLevel * 1.1),
        this.maxZoom
      )
    },
    moveViewTo(x:number, y:number) {
      this.deselect()
      this.viewPoint.x = Math.max(Math.min(x, this.maxMap), this.maxMap * -1)
      this.viewPoint.y = Math.max(Math.min(y, this.maxMap), this.maxMap * -1)
    },
    setSpritesDistanceAndVelocity () {

      this.sprites.forEach((sprite) => {
        if (sprite.type == "Planet") {
          sprite.distance = (sprite.orbit) * planetGap + planetDistance
          sprite.speed = sprite.velocity / (sprite.orbit + 1) + 5
        } else if (sprite.type == "Moon") {
          sprite.distance = (sprite.orbit) * moonGap + moonDistance
          sprite.distance += (this.sprites[sprite.parent].metaData.size * 1.5)
          sprite.speed = sprite.velocity / (sprite.orbit + 1) + 5
        }else if (sprite.type == "SpaceStation") {
          sprite.distance = stationDistance + (this.sprites[sprite.parent].metaData.size * 1.5)
          sprite.speed = this.sprites[sprite.parent].metaData.size * 10 + 150 + (sprite.parent * 10)
        }
      })

    },
    async updateSpriteOrbits() {
      if (this.updating) {
        console.log('skipping')
        return
      }
      this.updating = true
      let gameTime = this.clock.gameTime

      this.sprites.forEach((sprite, index) => {
//      for (let i = 0; i < this.sprites.length; i++) {
//        let sprite = this.sprites[i]

        let throttle = 0.0000001
        let theta = (gameTime * sprite.speed * throttle) % (Math.PI * 2)
        let translatex = (sprite.distance * Math.cos(theta))
        let translatey = (sprite.distance * Math.sin(theta))

        let rad = Math.atan2(translatey, translatex)
        let rotation  = rad * (180 / Math.PI)


        if ((sprite.parent != null) && true ) {
          let parent = this.sprites[sprite.parent]
          // console.log("parent " + JSON.stringify(parent.metaData))
          // console.log("parent " + JSON.stringify(parent.position))
          sprite.position.x = translatex + parent.position.x
          sprite.position.y = translatey + parent.position.y
        } else {
          sprite.position.x = translatex
          sprite.position.y = translatey
        }
      })
      this.updating = false
    },
    async loadSprites() {
      await this.galaxy.getAll()
      let newSprites = []

      newSprites.push({

        type: 'Star',
        parent: null,
        orbit: 0,
        position: { x: 0, y: 0 },
        velocity: 0,
        distance: 0,
        speed: 0,

        metaData: {
          id: this.galaxy.chainstate.systemData.id,
          name: this.galaxy.chainstate.systemData.name,
          size:  this.galaxy.chainstate.systemData.starSize,
        }
      })

      this.galaxy.chainstate.localPlanets.forEach((planet) => {
        newSprites.push({

          type: 'Planet',
          parent: 0,
          orbit: planet.orbit,
          position: { x: 0, y: 0 },
          velocity: planet.velocity,
          distance: 0,
          speed: 0,

          metaData: {
            id: planet.id,
            name: planet.name,
            size: planet.size,
            class: planet.class,
            rings: planet.rings,
          }
        })

        let parent = newSprites.length - 1

        planet.moons.forEach((moon) => {
          newSprites.push({

            type: 'Moon',
            parent: parent,
            orbit: moon.orbit,
            position: { x: 0, y: 0 },
            velocity: moon.velocity,
            distance: 0,
            speed: 0,

            metaData: {
              id: planet.id,
              name: moon.name,
              orbit: moon.orbit,
              size: moon.size,
              class: moon.class,
            }
          })
        })
        if (planet.hasPort) {
          newSprites.push({
            orbit: 1,
            type: 'SpaceStation',
            parent: parent,
            position: { x: 0, y: 0 },
            velocity: 0,
            distance: 0,
            speed: 0,

            metaData: {
              id: planet.id,
              name: planet.station.name,
              size: planet.station.size,
              inventory: planet.station.inventory,
              price: planet.station.price
            }
          })
        }
      })
      this.sprites = newSprites
      this.setSpritesDistanceAndVelocity()
      this.updateSpriteOrbits()
      //add ships
    },
    generateSpriteList() {

    },
    addSprite (type, metadata) {

    }
  }
})
