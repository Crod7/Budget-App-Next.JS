
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loadingScreenReducer from './loadingScreenSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        loadingScreen: loadingScreenReducer,
    },
});

export default store;
