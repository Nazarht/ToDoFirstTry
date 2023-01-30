import { createSlice } from "@reduxjs/toolkit";


const loadingState =  createSlice({
    name:'loading',
    initialState: {isLoading: false},
    reducers: {
        toggleLoadingOn(state) {
            state.isLoading = true;
        },
        toggleLoadingOff(state) {
            state.isLoading = false;
        },
    }
});


export const loadingActions = loadingState.actions;

export default loadingState.reducer;

