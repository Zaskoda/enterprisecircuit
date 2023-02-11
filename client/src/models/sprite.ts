export interface Orbit {
  parent: number,
  position: number,
  distance: number,
  velocity: number,
  period: number,
  offset: number,
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

  planetClassNames= [
    'Terrestrial', //0
    'Rocky',       //1
    'Oceanic',     //2
    'Desert',      //3
    'Ice',         //4
    'Volcanic',    //5
    'Gaseous',     //6
    'Ferrous',     //7
    'Lava',        //8
    'Swamp',       //9
  ]

  refid:string = ''

  index:number = 0

  type:string = ''

  orbit:Orbit = {
    parent: 0,
    position: 0,
    distance: 0,
    velocity: 0,
    period: 0,
    offset: 0,
  }

  position:Coords = {
    x: 0,
    y: 0
  }

  rotation:number = 0

  luminance:Luminance = {
    rotation: 0,
    intensity: 0.5
  }

  meta:any = {
    size: 1
  }

  owner:string = ''

  constructor(payload:any) {
    if (payload.hasOwnProperty('owner')) {
      this.owner = payload['owner']
      console.log('onwer: ' + this.owner)
    }
    if (payload.hasOwnProperty('type')) {
      this.type = payload['type']
      this.meta.id = payload['id']
      this.meta.name = payload['name']
      this.orbit.offset = payload['id'] % 1000
      //note that an id for a planet will be the same as its moons and station
      this.refid = payload['id'] + this.type + payload['type']
      switch (this.type) {
        case 'Star': {
          this.meta.size = payload['size']
          break
        }
        case 'Planet': {
          this.meta.size = payload['size']
          this.meta.class = payload['class']
          this.meta.className = this.planetClassNames[payload['class']]
          this.meta.rings = payload['rings']
          this.orbit.position = payload['orbit']
          this.orbit.velocity = payload['velocity']
          break
        }
        case 'Moon': {
          this.meta.size = payload['size']
          this.meta.class = payload['class']
          this.orbit.parent = payload['parent']
          this.orbit.position = payload['orbit']
          this.orbit.velocity = payload['velocity']
          this.refid += this.orbit.position = payload['orbit']
          break
        }
        case 'Station': {
          this.meta.size = payload['size']
          this.meta.inventory = payload['inventory']
          this.meta.price = payload['price']
          this.orbit.parent = payload['parent']
          break
        }
        case 'Ship': {
          this.orbit.parent = payload['parent']
          break
        }
      }
    }
  }

  getPortType () {
    let type = ''
    if (this.meta.inventory.equipment > 0) {
      type += 'S'
    } else if (this.meta.inventory.equipment < 0) {
      type += 'B'
    } else {
      type += '-'
    }

    if (this.meta.inventory.fuel > 0) {
      type += 'S'
    } else if (this.meta.inventory.fuel < 0) {
      type += 'B'
    } else {
      type += '-'
    }

    if (this.meta.inventory.organics > 0) {
      type += 'S'
    } else if (this.meta.inventory.organics < 0) {
      type += 'B'
    } else {
      type += '-'
    }
    return type
  }

  setIndex(index:number) {
    this.index = index
  }


}