import React, { useState } from 'react';
import "../CSS/projects.css";
import DialogComponent from '../Components/dialog';
import TextInputComponent from '../Components/textInput';
import ButtonComponent from '../Components/button';
import existingProjectImg from '../media/existingProject.png';
import createProjectImg from "../media/createProject.png";
import { useDispatch } from 'react-redux';
import { setLoginSuccess, setProjectId } from '../app/userSlice';

const ProjectComponent = (props) => {

    const dispatch = useDispatch();
    const [projectIdInput, setProjectIdInput] = useState("");

    const handleProjectIdInput = (e) => {
        setProjectIdInput(e.target.value);
    };

    const submitProject = (e) => {
        dispatch(setProjectId(projectIdInput))
    };

    const logOut = () => {
        dispatch(setLoginSuccess(false));
    }

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
                <ButtonComponent variant="contained" id="existingProjectButton" label="Next" size="large" color="existingProject" containerStyle="right" onClick={submitProject} />
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
                <TextInputComponent label="Name" id="createProjectName" required={true} fullWidth={true} />
                <TextInputComponent label="Description" id="createProjectDescription" required={true} fullWidth={true} />
                <ButtonComponent variant="contained" id="createProjectButton" label="Next" size="large" color="createProject" containerStyle="right" onClick={submitProject} />
            </DialogComponent>
        )
    }

    return (
        <React.Fragment>
            <div style={{ backgroundColor: "aliceblue" }}>
                <ButtonComponent variant="contained" label="LOGOUT" containerStyle="logout" color="gray"
                    onClick={logOut} />
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