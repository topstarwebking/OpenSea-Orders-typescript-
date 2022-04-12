export default {
    network: process.env.REACT_APP_MODE === 'test' ? 'testnet' : 'mainnet',
    serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL || '',
    appId: process.env.REACT_APP_MORALIS_APP_ID || '',
    openseaAPIKey: process.env.REACT_APP_OPENSEA_API_KEY || '',
    infura_key: process.env.REACT_APP_INFURA_KEY || '',
    infura_secret_key: process.env.REACT_APP_INFURA_SECRET_KEY || ''
}