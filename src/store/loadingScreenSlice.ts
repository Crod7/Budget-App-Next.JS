
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingScreenState {
    loadingScreen: boolean;
}

const initialState: LoadingScreenState = {
    loadingScreen: false,
};

const loadingScreenSlice = createSlice({
    name: 'loadingScreen',
    initialState,
    reducers: {
        setLoadingScreen: (state, action: PayloadAction<boolean>) => {
            state.loadingScreen = action.payload;
        },
    },
});

export const { setLoadingScreen } = loadingScreenSlice.actions;
export default loadingScreenSlice.reducer;

export type { LoadingScreenState }; // Export the type
