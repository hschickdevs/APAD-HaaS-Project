import React, { useState } from 'react';
import TextInputComponent from '../Components/textInput';
import ButtonComponent from '../Components/button';
import { Divider } from '@mui/material';
import "../CSS/popup.css";
import { createUser } from '../app/API';

function SignUp() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSignUpClick = () => {
        const request = {
            username: userName,
            password: password
        }
        if (password === confirmPassword) {
            createUser(request)
        }
    }
    return (
        <React.Fragment>
            <div className='signUpContent'>
                <div className='signUpUserId'>
                    <TextInputComponent label="User ID" id="signUpUserIdInput" fullWidth={true} required={true} onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <TextInputComponent label="Create Password" id="signUpPasswordInput" required={true} fullWidth={true} onChange={(e) => { setPassword(e.target.value) }} />
                <TextInputComponent label="Confirm Password" id="signUpPasswordConfirmInput" required={true} fullWidth={true} onChange={(e) => { setConfirmPassword(e.target.value) }} />
            </div>
            <div>
                <Divider />
                <div className="popupFooter" >
                    <ButtonComponent className="popUpButton" variant="contained" id="signUpPopUpButton" label="Next" size="large" color="gray" onClick={onSignUpClick} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SignUp
