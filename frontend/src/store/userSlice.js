import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("JWT", action.payload.token)
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setlogout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('jwt');
        },
    },
});

export const { setUserInfo, setLoading, setError, setlogout } = userSlice.actions;
export default userSlice.reducer;
