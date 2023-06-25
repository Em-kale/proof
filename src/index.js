import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from './state/app.js'
import { ThemeProvider } from "@mui/material/styles";

//PROOF IMPORTS
import DefaultTheme from "./components/proof/theme/theme";
const container = document.getElementById("root");

const root = createRoot(container);
root.render(
    <ThemeProvider theme={DefaultTheme}>
    <AppProvider>
        <App />
    </AppProvider>
    </ThemeProvider>
);
