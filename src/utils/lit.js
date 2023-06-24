import * as LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitJsSdk.LitNodeClient();
const chain = "ethereum"

class Lit {

    accessControlConditions = [
        {
          contractAddress: '',
          standardContractType: '',
          chain: 'ethereum',
          method: 'eth_getBalance',
          parameters: [':userAddress', 'latest'],
          returnValueTest: {
            comparator: '>=',
            value: '1000000000000',  // 0.000001 ETH
          },
        },
      ]
    
    async connect(){
        await client.connect()
        this.litNodeClient = client
    }

    async encrypt(message){
        if(!this.litNodeClient){
            await this.connect()
        }

        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message)
        const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
            accessControlConditions: this.accessControlConditions,
            symmetricKey,
            authSig,
            chain
        })

        return {
            encryptedString,
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        }
    }

    async decrypt(encryptedString, encryptedSymmetricKey){
        if(!this.litNodeClient){
            await this.connect()
        }

        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const symmetricKey = await this.litNodeClient.getEncryptionKey({
            accessControlConditions: this.accessControlConditions,
            toDecrypt: encryptedSymmetricKey,
            chain,
            authSig
        })

        const decryptedString = await LitJsSdk.decryptString(
            encryptedString,
            symmetricKey
        );

        return { decryptedString }
    }
}

export const lit = new Lit();