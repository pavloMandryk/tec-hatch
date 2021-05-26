const ORG_ADDRESS = process.env.REACT_APP_ORG_ADDRESS.toLowerCase()
const CONNECTOR_TYPE = process.env.REACT_APP_CONNECTOR_TYPE
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
  ? process.env.REACT_APP_CHAIN_ID
  : 4
const DEFAULT_NETWORK = 'xdai'

const networks = {
  mainnet: {
    chainId: 1,
    ensRegistry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    name: 'Mainnet',
    type: 'main',
  },
  rinkeby: {
    chainId: 4,
    ensRegistry: '0x98df287b6c145399aaa709692c8d308357bc085d',
    name: 'Rinkeby',
    type: 'rinkeby',
    defaultEthNode: 'https://rinkeby.eth.aragon.network/',
    org: { address: ORG_ADDRESS, connectorType: CONNECTOR_TYPE },
  },
  xdai: {
    chainId: 100,
    ensRegistry: '0xaafca6b0c89521752e559650206d7c925fd0e530',
    name: 'xDai',
    type: 'xdai',
    defaultEthNode: 'https://xdai.1hive.org/',
    org: { address: ORG_ADDRESS, connectorType: CONNECTOR_TYPE },
    ipfsGateway: 'https://ipfs.eth.aragon.network/ipfs',
    eip3085: {
      chainId: '0x64',
      chainName: 'xDai',
      rpcUrls: ['https://xdai.1hive.org/'],
      iconUrls: [
        'https://gblobscdn.gitbook.com/spaces%2F-Lpi9AHj62wscNlQjI-l%2Favatar.png',
      ],
      nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
      blockExplorerUrls: ['https://blockscout.com/poa/xdai/'],
    },
  },
}

export const getNetworkType = (chainId = CHAIN_ID) => {
  chainId = String(chainId)

  switch (chainId) {
    case '1':
      return 'mainnet'
    case '3':
      return 'ropsten'
    case '4':
      return 'rinkeby'
    case '100':
      return 'xdai'
    default:
      return DEFAULT_NETWORK
  }
}

export const getNetwork = chainId => {
  return networks[getNetworkType(chainId)]
}

export const addEthereumChain = setCreatingChain => {
  const { eip3085 } = getNetwork()
  if (!eip3085) {
    return Promise.resolve(null) // Network is not custom
  }
  setCreatingChain(eip3085.chainName)
  return window?.ethereum?.request({
    method: 'wallet_addEthereumChain',
    params: [eip3085],
  })
}
