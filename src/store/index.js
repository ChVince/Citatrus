import citatrusApp from '../reducers'
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'noteList',
    ],
    blacklist: [
        'camera',
        'citation'
    ],
};

const persistedReducer = persistReducer(persistConfig, citatrusApp);
const store = createStore(persistedReducer);
let persistor = persistStore(store);

export {
    store,
    persistor,
};