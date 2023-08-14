import React, { useState } from 'react';
import "../CSS/projects.css";
import DialogComponent from '../Components/dialog';
import TextInputComponent from '../Components/textInput';
import ButtonComponent from '../Components/button';
import existingProjectImg from '../media/existingProject.png';
import createProjectImg from "../media/createProject.png";
import { useDispatch, useSelector } from 'react-redux';
import { setLoginSuccess } from '../app/userSlice';
import { setShowPopUp } from '../app/appSlice';
import { createProjectAPI, existingProjectAPI, getResourcesAPI } from '../app/API';

const ProjectComponent = () => {

    const dispatch = useDispatch();
    const [projectIdInput, setProjectIdInput] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const accessToken = useSelector(state => state.user.accessToken)
    const userName = useSelector(state => state.user.userId)

    const handleProjectIdInput = (e) => {
        setProjectIdInput(e.target.value);
    };

    const handleProjectName = (e) => {
        setProjectName(e.target.value);
    };

    const handleProjectDescription = (e) => {
        setProjectDescription(e.target.value);
    };

    const submitProject = (type, projectId) => {
        if (projectId !== "") {
            const request = {};
            if (type === "create") {
                request.project_id = projectId;
                request.username = userName;
                request.projectName = projectName;
                request.projectDescription = projectDescription;
                createProjectAPI(request, dispatch, accessToken);
                getResourcesAPI({"project_id": projectId}, dispatch, accessToken)
            } else if (type === "existing") {
                request.project_id = projectId;
                existingProjectAPI(request, dispatch, accessToken);
                getResourcesAPI({"project_id": projectId}, dispatch, accessToken)
            }
        } else {
            dispatch(setShowPopUp({
                type: "error",
                message: "Please enter a valid Project ID!",
                heading: "Project ID required"
            }))
        }
    };

    const existingProject = () => {
        const heading = (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ marginTop: "15px" }}>
                    <img style={{ height: "50px", width: "50px", verticalAlign: "middle" }} src={existingProjectImg} alt={"existingProject"} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                    <p>Use Existing Project</p>
                </div>
            </div>
        )
        return (
            <DialogComponent
                heading={heading}
                headingStyle="existingProject"
            >
                <TextInputComponent label="Project ID" id="project" fullWidth={true} required={true} onChange={handleProjectIdInput} />
                <ButtonComponent variant="contained" id="existingProjectButton" label="Next" size="large" color="existingProject" containerStyle="right" onClick={() => { submitProject("existing", projectIdInput) }} />
            </DialogComponent>
        )
    }

    const createProject = () => {
        const heading = (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ marginTop: "15px" }}>
                    <img style={{ height: "50px", width: "50px", verticalAlign: "middle" }} src={createProjectImg} alt={"existingProject"} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                    <p>Create New Project</p>
                </div>
            </div>
        )
        return (
            <DialogComponent
                heading={heading}
                headingStyle="createProject"
            >
                <TextInputComponent label="Project ID" id="createProjectId" fullWidth={true} required={true}
                    onChange={handleProjectIdInput} />
                <TextInputComponent label="Name" id="createProjectName" required={true} fullWidth={true} onChange={handleProjectName} />
                <TextInputComponent label="Description" id="createProjectDescription" required={true} fullWidth={true}
                    multiline={true} onChange={handleProjectDescription} />
                <ButtonComponent variant="contained" id="createProjectButton" label="Next" size="large" color="createProject" containerStyle="right" onClick={() => { submitProject("create", projectIdInput) }} />
            </DialogComponent>
        )
    }

    return (
        <React.Fragment>
            <div style={{ backgroundColor: "aliceblue" }}>
                <ButtonComponent variant="contained" label="LOGOUT" containerStyle="logout" color="gray"
                    onClick={() => {
                        dispatch(setLoginSuccess({
                            loginSuccess: false,
                            username: "",
                            password: "",
                            accessToken: "",
                            hardwareInfoArr: [],
                            projectId: ""
                        }));
                    }} />
            </div>
            <div className='projectContainer'>
                <div className='projectDialog'>
                    {existingProject()}
                </div>
                <div className='projectDialog'>
                    {createProject()}
                </div>
            </div>
        </React.Fragment>
    )
};

export default ProjectComponent;