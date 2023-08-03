import React, { useEffect, useState } from 'react';
import LoginPage from './loginPage';
import { useSelector } from 'react-redux';
import PopUp from './popup';
import ProjectComponent from './projects';
import HardwareSetPage from './hardwareSetPage';

const View = () => {
    let showPopUp = useSelector((state) => state.app.showPopUp);
    let showPopUpType = useSelector((state) => state.app.showPopUpType);
    let showPopUpMessage = useSelector((state) => state.app.showPopUpMessage);
    let showPopUpHeading = useSelector((state) => state.app.showPopUpHeading);
    let loginSuccessState = useSelector((state) => state.user.loginSuccess);
    let projectIdState = useSelector((state) => state.user.projectId);
    let [loginSuccess, setLoginSuccess] = useState(false);
    let [projectId, setProjectId] = useState("");

    useEffect(() => {
        if (loginSuccessState) {
            setLoginSuccess(true);
        } else {
            setLoginSuccess(false)
        }

        if (projectIdState !== "") {
            setProjectId(projectIdState);
        } else {
            setProjectId("");
        }
    }, [loginSuccessState, projectIdState])

    return (
        <React.Fragment>
            <div id="view">
                <PopUp open={showPopUp} type={showPopUpType} message={showPopUpMessage} heading={showPopUpHeading} />
                {!loginSuccess ?
                    <LoginPage /> :
                    projectId !== "" ? <HardwareSetPage /> : <ProjectComponent />
                }
            </div>
        </React.Fragment >
    );
}

export default View;