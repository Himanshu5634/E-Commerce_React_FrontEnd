import { createSlice } from "@reduxjs/toolkit";

/**
 * @constant initialState
 * @description The initial state of the login popup slice, containing the visibility status of the login popup.
 */
const initialState = {
    showLogin: false, // Determines whether the login popup is visible
};

/**
 * @slice loginPopupSlice
 * @description A Redux slice for managing the visibility of the login popup.
 */
export const loginPopupSlice = createSlice({
    name: "loginPopup",
    initialState,
    reducers: {
        /**
         * @function handleShowLogin
         * @description Updates the visibility status of the login popup.
         * @param {Object} state - The current state of the login popup.
         * @param {Object} action - The dispatched action containing the new visibility status.
         * @param {boolean} action.payload - The new visibility status of the login popup.
         */
        handleShowLogin: (state, action) => {
            state.showLogin = action.payload;
        },
    },
});

/**
 * @exports loginPopupSlice.actions
 * @description Exports the action for updating the login popup visibility.
 */
export const { handleShowLogin } = loginPopupSlice.actions;

/**
 * @exports loginPopupSlice.reducer
 * @description Exports the reducer for the login popup slice to be used in the Redux store.
 */
export default loginPopupSlice.reducer;