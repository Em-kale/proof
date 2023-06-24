import * as nearApiJs from 'near-api-js'
import { config } from '../state/config'

const {
    PROOF_CONTRACT_NAME
} = config

class Proof {

    constructor(){}

    async initProofContract(account) {
      
        const proofcontract = new nearApiJs.Contract(account, PROOF_CONTRACT_NAME, {
            viewMethods: [
            ],
            // Change methods can modify the state. But you don't receive the returned value when called.
            changeMethods: [
               'assignChecklist',
               'createChecklist',
               'unassignChecklist'
            ]
            });
            return proofcontract
    }
    
}

export const proof = new Proof()