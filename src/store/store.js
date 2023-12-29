import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import budgetReducer from './budgetSlice';

const rootReducer = {
    user: userReducer,
    budget: budgetReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
