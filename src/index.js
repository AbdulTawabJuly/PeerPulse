import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {persistGate} from 'redux-persist/es/integration/react'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react';

const persistor = persistStore(store);


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <App />
      </PersistGate>
      
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals