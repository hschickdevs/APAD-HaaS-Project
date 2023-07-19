import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: "",
        password: "",
        loginSuccess: false,
        error: ""
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },

        setLoginSuccess: (state) => {
            state.loginSuccess = true
        },

        setPassword: (state, action) => {
            state.password = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    },
})

export const { setUserId, setLoginSuccess } = userSlice.actions

export default userSlice.reducer