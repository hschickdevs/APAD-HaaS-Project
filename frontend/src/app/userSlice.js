import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: "",
        password: "",
        loginSuccess: false,
        projectId: "",
        error: "",
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },

        setProjectId: (state, action) => {
            state.projectId = action.payload
        },

        setLoginSuccess: (state, action) => {
            state.loginSuccess = action.payload
        },

        setPassword: (state, action) => {
            state.password = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    },
})

export const { setUserId, setLoginSuccess, setProjectId, setPassword, setError } = userSlice.actions

export default userSlice.reducer