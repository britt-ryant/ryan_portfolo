import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import formReducer from './formSlice';
import adminReducer from './adminSlice';
import weatherReducer from './weatherSlice';

//import redux persist 
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};


const reducers = combineReducers({
    user: userReducer,
    form: formReducer,
    admin: adminReducer,
    weather: weatherReducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
});

// let persistor = persistStore(store);


// export default configureStore({
//     reducer: {
//         user: userReducer,
//         form: formReducer,
//     }
// })