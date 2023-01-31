export interface Orbit {
  parent: number,
  position: number,
  distance: number,
  velocity: number,
  period: number
}

export interface Coords {
  x: number,
  y: number
}

export interface Luminance {
  rotation: number,
  intensity: number
}

export class Sprite {

  type:string = ''

  orbit:Orbit = {
    parent: 0,
    position: 0,
    distance: 0,
    velocity: 0,
    period: 0,
  }

  position:Coords = {
    x: 0,
    y: 0
  }

  luminance:Luminance = {
    rotation: 0,
    intensity: 0.5
  }

  meta:any = {}

  constructor(payload:any) {
    if (payload.hasOwnProperty('type')) {
      this.type = payload['type']
      this.meta.id = payload['id']
      this.meta.name = payload['name']
      switch (this.type) {
        case 'Star': {
          this.meta.size = payload['size']
        }
        case 'Planet': {
          this.meta.size = payload['size']
          this.meta.class = payload['class']
          this.meta.rings = payload['rings']
          this.orbit.position = payload['orbit']
          this.orbit.velocity = payload['velocity']
        }
        case 'Moon': {
          this.meta.size = payload['size']
          this.meta.class = payload['class']
          this.orbit.parent = payload['parent']
          this.orbit.position = payload['orbit']
          this.orbit.velocity = payload['velocity']
        }
        case 'Station': {
          this.meta.size = payload['size']
          this.meta.inventory = payload['inventory']
          this.meta.price = payload['price']
          this.orbit.parent = payload['parent']
        }
        case 'Ship': {
          this.orbit.parent = payload['parent']
        }
      }
    }
  }


}