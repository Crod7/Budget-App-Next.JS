import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        purchaseAmount: 0,
        currentTotal: 0,
    },
    reducers: {
        updatePurchaseAmount: (state, action) => {
            state.purchaseAmount = action.payload;
        },
        updateCurrentTotal: (state, action) => {
            state.currentTotal = action.payload;
        },
    },
});

export const { updatePurchaseAmount, updateCurrentTotal } = budgetSlice.actions;
export default budgetSlice.reducer;
