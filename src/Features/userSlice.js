import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    users : JSON.parse(localStorage.getItem("users")) || [],
    token : localStorage.getItem("token") || null,
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        /**
         * @description  Logs in the user by updating the state with user details.
         * @param {*} state 
         * @param {*} action 
         */
        logInUser: (state,action) => {
            try {
                const user = state.users.find((user) => user.email === action.payload);
                if (user) {
                    state.token = action.payload;
                    localStorage.setItem("token", action.payload);
                }
            } catch (error) {
                console.log("LOGIN USER ERROR : ",error);
            }
        },
        /**
         * @description Registers a new user by updating the state with user details.
         * @param {*} state 
         * @param {*} action 
         */
        registerUser : (state,action) => {
            try {
                state.users.push(action.payload);
                state.token = action.payload.email
                localStorage.setItem("users", JSON.stringify(state.users));
                localStorage.setItem("token", action.payload.email);
            } catch (error) {
                console.log("REGISTER USER ERROR : ",error.message);
            }
        }
    }
})

export const {logInUser,registerUser} = userSlice.actions;

export default userSlice.reducer;