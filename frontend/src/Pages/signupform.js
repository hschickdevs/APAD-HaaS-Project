import React, { useState } from 'react';
import TextInputComponent from '../Components/textInput';
import ButtonComponent from '../Components/button';
import { Divider } from '@mui/material';
import "../CSS/popup.css";
import { createUser } from '../app/API';
import { setShowPopUp } from '../app/appSlice';
import { useDispatch } from 'react-redux';

function SignUp() {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSignUpClick = () => {
        const request = {
            username: userName,
            password: password
        }
        if (password === confirmPassword) {
            createUser(request, dispatch)
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Password do not match!",
                heading: "Please try again!"
            }))
        }
    }
    return (
        <React.Fragment>
            <div className='signUpContent'>
                <div className='signUpUserId'>
                    <TextInputComponent label="User ID" id="signUpUserIdInput" fullWidth={true} required={true} onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <TextInputComponent label="Create Password" id="signUpPasswordInput" required={true} fullWidth={true} onChange={(e) => { setPassword(e.target.value) }} />
                <TextInputComponent type="password" label="Confirm Password" id="signUpPasswordConfirmInput" required={true} fullWidth={true} onChange={(e) => { setConfirmPassword(e.target.value) }} />
            </div>
            <div>
                <Divider />
                <div className="popupFooter" >
                    <ButtonComponent className="popUpButton" variant="contained" id="signUpPopUpButton" label="Next" size="large" color="primary" onClick={onSignUpClick} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SignUp
