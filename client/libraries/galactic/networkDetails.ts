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
    faucets: []
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
    explorer: ['https://ropsten.etherscan.io'],
    faucets: []
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
    explorer: [''],
    faucets: []
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
    explorer: ['https://ropsten.etherscan.io'],
    faucets: [{
      name: 'https://faucet.egorfine.com/',
      url: 'Egor Egorov\'s Facuet'
    }]
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
    explorer:['https://rinkeby.etherscan.io'],
    faucets: [{
      name: 'Chainlink\'s Faucet',
      url: 'https://faucets.chain.link/rinkeby'
    }, {
      name: 'Komputing\'s Faucet ',
      url: 'https://fauceth.komputing.org/'
    }]
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
    explorer: ['https://blockexplorer.rinkeby.boba.network'],
    faucets: []
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
    explorer: ['https://kovan.etherscan.io'],
    faucets: []
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
    explorer: ['https://blockscout.com/etc/mainnet/'],
    faucets: []
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
    explorer:['https://kovan-optimistic.etherscan.io'],
    faucets: []
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
    explorer:['https://testnet.bscscan.com'],
    faucets: [{
      name: 'Binance Faucet',
      url: 'https://testnet.binance.org/faucet-smart/'
    }]
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
    explorer:['https://moonscan.io'],
    faucets: [{
      name: 'Moonbeam App',
      url: 'https://moonbeam.network/networks/moonbeam/'
    }]
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
    explorer:['https://moonriver.moonscan.io'],
    faucets: [{
      name: 'Moonriver App',
      url: 'https://moonbeam.network/networks/moonriver/'
    }]
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
    explorer:['https://moonbase.moonscan.io'],
    faucets: [{
      name: 'Moonbase Faucet',
      url: 'https://apps.moonbeam.network/moonbase-alpha/faucet/'
    }]
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
    explorer: ['https://blockexplorer.bobabase.boba.network'],
    faucets: []
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
    explorer: [''],
    faucets: []
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
    explorer: [''],
    faucets: []
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
    explorer: ['https://mumbai.polygonscan.com'],
    faucets: [{
      name: 'Polygon\'s Faucet',
      url: 'https://faucet.polygon.technology/'
    }]
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
    rpc: ['https://goerli-rollup.arbitrum.io/rpc'],
    explorer: ['https://testnet.arbiscan.io'],
    faucets: []
  },
  '11155111': {
    name: 'Sepolia Testnet',
    shortName: 'Sepolia',
    description: 'Official Ethereum test network',
    id: '11155111',
    hexId: '0xAA36A7',
    currency: {
      name: 'Arbitrum Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpc: ['https://rpc.sepolia.org/'],
    explorer: ['https://sepolia.etherscan.io/'],
    faucets: [{
      name: 'Sepolia Faucet',
      url: 'https://sepolia-faucet.com/'
    }]
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
    explorer: ['https://explorer.pops.one'],
    faucets: []
  },
}

export default networks