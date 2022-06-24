import { defineStore } from 'pinia'
import { ethers } from "ethers"
import availableNetworks from "../../libraries/galactic/availableNetworks"
import supportedNetworks from "../../libraries/galactic/supportedNetworks"

import AvatarArtifact from '../../../evm/contract-artifacts/AvatarControls.json'

// useTaco is a placeholder
// useXxxx is a naming convention
export const useWeb3 = defineStore('web3', {
  state: () => {
    return {
      hasWallet: false,
      signer: null,
      signerAddress: '',
      provider: null,
      supportedNetworks: supportedNetworks,
      availableNetworks: availableNetworks,
      block: null
    }
  },
  actions: {
    async connect() {
      try {
        this.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        this.hasWallet = true
        await this.provider.send("eth_requestAccounts", [])
        console.log("provder found")

        await this.getSigner()

        const avatarContract = new ethers.Contract('0x8f1dC434E3D13f294B8FDe928B6235156a310239', AvatarArtifact.abi, this.signer)
        avatarContract.connect(this.signer)
        this.avatarCount = await avatarContract.getAvatarCount()
        console.log("avatar count: ", this.avatarCount)
        const myAvatar = await avatarContract.getMyAvatarName()
        console.log("my avatar is", myAvatar)
      } catch (e:any) {
        console.log(e.message)
        return
      }
    },
    async getSigner() {
      try {
        this.signer = await this.provider.getSigner()
        this.signerAddress = await this.signer.getAddress()
        console.log('signer is ', this.signerAddress)
      } catch (e:any) {
        this.log(e.message)
        return
      }
    },
  }
})
