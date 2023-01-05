import { defineStore } from 'pinia'
import { useEVM } from "./evm"
import networkDeployments from "../../libraries/galactic/networkDeployments"
import AvatarArtifact from '../../../evm/contract-artifacts/AvatarControls.json'

export const useAvatar = defineStore('avatar', {
  state: () => {
    return {
      avatarContract: undefined as any,
      avatarContractAddress: '',
      networkDeployments: networkDeployments,
      evm: useEVM() as any,
      connected: false,
      knownAvatars: {} as any,
      chainstate: {
        myAvatarId: null,
        myAvatarName: null,
        avatarCount: null as number | null,
        haveAvatar: false
      }
    }
  },
  actions: {
    async connect() {
      if (this.connected == true) {
        return
      }
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

    async createAvatar(name:string) {
      this.call(this.avatarContract.createAvatar, [name], this.getMyAvatarName)
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

    async getAvatarCount() {
      this.chainstate.avatarCount = await this.read(
        this.avatarContract.getAvatarCount
      )
    },
    async getMyAvatarName() {
      this.chainstate.myAvatarName = await this.read(
        this.avatarContract.getMyAvatarName
      )
    },
    async getMyAvatarId(){
      this.chainstate.myAvatarId = await this.read(
        this.avatarContract.getMyAvatarId
      )
    },
    async haveAvatar(){
      this.chainstate.haveAvatar = await this.read(
        this.avatarContract.haveAvatar
      )
    },

    async getAll() {
      await Promise.all([
        this.getAvatarCount(),
        this.getMyAvatarName(),
        this.getMyAvatarId(),
        this.haveAvatar()
      ])
    },


    async getAllAvatars() {
      for (let n = 0; n < this.chainstate.avatarCount; n++) {
        console.log(n)
        this.getAvatarNameById(n)
      }
    },


    async getAvatarIdByAddress(address:string) {
      const avatar = await this.read(
        this.avatarContract.getAvatarIdByAddress,
        [address]
      )
      return avatar
    },
    async getAvatarNameById(id:number) {
      const avatar = await this.read(
        this.avatarContract.getAvatarNameById,
        [id]
      )
      this.knownAvatars[id] = avatar
      return avatar
    },
    async getAvatarNameByAddress(address:string) {
      const avatarName = await this.read(
        this.avatarContract.getAvatarNameByAddress,
        [address]
      )
      return avatarName
    },
    async hasAvatar(address:string) {
      const hasAvatar = await this.read(
        this.avatarContract.hasAvatar,
        [address]
      )
      return hasAvatar
    },

  }
})
