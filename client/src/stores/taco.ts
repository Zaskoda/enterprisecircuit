import { defineStore } from 'pinia'
import { ethers, BigNumber, providers } from "ethers"

// useTaco is a placeholder
// useXxxx is a naming convention
export const useTaco = defineStore('taco', {
  state: () => {
    return {
      hasWallet: false
    }
  },
  actions: {
    async connect() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        this.hasWallet = true
        console.log("provder found")
      } catch (e:any) {
        console.log(e.message)
        return
      }
    }
  }
})
