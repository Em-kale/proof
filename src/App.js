import "error-polyfill";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";
import {  ThemeProvider } from '@mui/material/styles';

//PROOF IMPORTS
import DefaultTheme from "./components/proof/theme/theme";
import Footer from "./components/proof/Footer/footer";
import Header from "./components/proof/Header/header"; 
import Home from "./components/proof/Home/home"; 
import CreateItem from "./components/proof/Create/createitem"; 
import CreateChecklist
 from "./components/proof/Create/createchecklist";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { NetworkId, signInContractId, Widgets } from "./data/widgets";
import React, { useCallback, useEffect, useState } from "react";

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

function App(props) {
  const [connected, setConnected] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState(null);
  const [walletModal, setWalletModal] = useState(null);
  const [widgetSrc, setWidgetSrc] = useState(null);
  const [flags, setFlags] = useFlags();
  const ethersProviderContext = useEthersProviderContext();

  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const accountId = account.accountId;
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
                <Home />
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
      </>
  );
}

export default App;
