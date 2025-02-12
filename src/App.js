import "error-polyfill";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";
import {  ThemeProvider } from '@mui/material/styles';
import { registry } from './utils/registry'
import { proof } from './utils/proof'
import { connect, keyStores } from 'near-api-js'

//PROOF IMPORTS
import DefaultTheme from "./components/proof/theme/theme";
import Footer from "./components/proof/Footer/footer";
import Header from "./components/proof/Header/header"; 
import Home from "./components/proof/Home/home"; 
import Profile from './components/proof/profile/profile'
import CreateItem from "./components/proof/Create/createitem"; 
import CreateChecklist
 from "./components/proof/Create/createchecklist";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { NetworkId, signInContractId, Widgets } from "./data/widgets";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { appStore, onAppMount } from './state/app'
import { ceramic } from "./utils/ceramic";
import { lit } from "./utils/lit";
import { config } from "./state/config"

import Grid from "@mui/material/Grid"


import AuthCallbackHandler from "./pages/AuthCallbackHandler";
import Big from "big.js";
import CreateAccount from "./pages/CreateAccount";
import FlagsPage from "./pages/FlagsPage";
import NavigationWrapper from "./components/navigation/org/NavigationWrapper";
import SignIn from "./pages/SignIn";
import { Toaster } from "sonner";
import { SignInButton } from "./components/navigation/SignInButton";
import VerifyEmail from "./pages/VerifyEmail";
import ViewPage from "./pages/ViewPage";
import { setupFastAuth } from "./lib/selector/setup";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupWalletSelector } from "@near-wallet-selector/core";
import {
  useAccount,
  useInitNear,
  useNear,
  utils,
  EthersProviderContext,
} from "near-social-vm";
import { useEthersProviderContext } from "./data/web3";
import styled from "styled-components";
import { useFlags } from "./utils/flags";
import {
  init as initializeSegment,
  recordWalletConnect,
  reset,
} from "./utils/analytics";
import { setupKeypom } from "keypom-js";
import { KEYPOM_OPTIONS } from "./utils/keypom-options";

const StyledApp = styled.div`
  @media (max-width: 991px) {
    padding-bottom: 40px;
  }
`;

export const refreshAllowanceObj = {};

const {
  networkId,
  nodeUrl,
  walletUrl,
  helperUrl,
  explorerUrl
} = config

const appKeyStore = new keyStores.BrowserLocalStorageKeyStore()

const connectionConfig = {
  networkId: networkId,
  keyStore: appKeyStore,
  nodeUrl: nodeUrl,
  walletUrl: walletUrl,
  helperUrl: helperUrl,
  explorerUrl: explorerUrl,
  }


const nearConnection = await connect(connectionConfig);
console.log('nearConnection', nearConnection)

function App(props) {
  const [connected, setConnected] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState(null);
  const [walletModal, setWalletModal] = useState(null);
  const [widgetSrc, setWidgetSrc] = useState(null);
  const [flags, setFlags] = useFlags();
  const [encryptedString, setEncryptedString] = useState()
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState()
  const ethersProviderContext = useEthersProviderContext();

  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const accountId = account.accountId;

  const { state, dispatch, update } = useContext(appStore)

//   // initialize global app settings
//   const onMount = () => {
//     dispatch(onAppMount())
// }

// useEffect(onMount, [])

 useEffect(() => {
  async function connectLit(){
  await lit.connect()
  }
  connectLit().then((res) => {
    
  })
 })

  useEffect(() => {
    async function encryptSeed(){
      let result = await lit.encrypt("My seed")
      console.log('encrypt result', result)
      setEncryptedString(result.encryptedString)
      setEncryptedSymmetricKey(result.encryptedSymmetricKey)
    }
    encryptSeed().then((res) => {
      
    })
  }, [])

  useEffect(() => {
    async function decryptSeed(encryptedString, encryptedSymmetricKey){
      let result = await lit.decrypt(encryptedString, encryptedSymmetricKey)
      console.log('decrypt result', result)
    }
    
    if(encryptedString && encryptedSymmetricKey){
      decryptSeed(encryptedString, encryptedSymmetricKey).then((res) => {})
    }
  }, [encryptedString, encryptedSymmetricKey])

  useEffect(() => {
    async function fetchCeramic(){
      if(encryptedSymmetricKey) {
        const ceramicClient = await ceramic.getUserCeramic(encryptedSymmetricKey)
        console.log('ceramic client', ceramicClient)
        update('app', {ceramicClient: ceramicClient.ceramic, compose: ceramicClient.compose})
      }
    }
    fetchCeramic().then((res) => {})
  }, [encryptedSymmetricKey])
 
  initializeSegment();

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
        walletConnectCallback: recordWalletConnect,
        selector: setupWalletSelector({
          network: NetworkId,
          modules: [
            setupNearWallet(),
            setupMyNearWallet(),
            setupFastAuth({
              networkId: NetworkId,
              signInContractId,
              relayerUrl:
                NetworkId === "testnet"
                  ? "http://34.70.226.83:3030/relay"
                  : "https://near-relayer-mainnet.api.pagoda.co/relay",
            }),
            setupKeypom({
              trialBaseUrl:
                NetworkId == "testnet"
                  ? "https://test.near.org/#trial-url/"
                  : "https://near.org/#trial-url/",
              networkId: NetworkId,
              trialSplitDelim: "/",
              signInContractId,
              modalOptions: KEYPOM_OPTIONS(NetworkId),
            }),
          ],
        }),
      });
  }, [initNear]);

  useEffect(() => {
    if(account){
      update('app', {account, accountId: account.accountId})

    }
  }, [account])

  useEffect(() => {
    if(nearConnection && account){
    async function fetchContracts() {
      let thisAccount = await nearConnection.account(account.accountId);
      console.log('account hereio', thisAccount)
      const registryContract = await registry.initiateRegistryContract(thisAccount)
      console.log('registryContract hereio', registryContract)
      const proofContract = await proof.initProofContract(thisAccount)
      console.log('proofcontract', proofContract)
      update('app', {registryContract, proofContract})
    }

    fetchContracts().then((res) => {
    })
  }
  }, [nearConnection, account])

