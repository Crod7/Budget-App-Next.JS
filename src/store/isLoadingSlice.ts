
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IsLoadingState {
    isLoading: boolean;
}

const initialState: IsLoadingState = {
    isLoading: false,
};

const isLoadingSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsLoading } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
