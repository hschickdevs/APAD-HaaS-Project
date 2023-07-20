import React, { useEffect, useState } from 'react';
import "../CSS/popup.css";
import image from "../media/crossIcon.svg";
import { useDispatch } from 'react-redux';
import { setShowPopUpFalse } from '../app/appSlice';
import Divider from '@mui/material/Divider';
import SignUp from './signupform';

function PopUp(props) {
    const dispatch = useDispatch();
    const [popupData, setPopupData] = useState({});

    useEffect(() => {
        const data = {
            heading: "",
            content: <div></div>,
            footer: false,
        }

        if (props.type === "signup") {
            data.heading = "Sign Up";
            data.content = <SignUp />
        } else if (props.type === "success") {

        } else if (props.type === "error") {

        }

        setPopupData(data)
    }, [props.open, props.type]);

    return props.open ? (
        <div className='popupBackground'>
            <div className='popup'>
                <div className="popupHeadingContainer" >
                    <div className="popupHeading">{popupData.heading}</div>
                    {popupData.header}
                    <img className="crossIcon" src={image} alt="crossIcon" onClick={() => { dispatch(setShowPopUpFalse()) }} />
                </div>
                <Divider />
                <div className="popupContent" >
                    {popupData.content}
                </div>
            </div>
        </div>
    ) : "";
}

export default PopUp
