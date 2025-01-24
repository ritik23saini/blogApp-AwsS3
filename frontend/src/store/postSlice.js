import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allPosts: null,
    filterPost: ""
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setallPosts: (state, action) => {
            state.allPosts = action.payload;
        },
        setfilterPost: (state, action) => {
            state.filterPost = action.payload;
        },
        setlogout: (state) => {
            state.userPost = null;

        },
    },
});

export const { setuserPost, setallPosts, setfilterPost } = postSlice.actions;
export default postSlice.reducer;
