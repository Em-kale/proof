// import composeDB client
import { ComposeClient } from "@composedb/client";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver as getKeyResolver } from "key-did-resolver";
import * as nearApiJs from "near-api-js";
import { get, set } from "./storage";

// import compiled composites
import { definition } from "../models/runtime-composite";
import { lit } from "./lit";

import { config } from "../state/config";

const axios = require('axios').default

const { CERAMIC_API_URL, 
  PROOF_SEED, 
  AUTH_TOKEN, 
  TOKEN_CALL, 
  FUNDING_SEED_CALL, 
  FUNDING_CONTRACT_NAME,
  PROOF_CONTRACT_NAME,
  DID_REGISTRY_CONTRACT,
  networkId,
  nodeUrl,
  walletUrl,
  helperUrl,
  explorerUrl,
} = config;

export const {
  keyStores: { InMemoryKeyStore, BrowserLocalStorageKeyStore },
  Near,
  Account,
  Contract,
  KeyPair,
  InMemorySigner,
  connect,
  utils: {
    format: { parseNearAmount },
  },
} = nearApiJs;

class Client {
  compose = new ComposeClient({ ceramic: CERAMIC_API_URL, definition });

  async getUserCeramic(encryptedSymmetricKey) {
    let keyPair = KeyPair.fromRandom('ed25519')
    let result = await lit.encrypt(keyPair.secretKey)
    
    let seed = Buffer.from(encryptedSymmetricKey.slice(0, 32));
    console.log('seed', seed)
    const ceramic = new CeramicClient(CERAMIC_API_URL);
    const provider = new Ed25519Provider(seed);
    const did = new DID({
      provider,
      resolver: getKeyResolver(),
    });
    await did.authenticate();
    ceramic.did = did;
    this.compose.setDID(did)
    return {
      ceramic: ceramic,
      compose: this.compose
    }
  }

  async useFundingAccountForRegistry(accountId) { 
    let token = await axios.post(TOKEN_CALL, 
      {
      accountId: accountId
      }    
    )
    set(AUTH_TOKEN, token.data.token)
    let authToken = get(AUTH_TOKEN, [])
    let retrieveSeed = await axios.post(FUNDING_SEED_CALL, {
      // ...data
    },{
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    })

    // Step 1:  get the keypair from the funding account's full access private key
    let keyPair = KeyPair.fromString(retrieveSeed.data.seed)
 
    // Step 2:  load up an inMemorySigner using the keyPair for the account
    let signer = await InMemorySigner.fromKeyPair(networkId, DID_REGISTRY_CONTRACT, keyPair)

    // Step 3:  create a connection to the network using the signer's keystore and default config for testnet
    //const myKeyStore = new BrowserLocalStorageKeyStore();

    const connectionConfig = {
        networkId: networkId,
        keyStore: signer.keyStore,
        nodeUrl: nodeUrl,
        walletUrl: walletUrl,
        helperUrl: helperUrl,
        explorerUrl: explorerUrl,
      }

    const near = await connect(connectionConfig)

    // Step 4:  get the account object of the currentAccount.  At this point, we should have full control over the account.
    let account = new Account(near.connection, DID_REGISTRY_CONTRACT)
   
    // initiate the contract so its associated with this current account and exposing all the methods
    let contract = new Contract(account, DID_REGISTRY_CONTRACT, {
      viewMethods: [
        'getDID',
        'hasDID',
        'getAdmins',
        'getSuperAdmin',
        'retrieveAlias',
        'getType',
        'hasAlias',
        'getVerificationStatus',
        'getTier',
        'hasSchema',
        'retrieveSchema',
        'hasDefinition',
        'retrieveDefinition',
        'hasTile',
        'retrieveTile'
      ],
      changeMethods: [
        'putDID', 
        'deleteDID', 
        'adjustKeyAllowance', 
        'storeAlias',
        'storeSchema',
        'deleteSchema',
        'storeDefinition',
        'deleteDefinition',
        'storeTile',
        'deleteTile'
      ]
    })

    return {
      contract: contract,
      pubKey: keyPair.getPublicKey().toString().split(':')[1]
    }
  }

  async useFundingAccountForProof(accountId) { 
    let token = await axios.post(TOKEN_CALL, 
      {
      accountId: accountId
      }    
    )
    set(AUTH_TOKEN, token.data.token)
    let authToken = get(AUTH_TOKEN, [])
    let retrieveSeed = await axios.post(FUNDING_SEED_CALL, {
      // ...data
    },{
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    })

    // Step 1:  get the keypair from the funding account's full access private key
    let keyPair = KeyPair.fromString(retrieveSeed.data.seed)
 
    // Step 2:  load up an inMemorySigner using the keyPair for the account
    let signer = await InMemorySigner.fromKeyPair(networkId, PROOF_CONTRACT_NAME, keyPair)

    // Step 3:  create a connection to the network using the signer's keystore and default config for testnet
    //const myKeyStore = new BrowserLocalStorageKeyStore();

    const connectionConfig = {
        networkId: networkId,
        keyStore: signer.keyStore,
        nodeUrl: nodeUrl,
        walletUrl: walletUrl,
        helperUrl: helperUrl,
        explorerUrl: explorerUrl,
      }

    const near = await connect(connectionConfig)

    // Step 4:  get the account object of the currentAccount.  At this point, we should have full control over the account.
    let account = new Account(near.connection, PROOF_CONTRACT_NAME)
   
    // initiate the contract so its associated with this current account and exposing all the methods
    let contract = new Contract(account, PROOF_CONTRACT_NAME, {
      viewMethods: [
      ],
      changeMethods: [
        'assignChecklist', 
        'createChecklist', 
        'unassignChecklist'
      ]
    })

    return {
      contract: contract,
      pubKey: keyPair.getPublicKey().toString().split(':')[1]
    }
  }
}

export const ceramic = new Client();
