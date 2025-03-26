import { combineReducers, createStore } from 'redux'
import { AuthReducer } from './auth'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  auth:AuthReducer
})

const PERSIST_CONFIG = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
}
const pReducer = persistReducer(PERSIST_CONFIG, reducers);
export const store = createStore(pReducer);
export const persistor = persistStore(store);

export * from './auth'
