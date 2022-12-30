const networks =  {
  '1337': {
    name: 'Localhost',
    shortName: 'Localhost',
    description: '',
    id: '1337',
    hexId: '0x539',
    currency: {
      name: 'DEV',
      symbol: 'DEV',
      decimals: 18
    },
    rpc: ['http://127.0.0.1:8545/'],
    explorer: [],
  },
  '1': {
    name: 'Ethereum Main Net',
    shortName: 'Ethereum',
    description: '',
    id: '1',
    hexId: '0x1',
    currency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: ['https://mainnet.infura.io/v3/'],
    explorer: ['https://ropsten.etherscan.io']
  },
  '2': {
    name: 'Deprecated Morden Testnet',
    shortName: 'Deprecated',
    description: '',
    id: '2',
    hexId: '0x2',
    currency: {
      name: 'Deprecated',
      symbol: 'ETH',
      decimals:18
    },
    rpc: [''],
    explorer: ['']
  },
  '3': {
    name: 'Deprecated Ropsten Testnet',
    shortName: 'Ropsten',
    description: '',
    id: '3',
    hexId: '0x3',
    currency: {
      name: 'Ropsten Ether',
      symbol: 'ETH',
      decimals:18
    },
    rpc: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    explorer: ['https://ropsten.etherscan.io']
  },
  '4': {
    name: 'Ethereum Rinkeby Testnet',
    shortName: 'Rinkeby',
    description: '',
    id: '4',
    hexId: '0x4',
    currency: {
      name: 'Rinkeby Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    explorer:['https://rinkeby.etherscan.io']
  },
  '28': {
    name: 'Boba Rinkeby Testnet',
    shortName: 'Boba',
    description: '',
    id: '28',
    hexId: '0x1C',
    currency: {
      name: 'Boba Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: ['https://rinkeby.boba.network'],
    explorer: ['https://blockexplorer.rinkeby.boba.network']
  },
  '42': {
    name: 'Ethereum Kovan Testnet',
    shortName: 'Kovan',
    description: '',
    id: '42',
    hexId: '0x2A',
    currency: {
      name: 'Kovan Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: ['https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    explorer: ['https://kovan.etherscan.io']
  },
  '61': {
    name: 'Ethereum Classic',
    shortName: 'Classic',
    description: '',
    id: '61',
    hexId: '0x3D',
    currency: {
      name: 'ETH Classic',
      symbol: 'ETC',
      decimals: 18
    },
    rpc: ['https://www.ethercluster.com/etc'],
    explorer: ['https://blockscout.com/etc/mainnet/']
  },
  '69': {
    name: 'Optimism Kovan Testnet',
    shortName: 'Optimism',
    description: '',
    id: '69',
    hexId: '0x45',
    currency: {
      name: 'Optimism Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: ['https://kovan.optimism.io'],
    explorer:['https://kovan-optimistic.etherscan.io']
  },
  '97': {
    name: 'Binance Smartchain Testnet',
    shortName: 'Binance',
    description: '',
    id: '97',
    hexId: '0x61',
    currency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpc: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    explorer:['https://testnet.bscscan.com']
  },
  '1284': {
    name: 'Moonbeam',
    shortName: 'Moonbeam',
    description: '',
    id: '1284',
    hexId: '0x504',
    currency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18
    },
    rpc: ['https://rpc.api.moonbeam.network'],
    explorer:['https://moonscan.io']
  },
  '1285': {
    name: 'Moonriver Alpha',
    shortName: 'Moonriver',
    description: '',
    id: '1285',
    hexId: '0x505',
    currency: {
      name: 'MOVR',
      symbol: 'MOVR',
      decimals: 18
    },
    rpc: ['https://rpc.api.moonriver.moonbeam.network'],
    explorer:['https://moonriver.moonscan.io']
  },
  '1287': {
    name: 'Moonbase Alpha',
    shortName: 'Moonbase',
    description: '',
    id: '1287',
    hexId: '0x507',
    currency: {
      name: 'DEV MOVR',
      symbol: 'DEV',
      decimals: 18
    },
    rpc: ['https://rpc.api.moonbase.moonbeam.network'],
    explorer:['https://moonbase.moonscan.io']
  },
  '1297': {
    name: 'Bobabase Test Network',
    shortName: 'Bobabase',
    description: '',
    id: '1297',
    hexId: '0x511',
    currency: {
      name: 'GLMRDEV',
      symbol: 'DEV',
      decimals: 18
    },
    rpc: ['https://bobabase.boba.network'],
    explorer: ['https://blockexplorer.bobabase.boba.network']
  },
  '4447': {
    name: 'Truffle Development Network',
    shortName: 'Truffle',
    description: '',
    id: '4447',
    hexId: '0x115F',
    currency: {
      name: 'Truffle Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: [''],
    explorer: ['']
  },
  '5777': {
    name: 'Ganache Development Network',
    shortName: 'Ganache',
    description: '',
    id: '5777',
    hexId: '0x1691',
    currency: {
      name: 'Ganache Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: [''],
    explorer: ['']
  },
  '80001': {
    name: 'Polygon Mumbai Testnet',
    shortName: 'Mumbai',
    description: 'Proof-of-Stake',
    id: '80001',
    hexId: '0x13881',
    currency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpc: ['https://rpc-mumbai.maticvigil.com/'],
    explorer: ['https://mumbai.polygonscan.com']
  },
  '421611': {
    name: 'Arbitrum Testnet',
    shortName: 'Arbitrum',
    description: '',
    id: '421611',
    hexId: '0x66EEB',
    currency: {
      name: 'Arbitrum Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: ['https://rinkeby.arbitrum.io/rpc'],
    explorer: ['https://testnet.arbiscan.io']
  },
  '1666700000': {
    name: 'Harmony One Testnet',
    shortName: 'Harmony',
    description: '',
    id: '1666700000',
    hexId: '0x6357D2E0',
    currency: {
      name: 'Harmony',
      symbol: 'ONE',
      decimals: 18
    },
    rpc: ['https://api.s0.b.hmny.io/'],
    explorer: ['https://explorer.pops.one']
  },
}

export default networks