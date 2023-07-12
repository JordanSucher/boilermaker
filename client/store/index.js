import counterReducer from './mainReducer.js'
import authReducer from './authReducer.js'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore ({reducer: {
    counterReducer,
    authReducer
}
})

export default store