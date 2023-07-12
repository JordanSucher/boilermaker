//create reducer
import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: "auth",
    initialState: {
        authenticated: false,
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.authenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.authenticated = false;
        }
    }
})

export default authReducer.reducer