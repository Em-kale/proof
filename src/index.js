import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import {  ThemeProvider } from '@mui/material/styles';

//PROOF IMPORTS
import DefaultTheme from "./components/proof/theme/theme";
import Footer from "./components/proof/Footer/footer";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
<ThemeProvider theme={DefaultTheme}>
    <App />
    <Footer></Footer>
</ThemeProvider>);
