import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./components/UserContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </UserProvider>
  </React.StrictMode>
);
