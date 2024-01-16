// Manages Loading State.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
    page: string;
}

const initialState: PageState = {
    page: 'main',
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload;
        },
    },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;

export type { PageState }; // Export the type
