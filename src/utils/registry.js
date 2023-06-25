import * as nearApiJs from 'near-api-js'
import { config } from '../state/config'

const {
    DID_REGISTRY_CONTRACT
} = config

class Registry {

    constructor(){}

    async initiateRegistryContract(account) {   
        console.log('account registry', account) 
        // initiate the contract so its associated with this current account and exposing all the methods
        let registryContract = new nearApiJs.Contract(account, DID_REGISTRY_CONTRACT, {
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
          // Change methods can modify the state. But you don't receive the returned value when called.
          changeMethods: [
              'init',
              'addAdmin',
              'removeAdmin',
              'changeVerificationStatus',
              'adjustKeyAllowance',
              'addVerifier',
              'removeVerifier',
              'addRole',
              'removeRole',
              'storeAlias',
              'deleteAlias',
              'putDID',
              'deleteDID',
              'changeTier',
              'storeSchema',
              'deleteSchema',
              'storeDefinition',
              'deleteDefinition',
              'storeTile',
              'deleteTile'
          ],
      })
        return registryContract
    }
    
}

export const registry = new Registry()