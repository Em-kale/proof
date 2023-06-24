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

const { CERAMIC_API_URL, PROOF_SEED } = config;

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
    return ceramic
    
  }
}

export const ceramic = new Client();
