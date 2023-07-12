//create reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//grab token from local storage
const token = window.localStorage.getItem("token");

const incrementInDB = createAsyncThunk(
    "counter/incrementInDB",
    async () =>  {
        const response = await axios.post("api/users/increment", {}, {
            headers: {
                Authorization: token
            }
        });

        return response.data
    }
)

const decrementInDB = createAsyncThunk(
    "counter/decrementInDB",
    async () =>  {
        const response = await axios.post("api/users/decrement", {}, {
            headers: {
                Authorization: token
            }
        });

        return response.data
    }
)

const syncState = createAsyncThunk(
    "counter/syncState",
    async () => {
        const response = await axios.get("api/users/currentcount", {
            headers: {
                Authorization: token
            }
        });

        return response.data
    }
)

const counterReducer = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    extraReducers: (builder) => {
        builder.addCase(incrementInDB.fulfilled, (state, action) => {
            state.value = action.payload.value;
        })
        builder.addCase(decrementInDB.fulfilled, (state, action) => {
            state.value = action.payload.value;
        })
        builder.addCase(syncState.fulfilled, (state, action) => {
            state.value = action.payload.value;
        })
    }
})

export default counterReducer.reducer

export { incrementInDB, decrementInDB, syncState }