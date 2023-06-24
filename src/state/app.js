import { State } from '../utils/state'
import * as nearAPI from 'near-api-js'
import { get } from '../utils/storage'
import { registry } from '../utils/registry'
import { ceramic } from '../utils/ceramic'
import { config } from './config'
import { lit } from '../utils/lit'

export const {
    networkId,
    nodeUrl,
    walletUrl,
    helperUrl,
    explorerUrl
} = config

const initialState = {
	app: {
        mounted: false,
        near: null,
        registryContract: null,
        fundingContract: null,
        ceramicClient: null,
        superAdmin: null,
        admins: [],
    },
    user: {
        userInitialized: false,
        did: null,
        account: null,
        accountId: null,
        signedIn: false,
        balance: null,
        wallet: null,
    }
}


export const { appStore, AppProvider } = State(initialState, 'app')

const { connect, keyStores } = nearAPI

export const onAppMount = () => async ({ update, getState, dispatch}) => {
   // let litResult = await lit.connect()
   // console.log('litresult', litResult)
    let state = getState()
    console.log('state at start app', state)
    update('app', { mounted: true })
    console.log('state after update', state)
    
    //const ceramicClient = await ceramic.getUserCeramic("My secret message")
    //console.log('ceramicClient', ceramicClient)

    //update('app', {ceramicClient})

    const appKeyStore = new keyStores.BrowserLocalStorageKeyStore()

    const connectionConfig = {
    networkId: networkId,
    keyStore: appKeyStore,
    nodeUrl: nodeUrl,
    walletUrl: walletUrl,
    helperUrl: helperUrl,
    explorerUrl: explorerUrl,
    }

    const near = await connect(connectionConfig);
   // const registryContract = await registry.initiateRegistryContract(account)
    
    update('app', {near})

}
