import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import {store, persistor} from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import WebSocketInstance from './Websocket/Websocket';
function renderApp() {
    const componentMount= () => {
        WebSocketInstance.connect();
    }
    componentMount()
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider> 
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(renderApp());