import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import config from './config/config';
ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider
      serverUrl={config.serverUrl}
      appId={config.appId}
    > */}
      <App />
    {/* </MoralisProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
