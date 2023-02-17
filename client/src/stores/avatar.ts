import { defineStore } from 'pinia'
import { useEVM } from "./evm"
import networkDeployments from "../../libraries/galactic/networkDeployments"
import AvatarArtifact from '../../../evm/contract-artifacts/AvatarControls.json'
import { useContract } from './composables/contract'

//todo store data in chain specific storage

export const useAvatar = defineStore('avatar', {
  state: () => {
    return {
      contract: useContract('AvatarControls', AvatarArtifact.abi),
      evm: useEVM() as any,
      isLoaded: false,
      isLoading: false,
      knownAvatars: {} as any,
      addressToName: {} as any,
      chainstate: {
        myAvatarId: null,
        myAvatarName: null,
        avatarCount: null as number | null,
        haveAvatar: false as boolean
      },
    }
  },
  getters: {
    avatarContractAddress():string {
      if (this.evm.isSuppportedNetwork) {
        return networkDeployments[this.evm.chainId]['AvatarControls']
      }
      return ''
    },
    isConnected():boolean {
      return this.contract.isConnected
    },
    haveAvatar():boolean {
      return this.chainstate.haveAvatar
    },
    me():object {
      return {
        name: this.chainstate.myAvatarName,
        address: this.evm.signerAddress,
        id: this.chainstate.myAvatarId
      }
    }
  },
  actions: {
    async connect() {
    },

    //controls

    async createAvatar(
      name:string,
      callbackSuccess:Function = ()=>{},
      callbackFailed:Function = ()=>{},
      callbackRejected:Function = ()=>{},
    ) {
      this.contract.call(
        'createAvatar',
        [name],
        callbackSuccess,
        callbackFailed,
        callbackRejected
      )
    },

    //setters

    async getAll() {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      await Promise.all([
        this.getAvatarCount(),
        this.getMyAvatarName(),
        this.getMyAvatarId(),
        this.getHaveAvatar()
      ])
      this.isLoaded = true
      this.isLoading = false
    },

    async preloadForAddresses(addresses:[]) {
      for(let n = 0; n < addresses.length; n++) {
        this.addressToName[addresses[n]] = await this.getAvatarNameByAddress(addresses[n])
      }
    },

    async getAllAvatars() {
      for (let n = 0; n < this.chainstate.avatarCount; n++) {
        console.log(n)
        this.getAvatarNameById(n)
      }
    },

    async getAvatarCount() {
      this.chainstate.avatarCount = await this.contract.read(
        'getAvatarCount'
      )
    },
    async getMyAvatarName() {
      this.chainstate.myAvatarName = await this.contract.read(
        'getMyAvatarName'
      )
    },
    async getMyAvatarId(){
      this.chainstate.myAvatarId = await this.contract.read(
        'getMyAvatarId'
      )
    },
    async getHaveAvatar(){
      this.chainstate.haveAvatar = await this.contract.read(
        'haveAvatar'
      )
    },

    //getters

    async getAvatarIdByAddress(address:string) {
      const avatar = await this.contract.read(
        'getAvatarIdByAddress',
        [address]
      )
      return avatar
    },
    async getAvatarNameById(id:number) {
      const avatar = await this.contract.read(
        'getAvatarNameById',
        [id]
      )
      this.knownAvatars[id] = avatar
      return avatar
    },
    async getAvatarNameByAddress(address:string) {
      const avatarName = await this.contract.read(
        'getAvatarNameByAddress',
        [address]
      )
      return avatarName
    },
    async hasAvatar(address:string) {
      const hasAvatar = await this.contract.read(
        'hasAvatar',
        [address]
      )
      return hasAvatar
    },

  }
})
