import { defineStore } from 'pinia'
import { ethers } from "ethers"
import { useEVM } from "./evm"
import networkDeployments from "../../libraries/galactic/networkDeployments"
import GalaxyArtifact from '../../../evm/contract-artifacts/Orbiter8.json'

interface System {
  id: string,
  name: string,
  starSize: number,
  birthtime: string,
  discoveredBy: string,
  neighbors: string[],
  planets: string[],
  logs: string[]
}

interface Ship {
  name: string,
  systemId: number,
  orbit: number,
  cargoLimit: number,
  equipment: number,
  fuel: number,
  organics: number
}

export const useGalaxy = defineStore('galaxy', {
  state: () => {
    return {
      galaxyContract: undefined as any,
      galaxyContractAddress: '',
      networkDeployments: networkDeployments,
      evm: useEVM() as any,
      connected: false,
      chainstate: {
        creditBalance: 0,
        systemCount: 0,
        shipLocation: 0,
        shipId: 0,
        ship: {} as Ship,
        systemData: {} as System,
        ships: [] as any[],
        planets: [] as any[],
        localPlanets: [] as any[]
      }
    }
  },
  actions: {
    async connect() {
      try {
        this.galaxyContractAddress = networkDeployments[this.evm.chainId]['Galaxy']
        console.log('Galaxy contract address is ', this.galaxyContractAddress)
      } catch (e:any) {
        console.log(e.message)
        return
      }
      try {
        this.galaxyContract = await this.evm.getContract(this.galaxyContractAddress, GalaxyArtifact.abi)
      } catch (e:any) {
        console.log(e.message)
        return
      }
      this.connected = true
    },

    async call(contractMethod:Function, params:any[], callback:Function = ()=>{}) {
      try {
        const transaction = await contractMethod(...params)
        const transactionReceipt = await transaction.wait()
        if (transactionReceipt.status !== 1) {
           alert('error problem thing happened')
        } else {
          callback()
          console.log('called back')
        }
      } catch (e:any) {
        if (e.code == 'ACTION_REJECTED') {
          console.log('user cancelled')
        } else {
          console.log('Error: ', e)
        }
      }
    },

    async sendChat(message:string) {
      this.call(
        this.galaxyContract.sendChat,
        [message]
      )
    },

    async renameStar(name:string) {
      this.call(
        this.galaxyContract.renameStar,
        [name]
      )
    },

    async renameMyShip(name:string) {
      this.call(
        this.galaxyContract.renameMyShip,
        [name]
      )
    },

    async renamePlanet(id:number, name:string) {
      this.call(
        this.galaxyContract.renamePlanet,
        [id, name]
      )
    },

    async claimPlanet(planetId:number, planetName:string) {

      this.call(
        this.galaxyContract.claimPlanet,
        [planetId, planetName]
      )
    },

    async buildStation(planetId:number, stationName:string) {
      this.call(
        this.galaxyContract.buildStation,
        [planetId, stationName]
      )
    },

    async renameMoon(planetId:number, moonId:number, name:string) {
      this.call(
        this.galaxyContract.renameMoon,
        [planetId, moonId, name]
      )
    },

    async renameStation(id:number, name:string) {
      this.call(
        this.galaxyContract.renameStation,
        [id, name]
      )
    },

    async addPortToStation(id:number) {
      this.call(
        this.galaxyContract.addPortToStation,
        [id]
      )
    },

    async tradeAtPort(planetId:number,equipment:number,fuel:number,organics:number) {
      this.call(
        this.galaxyContract.tradeAtPort,
        [planetId, equipment, fuel, organics]
      )
    },

    async addHoldsToShip(planetId:number,holds:number) {
      this.call(
        this.galaxyContract.addHoldsToShip,
        [planetId, holds]
      )
    },

    async moveToSystem(destinationSystemId:number) {
      this.call(
        this.galaxyContract.moveToSystem,
        [destinationSystemId]
      )
    },

    async launchShip(name:string) {
      this.call(
        this.galaxyContract.launchShip,
        [name]
      )
    },

    async read(contractMethod:Function, params:any[] = []) {
      try {
        const result = await contractMethod(...params)
        return result
      } catch (e:any) {
          console.log('Error: ', e.message)
      }
      return null
    },

    async getAll() {
      this.getSystemCount()
      this.getPlayerSystemData()
      this.myBalance()
      this.getMyShipLocation()
      this.getMyShipId()
      this.getMyShip()
    },

    async myBalance() {
      this.chainstate.creditBalance = await this.read(
        this.galaxyContract.myBalance
      )
    },

    async getShip(shipId:number) {
      this.chainstate.ships[shipId] = await this.read(
        this.galaxyContract.getShip,
        [shipId]
      )
    },

    async getPlanet(planetId:number) {
      this.chainstate.planets[planetId] = await this.read(
        this.galaxyContract.getPlanet,
        [planetId]
      )
    },

    async getLocalPlanet(orbitalId:number) {
      this.chainstate.localPlanets[orbitalId] = await this.read(
        this.galaxyContract.getLocalPlanet,
        [orbitalId]
      )
    },

    async getMoon(planetId:Number, moonId:Number) {
      let tempMoon = await this.read(
        this.galaxyContract.getMoon,
        [planetId, moonId]
      )
    },

    async getStation(planetId:number) {
      let tempStation = await this.read(
        this.galaxyContract.getStation,
        [planetId]
      )
    },

    async getSystemCount() {
      this.chainstate.systemCount = await this.read(
        this.galaxyContract.getSystemCount
      )
    },

    async getMyShipLocation() {
      this.chainstate.shipLocation = await this.read(
        this.galaxyContract.getMyShipLocation
      )
    },

    async getMyShipId() {
      this.chainstate.shipId = await this.read(
        this.galaxyContract.getMyShipId
      )
    },

    async getMyShip() {
      [
        this.chainstate.ship.name,
        this.chainstate.ship.systemId,
        this.chainstate.ship.orbit,
        this.chainstate.ship.cargoLimit,
        this.chainstate.ship.equipment,
        this.chainstate.ship.fuel,
        this.chainstate.ship.organics,
      ] = await this.read(
        this.galaxyContract.getMyShip
      )
    },

    async getPlayerSystemData() {
      [
        this.chainstate.systemData.id,
        this.chainstate.systemData.name,
        this.chainstate.systemData.starSize,
        this.chainstate.systemData.birthtime,
        this.chainstate.systemData.discoveredBy,
        this.chainstate.systemData.neighbors,
        this.chainstate.systemData.planets,
        this.chainstate.systemData.logs
       ] = await this.read(
        this.galaxyContract.getPlayerSystemData
      )
    },

    async getSystemName(systemId:number) {
      this.chainstate.creditBalance = await this.read(
        this.galaxyContract.getSystemName,
        [systemId]
      )
    },

  }
})
