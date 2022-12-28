import { defineStore } from 'pinia'
import { ethers } from "ethers"
import { useEVM } from "./evm"
import networkDeployments from "../../libraries/galactic/networkDeployments"
import AvatarArtifact from '../../../evm/contract-artifacts/AvatarControls.json'

export const useAvatar = defineStore('avatar', {
  state: () => {
    return {
      avatarContract: undefined as ethers.Contract | undefined,
      avatarContractAddress: '',
      networkDeployments: networkDeployments,
      evm: useEVM(),
      connected: false,
      chainstate: {
        myAvatarId: null,
        myAvatarName: null,
        avatarCount: null,
        haveAvatar: false
      }
    }
  },
  actions: {
    async connect() {
      try {
        this.avatarContractAddress = networkDeployments[this.evm.chainId]['AvatarControls']
        console.log('Avatar contract address is ', this.avatarContractAddress)
      } catch (e:any) {
        console.log(e.message)
        return
      }
      try {
        this.avatarContract = await this.evm.getContract(this.avatarContractAddress, AvatarArtifact.abi)
      } catch (e:any) {
        console.log(e.message)
        return
      }
      this.connected = true
    },
    async getAvatarCount() {
      try {
        this.chainstate.avatarCount = await this.avatarContract.getAvatarCount()
        console.log("avatarCount: ", this.chainstate.avatarCount)
      } catch (e:any) {
        console.log(e.message)
        return
      }
    },
    async getMyAvatarName() {
      try {
        this.chainstate.myAvatarName = await this.avatarContract.getMyAvatarName()
        console.log("myAvatar: ", this.chainstate.myAvatar)
      } catch (e:any) {
        console.log(e.message)
        return
      }
    },
    async getMyAvatarId(){
      this.chainstate.myAvatarId = await this.avatarContract.getMyAvatarId()
    },
    async haveAvatar(){
      this.chainstate.haveAvatar = await this.avatarContract.haveAvatar()
    },

    async getAll() {
      this.getAvatarCount()
      this.getMyAvatarName()
      this.getMyAvatarId()
      this.haveAvatar()
    },

    async createAvatar(name) {
      await this.avatarContract.createAvatar(name)
    },

    async getAvatarIdByAddress(address) {
      const avatar = await this.avatarContract.getAvatarIdByAddress(address)
      return avatar
    },
    async getAvatarNameById(id) {
      const avatar = await this.avatarContract.getAvatarNameById(id)
      return avatar
    },
    async getAvatarNameByAddress(address){
      const avatarName = await this.avatarContract.getAvatarNameByAddress(address)
      return avatarName
    },
    async hasAvatar(address){
      const hasAvatar = await this.avatarContract.hasAvatar(address)
      return hasAvatar
    },

  }
})
