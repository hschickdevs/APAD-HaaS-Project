import React, { useState } from "react";
import "../CSS/loginPage.css";
import TextInputComponent from "../Components/textInput";
import ButtonComponent from "../Components/button";
import image from "../media/loginImage.svg";
import DialogComponent from "../Components/dialog";
import { useDispatch } from "react-redux";
import { setShowPopUp } from "../app/appSlice";
import { getLogin } from "../app/API";

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");

    const style = {
        width: "40vh",
        height: "auto",
        position: "fixed",
        top: "15%",
        right: "15%"
    };

    const signUpClick = () => {
        dispatch(setShowPopUp({
            type: "signup",
            message: "",
            heading: ""
        }));
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleUserId = (e) => {
        setUserId(e.target.value);
    };

    const loginClick = () => {
        if (userId !== "" && password !== "") {
            const request = {
                username: userId,
                password: password
            }
            getLogin(request, dispatch);
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Please enter a valid username and password",
                heading: "Login Failed!"
            }))
        }

    };

    const loginForm = () => {
        return (
            <DialogComponent style={style}
                heading="Login"
                headingStyle="Login"
            >
                <div ></div>
                <TextInputComponent label="Username" id="userIdInput" fullWidth={true} required={true} onChange={handleUserId} />
                <TextInputComponent label="Password" type="password" id="passwordInput" required={true} fullWidth={true} onChange={handlePassword} />
                <ButtonComponent variant="contained" id="loginButton" label="Next" size="large" colour="primary" containerStyle="right" onClick={loginClick} />
                <div className="signupcontainer">
                    <p className="newUserContainer">New User? </p>
                    <ButtonComponent className="signUpButton" variant="text" id="signUpButton" label="Sign Up" size="large" color="neutral" onClick={signUpClick} />
                </div>
            </DialogComponent>
        );
    };

    return (
        <React.Fragment>
            <div className="splitScreen" >
                <div className="leftPane" >
                    <div className="leftImage">
                        <img style={{ width: "inherit", height: "inherit", position: "fixed" }} src={image} alt="loginImage" />
                    </div>
                </div>
                <div className="rightPane" >{loginForm()}</div>
            </div>
        </React.Fragment>
    );
};

export default LoginPage;