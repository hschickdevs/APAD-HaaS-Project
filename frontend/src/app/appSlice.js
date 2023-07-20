import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        showPopUp: false,
        showPopUpType: ""
    },
    reducers: {
        setShowPopUp: (state, action) => {
            state.showPopUp = true;
            state.showPopUpType = action.payload;
        },
        setShowPopUpFalse: (state) => {
            state.showPopUp = false
            state.showPopUpType = ""
        }
    },
})

export const { setShowPopUp, setShowPopUpFalse } = appSlice.actions

export default appSlice.reducer