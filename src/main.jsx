import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-want858m8ikygiwm.us.auth0.com"
    clientId="kvw89gmmLlAEqJ52PGrcFG677Z8qK4X6"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >


  {/* <AppProvider> */}
  <App />
  {/* </AppProvider> */}
  </Auth0Provider>

);
