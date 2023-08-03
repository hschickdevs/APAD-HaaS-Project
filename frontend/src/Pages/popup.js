import React, { useEffect, useState } from 'react';
import "../CSS/popup.css";
import image from "../media/crossIcon.svg";
import { useDispatch } from 'react-redux';
import { setShowPopUpFalse } from '../app/appSlice';
import Divider from '@mui/material/Divider';
import SignUp from './signupform';
import successImg from '../media/successMessage.png';
import errorImg from '../media/errorMessage.png';

function PopUp(props) {
    const dispatch = useDispatch();
    const [popupData, setPopupData] = useState({});

    useEffect(() => {
        const data = {
            heading: "",
            content: <div></div>,
            footer: false,
            className: ""
        }

        if (props.type === "signup") {
            data.heading = "Sign Up";
            data.content = <SignUp />
        } else if (props.type === "success") {
            data.heading = props.heading
            data.content = props.message
        } else if (props.type === "error") {
            data.heading = props.heading
            data.content = props.message
        }

        setPopupData(data)
    }, [props.open, props.type, props.message, props.heading]);

    const getContentClass = () => {
        let className = "";

        if (props.type === "success" || "error") {
            className = "messagePopup";
        } else {
            className = ""
        }
        return className;
    };

    return props.open ? (
        <div className='popupBackground'>
            <div className='popup'>
                <div className="popupHeadingContainer" >
                    <div className="popupHeading">{popupData.heading}</div>
                    <img className="crossIcon" src={image} alt="crossIcon" onClick={() => { dispatch(setShowPopUpFalse()) }} />
                </div>
                <Divider />
                <div className="popupContent" >
                    {props.type === "signup" ? <div>{popupData.content}</div> :
                        <div className={getContentClass()}>
                            <div style={{ marginTop: "5px" }}>
                                {props.type === "success" ? <img style={{ width: "50px", height: "50px" }} src={successImg} alt="pop up" /> : ""}
                                {props.type === "error" ? <img style={{ width: "50px", height: "50px" }} src={errorImg} alt="pop up" /> : ""}
                            </div>
                            <div style={{ marginLeft: "15px" }}>
                                {popupData.content}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    ) : "";
}

export default PopUp
