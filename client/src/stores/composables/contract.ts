import { computed, watch, ref } from 'vue'
import { useEVM } from "../evm"
import { Contract } from 'ethers'
import networkDeployments from "../../../libraries/galactic/networkDeployments"

export function useContract(contractName:string, contractABI:any) {

  const evm = useEVM()
  let connectedChainId = ref(0)
  let contract:Contract

  const contractAddress = computed(() => {
    if (evm.isSuppportedNetwork) {
      return networkDeployments[evm.chainId][contractName]
    }
    return ''
  })

  const isConnected = computed(() => {
    return ((currentChainId.value == connectedChainId.value) && (evm.isSuppportedNetwork))
  })

  const currentChainId = computed(() => evm.chainId)

  async function connect() {
    if (!evm.isSuppportedNetwork) {
      return
    }
    try {
      contract = await evm.getContract(
        contractAddress.value,
        contractABI
      )
    } catch (e:any) {
      console.log(e.message)
      return
    }
    connectedChainId.value = currentChainId.value
    console.log(contractName + ' connected')
  }

  watch(currentChainId, () => {
    if ((!isConnected.value) && (evm.isSuppportedNetwork)) {
      connect()
    }
  })

  //todo: should return package with error codes
  async function readContract(contractMethod:string, params:any[] = []) {
    if (!isConnected.value) {
      return
    }
    try {
      const result = await contract[`${contractMethod}`](...params)
      return result
    } catch (e:any) {
      console.log('Error attempting: ' + contractMethod)
      console.log('Error: ', e.message)
    }
    return null
  }

  //todo: should return package with error codes
  async function callTransaction(contractMethod:string, params:any[], callback:Function = ()=>{}) {
    if (!isConnected.value) {
      return
    }
    try {
      const transaction = await contract[`${contractMethod}`](...params)
      const transactionReceipt = await transaction.wait()
      if (transactionReceipt.status !== 1) {
        alert('error problem thing happened')
      } else {
        callback()
      }
    } catch (e:any) {
      if (e.code == 'ACTION_REJECTED') {
        console.log('user cancelled')
      } else {
        console.log('Error: ', e)
      }
    }
  }

  if (evm.isSuppportedNetwork) {
    connect()
  }

  return {
    read: readContract,
    call: callTransaction,
    connect: connect,
    isConnected: isConnected,
    address: contractAddress
  }
}




