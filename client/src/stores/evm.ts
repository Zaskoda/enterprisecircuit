import { defineStore } from 'pinia'
import { ethers } from "ethers"
import deployments from "../../libraries/galactic/networkDeployments"
import networks from "../../libraries/galactic/networkDetails"

export const useEVM = defineStore('wallet', {
  state: () => {
    return {
      isConnected: false,
      signer: null as ethers.Signer | null,
      signerAddress: null,
      provider: null as ethers.providers.Web3Provider | null,
      chain: null as any,
      chainId: null as number | null,
      block: null,
      switchingNetwork: false,
      networks: networks,
      deployments: deployments,
      balance: 0.0 as number
    }
  },
  getters: {
    chainName():string {
      if (this.chainId == null) {
        return 'no network'
      } else if (this.networks[this.chainId]) {
        return this.networks[this.chainId].name
      }
      return 'unknown network'
    },
    suppportedNetwork():boolean {
      if (this.deployments[this.chainId]) {
        return true
      }
      return false
    },
    shortSigner():string {
      const length = this.signerAddress.length
      if (length >= 8) {
        return this.signerAddress.substring(0, 5) +
        '...' +
        this.signerAddress.substring(length - 3)
      }
      return this.signerAddress
    },
    currencyData():string {
      return this.networks[this.chainId].currency
    },
    facuets():string {
      return this.networks[this.chainId].faucets
    }
  },
  actions: {

    async connect() {

      await this.init()

      try {
        await this.provider.send("eth_requestAccounts", [])
      } catch (e:any) {
        console.log(e.message)
        return
      }

      try {
        await this.getSigner()
      } catch (e:any) {
        console.log(e.message)
        return
      }

      await this.getChainData()
      await this.getBalance()

      this.isConnected = true
    },

    async init() {
      try {
        this.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      } catch (e:any) {
        console.log(e.message)
        return
      }
    },

    async getBalance () {
      let balance = await this.provider.getBalance(this.signerAddress)
      balance = ethers.utils.formatEther(balance)
      this.balance = Math.round(balance * 1e4) / 1e4
    },

    async getChainData() {
      try {
        this.chain = await this.provider.getNetwork()
      } catch (e:any) {
        this.log(e.message)
        return
      }
      this.chainId = this.chain.chainId
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
      this.applyEvents()
      console.log('Signer Address: ', this.signerAddress)
    },

    applyEvents () {
      window.ethereum.removeAllListeners()
      window.ethereum.on('accountsChanged', async () => {
        console.log('account changed')
        this.signer = null
        this.signerAddress = null
        this.isConnected = false
        this.getSigner()
      })
      window.ethereum.on('connected', async () => {
        console.log('account re-connected')
        this.isConnected = true
        this.getSigner()
      })
      window.ethereum.on('disconnect', async () => {
        console.log('account disconnected')
        if (!this.switchingNetwork) {
          this.signer = null
          this.signerAddress = null
          this.isConnected = false
        }
      })
      window.ethereum.on('chainChanged', async () => {
        console.log('chain changed A')
        this.connect()
      })

      this.provider.removeAllListeners()
      this.provider.on("block", (blockNumber:Number) => {
        this.block = blockNumber
      })

      this.switchingNetwork = false
    },

    async switchNetwork(chainId:String) {
      this.switchingNetwork = true
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }]
        });
      } catch (e) {
        console.log('Error requesting network.', e.message)
        /*
        refactor to add any chain

        if (confirm('Polygon Mainnet was not found. Would you like us to try to add it?')) {
          let data = [{
            chainId: chainId,
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com/']
          }]
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: data
            });
          } catch (e) {
            console.log('Error requesting network.', e.message)
            store.alert = 'We were unable to add the network.'
          }
        }
        */
      }
      setTimeout(function(){ this.switchingNetwork = false }.bind(this), 500)
    },

    async getContract(address:string, abi:any) {
      const avatarContract =  await new ethers.Contract(address, abi, this.signer)
      return avatarContract
    }
  }
})
