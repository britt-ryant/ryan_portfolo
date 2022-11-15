import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import formReducer from './formSlice';

//import redux persist 
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};


const reducers = combineReducers({
    user: userReducer,
    form: formReducer
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

// export default configureStore({
//     reducer: {
//         user: userReducer,
//         form: formReducer,
//     }
// })