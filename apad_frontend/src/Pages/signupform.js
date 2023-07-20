import React from 'react';
import TextInputComponent from '../Components/textInput';
import ButtonComponent from '../Components/button';
import { Divider } from '@mui/material';
import "../CSS/popup.css";

function SignUp() {

    return (
        <React.Fragment>
            <div className='signUpContent'>
                <div className='signUpUserId'>
                    <TextInputComponent label="User ID" id="signUpUserIdInput" fullWidth={true} required={true} onChange={(e) => { console.log(e.target.value) }} />
                </div>
                <TextInputComponent label="Create Password" id="signUpPasswordInput" required={true} fullWidth={true} onChange={(e) => { console.log(e.target.value) }} />
                <TextInputComponent label="Confirm Password" id="signUpPasswordConfirmInput" required={true} fullWidth={true} onChange={(e) => { console.log(e.target.value) }} />
            </div>
            <div>
                <Divider />
                <div className="popupFooter" >
                    <ButtonComponent className="popUpButton" variant="contained" id="signUpPopUpButton" label="Next" size="large" color="gray" onClick={() => { console.log("next") }} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SignUp
