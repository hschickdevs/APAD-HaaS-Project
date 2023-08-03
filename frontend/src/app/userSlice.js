import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: "",
        password: "",
        loginSuccess: false,
        projectId: "",
        error: "",
        accessToken: "",
        hardwareInfoArr: []
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },

        setProjectId: (state, action) => {
            state.projectId = action.payload
        },

        setLoginSuccess: (state, action) => {
            state.loginSuccess = action.payload.loginSuccess
            state.userId = action.payload.username
            state.password = action.payload.password
            state.accessToken = action.payload.accessToken
            state.hardwareInfoArr = action.payload.hardwareInfoArr
            state.projectId = action.payload.projectId
        },

        setPassword: (state, action) => {
            state.password = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },

        setHardwareInfoArr: (state, action) => {
            state.hardwareInfoArr = action.payload
        },
    },
})

export const { setUserId, setLoginSuccess, setProjectId, setPassword, setError, setHardwareInfoArr } = userSlice.actions

export default userSlice.reducer