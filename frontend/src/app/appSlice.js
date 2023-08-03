import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        showPopUp: false,
        showPopUpType: "",
        showPopUpMessage: "",
        showPopUpHeading: "",
    },
    reducers: {
        setShowPopUp: (state, action) => {
            state.showPopUp = true;
            state.showPopUpType = action.payload.type;
            state.showPopUpMessage = action.payload.message;
            state.showPopUpHeading = action.payload.heading;
        },
        setShowPopUpFalse: (state) => {
            state.showPopUp = false;
            state.showPopUpType = "";
            state.showPopUpMessage = "";
            state.showPopUpHeading = "";
        }
    },
})

export const { setShowPopUp, setShowPopUpFalse } = appSlice.actions

export default appSlice.reducer