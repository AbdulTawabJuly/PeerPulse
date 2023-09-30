import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {comnineReducer} from '@reduxjs/toolkit'

const persistConfig = {
  key:"root",
  version:1,
  storage
};

const reducer = combineReducers({
  auth:authReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
});
