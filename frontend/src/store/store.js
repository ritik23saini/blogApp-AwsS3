import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import postReducer from './postSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,  // Add userSlice to store
        posts: postReducer,  // Add userSlice to store
    },
});

export default store;
