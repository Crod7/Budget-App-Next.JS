import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        purchases: [],
        budgets: [],
    },
    reducers: {
        updatePurchases: (state, action) => {
            state.purchases = action.payload;
        },
        updateBudgets: (state, action) => {
            state.budgets = action.payload;
        },
    },
});

export const { updatePurchases, updateBudgets } = userSlice.actions;
export default userSlice.reducer;
