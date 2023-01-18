import { defineStore } from 'pinia'
import { useAvatar } from '../stores/avatar'
import { useGalaxy } from '../stores/galaxy'
import { useClock } from '../stores/clock'

interface Sprite {
  type: string,
  parent: number,
  orbit: number,
  position: {
    x: number,
    y: number
  },
  orbitalPosition: {
    x: number,
    y: number
  },
  metaData: {
  }
}

export const useWorld = defineStore('world', {
  state: () => {
    return {
      avatar: useAvatar(),
      galaxy: useGalaxy(),
      clock: useClock(),
      sprites: [] as Sprite[],
      updating: false
    }
  },
  getters: {
  },
  actions: {
    async updateSpriteOrbits() {
      if (this.updating) {
        console.log('skipping')
        return
      }
      this.updating = true
      let gameTime = this.clock.gameTime

      this.sprites.forEach((sprite, index) => {
        let distance = 0
        let speed = 10
        if (sprite.type == "Planet") {
          distance = (sprite.orbit) * 100
          speed = (this.sprites.length - index + 2) * 2 + 1
        } else if (sprite.type == "Moon") {
          distance = (sprite.orbit) * 10
          speed = (this.sprites.length - index + 2) * 50 + 1
        }else if (sprite.type == "SpaceStation") {
          distance = 50
          speed = 30
        }

        let throttle = 0.0000001
        let theta = (gameTime * speed * throttle) % (Math.PI * 2)
        let translatex = (distance * Math.cos(theta))
        let translatey = (distance * Math.sin(theta))

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
        id: this.galaxy.chainstate.systemData.id,
        type: 'Star',
        parent: null,
        orbit: 0,
        position: { x: 0, y: 0 },
        orbitalPosition: { x: 0, y: 0 },
        metaData: {
          name: this.galaxy.chainstate.systemData.name,
          size:  this.galaxy.chainstate.systemData.starSize,
        }
      })
      this.galaxy.chainstate.localPlanets.forEach((planet) => {
        newSprites.push({
          id: planet.id,
          orbit: planet.orbit + 2,
          type: 'Planet',
          parent: null,
          position: { x: planet.orbit * 80 + 150, y: 0 },
          metaData: {
            name: planet.name,
            size: planet.attributes.size,
            class: planet.attributes.class,
            rings: planet.attributes.rings,
            speed: planet.attributes.speed
          }
        })
        let parent = newSprites.length - 1
        planet.moons.forEach((moon) => {
          newSprites.push({
            id: planet.id,
            orbit: moon.orbit + 3,
            type: 'Moon',
            parent: parent,
            position: {
              x: planet.orbit * 80 + 150,
              y: moon.orbit * 20 +50
            },
            metaData: {
              name: moon.name,
              orbit: moon.orbit,
              size: moon.size,
              class: moon.class,
              velocity: moon.velocity,
            }
          })
        })
        if (planet.hasPort) {
          newSprites.push({
            id: planet.id,
            orbit: 1,
            type: 'SpaceStation',
            parent: parent,
            position: {
              x: planet.orbit * 80 + 150,
              y: -50
            },
            metaData: {
              name: planet.station.name,
              size: planet.station.size,
              inventory: planet.station.inventory,
              price: planet.station.price
            }
          })
        }
      })
      this.sprites = newSprites
      //add ships
    },
    generateSpriteList() {

    },
    addSprite (type, metadata) {

    }
  }
})
