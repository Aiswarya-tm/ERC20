import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'

const walletConnect = walletConnectModule()
const injected = injectedModule()

const INFURA_ID="b50045c73b264384ba7deaa44ce591cf"

export const onboard = Onboard({
  theme: 'dark',
  wallets: [injected,walletConnect],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
    }
  ],
  appMetadata: {
    name: 'Token Swap',
    // icon: myIcon, // svg string icon
    // logo: myLogo, // svg string logo
    description: 'Swap tokens for other tokens',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' }    ]
  },
//   apiKey: 'xxx387fb-bxx1-4xxc-a0x3-9d37e426xxxx',
 
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: false,
      minimal: true
    },
    mobile: {
      position: 'topRight',
      enabled: false,
      minimal: true
    }
  }
})
