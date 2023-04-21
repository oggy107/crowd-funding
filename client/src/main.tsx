import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Web3Provider, NavProvider } from "./context";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Web3Provider>
            <NavProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </NavProvider>
        </Web3Provider>
    </React.StrictMode>
);
