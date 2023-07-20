import React from 'react';
import LoginPage from './loginPage';
import { useSelector } from 'react-redux';
import PopUp from './popup';

const View = () => {
    let showPopUp = useSelector((state) => state.app.showPopUp);
    let showPopUpType = useSelector((state) => state.app.showPopUpType);
    console.log("pop", showPopUpType)
    return (
        <React.Fragment>
            <div id="view">
                <LoginPage />
                <PopUp open={showPopUp} type={showPopUpType} />
            </div>
        </React.Fragment >
    );
}

export default View;