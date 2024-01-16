
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loadingScreenReducer from './loadingScreenSlice';
import pageReducer from './pageSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        loadingScreen: loadingScreenReducer,
        page: pageReducer,
    },
});

export default store;