console.log('state here', state)
  useEffect(() => {
    async function executeThisQuery(){
      let result = await ceramic.compose.executeQuery(`
        query {
          viewer {
            id
          }
        }
      `)
      console.log('result', result)
    }
    executeThisQuery().then((res) => {})
  }, [])

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector) => {
      setWalletModal(
        setupModal(selector, { contractId: near.config.contractName })
      );
    });
  }, [near]);

  

  const requestSignInWithWallet = useCallback(
    (e) => {
      e && e.preventDefault();
      walletModal.show();
      return false;
    },
    [walletModal]
  );

  const requestSignIn = () => {
    window.location.href = "/signin";
  };

  const logOut = useCallback(async () => {
    if (!near) { return; }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
    reset();
    localStorage.removeItem("accountId");
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert("You're out of access key allowance. Need sign in again to refresh it");
    await logOut();
    requestSignIn();
  }, [logOut, requestSignIn]);
  refreshAllowanceObj.refreshAllowance = refreshAllowance;

  useEffect(() => {
    if (!near) { return; }
    setSignedIn(!!accountId);
    setSignedAccountId(accountId);
    setConnected(true);
  }, [near, accountId]);

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance
        ? Big(account.storageBalance.available).div(utils.StorageCostPerByte)
        : Big(0)
    );
  }, [account]);

  useEffect(() => {
    if (navigator.userAgent !== "ReactSnap") {
      const pageFlashPrevent = document.getElementById("page-flash-prevent");
      if (pageFlashPrevent) {
        pageFlashPrevent.remove();
      }
    }
  }, []);

  const passProps = {
    refreshAllowance: () => refreshAllowance(),
    setWidgetSrc,
    signedAccountId,
    signedIn,
    connected,
    availableStorage,
    widgetSrc,
    logOut,
    requestSignIn,
    requestSignInWithWallet,
    widgets: Widgets,
    flags,
    setFlags,
  };

  return (
    <>
      <Header {...passProps}></Header>
      <EthersProviderContext.Provider value={ethersProviderContext}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            {/* Base Route */}
            <Route path={"/"} exact={true}>
              {signedIn ? (
                <Grid container alignItems="center" justifyContent="space-between" style={{padding: '10px'}}>
                  <Home />
                </Grid>
                
              ) : (
                <>
                  <NavigationWrapper {...passProps} />
                  <CreateAccount {...passProps} />
                  <SignInButton {...passProps}></SignInButton>
                </>
              )
              }
            </Route>
            <Route path={"/create-checklist"} exact={true}>
              {signedIn ? (
                <CreateChecklist />
              ) : (
                <>
                  <NavigationWrapper {...passProps} />
                  <CreateAccount {...passProps} />
                  <SignInButton {...passProps}></SignInButton>
                </>
              )
              }
            </Route>
            <Route path={"/profile"} exact={true}>
              {signedIn ? (
                <Profile />
              ) : (
                <>
                  <NavigationWrapper {...passProps} />
                  <CreateAccount {...passProps} />
                  <SignInButton {...passProps}></SignInButton>
                </>
              )
              }
            </Route>
            <Route path={"/create-item"} exact={true}>
              {signedIn ? (
                <CreateItem />
              ) : (
                <>
                  <NavigationWrapper {...passProps} />
                  <CreateAccount {...passProps} />
                  <SignInButton {...passProps}></SignInButton>
                </>
              )
              }
            </Route>
            {/* Profile Page */}
            <Route path={"/profile"} exact={true}
                   render={() => 
                <>
                </>
              } />

            {/* FastAuth Signup */}
            <Route path={"/signup"}>
              <NavigationWrapper {...passProps} />
              <CreateAccount {...passProps} />
              <SignInButton {...passProps}></SignInButton>
            </Route>

            {/* FastAuth & Wallet Login */}
            <Route
              path={"/signin"}
              render={() => signedIn ?
                <Redirect to="/" />
                :
                <>
                  <NavigationWrapper {...passProps} />
                  <SignIn {...passProps} />
                </>
              }
            />

            {/* FastAuth Verify Email */}
            <Route path={"/verify-email"}>
              <NavigationWrapper {...passProps} />
              <VerifyEmail {...passProps} />
            </Route>

            {/* FastAuth Callback */}
            <Route path={"/auth-callback"}>
              <NavigationWrapper {...passProps} />
              <AuthCallbackHandler {...passProps} />
            </Route>

            {/* Useful for development */}
            <Route path={"/flags"} exact={true}>
              <NavigationWrapper {...passProps} />
              <FlagsPage {...passProps} />
            </Route>

          </Switch>

          {/* https://sonner.emilkowal.ski */}
        
        </BrowserRouter>
      </EthersProviderContext.Provider>
      { signedIn? <Footer></Footer> : <></> }
      </>
  );
}

export default App;
