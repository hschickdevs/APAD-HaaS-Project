import React, { useEffect, useState } from 'react';
import ButtonComponent from '../Components/button';
import backImg from "../media/backIcon.svg";
import { useDispatch, useSelector } from 'react-redux';
import "../CSS/hardwareSetPage.css"
import { setShowPopUp } from '../app/appSlice';
import { setHardwareInfoArr, setProjectResourcesArr, setLoginSuccess, setProjectId } from '../app/userSlice';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextInputComponent from '../Components/textInput';
import { checkInAPI, checkOutAPI, deleteProjectAPI } from '../app/API';
import DeleteIcon from '@mui/icons-material/Delete';

const headCells = [
    {
        id: 'name',
        label: 'Hardware Set',
    },
    {
        id: 'capacity',
        label: 'Capacity',
    },
    {
        id: 'available',
        label: 'Available',
    },
    {
        id: 'request',
        label: 'Request',
    }
];

function HardwareSetPage() {
    const dispatch = useDispatch();
    const projectId = useSelector((state) => state.user.projectId);
    const accessToken = useSelector((state) => state.user.accessToken);
    const hardwareInfoArr = useSelector((state) => state.user.hardwareInfoArr);
    const projectResourcesArr = useSelector((state) => state.user.projectResourcesArr);
    const [noOfHardwareSet, setNoOfHardwareSet] = useState(0);
    const [hardwareState, setHardwareState] = useState({});
    const [hardwareData, setHardwareData] = useState([]);
    const [noOfProjectResources, setNoOfProjectResources] = useState(0);
    const [projectResourceData, setProjectResourceData] = useState([]);

    useEffect(() => {
        if (hardwareInfoArr !== null && hardwareInfoArr !== undefined && hardwareInfoArr.length !== 0) {
            setHardwareData(hardwareInfoArr);
            setNoOfHardwareSet(hardwareInfoArr.length);
        }
        if (projectResourcesArr !== null && projectResourcesArr !== undefined && projectResourcesArr.length !== 0) {
            setProjectResourceData(projectResourcesArr);
            setNoOfProjectResources(projectResourcesArr.length);
        }
    }, [hardwareInfoArr, projectResourcesArr, projectId])

    const setRequestAmountForHardware = (e, row, index) => {
        setHardwareState({
            ...hardwareState,
            [row.hardware_id]: e.target.value
        })
    };

    const deleteProjectValidation = () => {
        const error = [];
        // if (noOfProjectResources !== 0) {  // Commented out to accept an empty list when no resources have been checked out
        console.log(projectResourceData)
        projectResourceData.forEach((projectResource) => {
            const checkedOut = projectResource.checkedOut
            if (checkedOut > 0) {
                error.push(`${checkedOut} resources still checked out for ${projectResource.hardware_id}`)
            }
        })
        // } else {
        //     error.push("No hardware sets available for this project")
        // }
        console.log("Errors: " + error)
        return error
    };

    const checkInValidation = () => {
        const error = [];
        if (noOfHardwareSet !== 0) {
            hardwareData.forEach((hardware) => {
                const value = isNaN(Number(hardwareState[hardware.hardware_id])) ? 0 : Number(hardwareState[hardware.hardware_id]);
                const checkInAvailable = hardware.maxAmount - hardware.availableAmount
                if (value < 0) {
                    error.push(hardware.hardware_id)
                } else if (value > checkInAvailable) {
                    error.push(hardware.hardware_id)
                }
            })
        }
        return error
    };

    const checkOutValidation = () => {
        const error = [];
        if (noOfHardwareSet !== 0) {
            hardwareData.forEach((hardware) => {
                const value = isNaN(Number(hardwareState[hardware.hardware_id])) ? 0 : Number(hardwareState[hardware.hardware_id]);
                const availableUnits = hardware.availableAmount
                if (value < 0) {
                    error.push(hardware.hardware_id)
                } else if (value > availableUnits) {
                    error.push(hardware.hardware_id)
                }
            })
        }
        return error
    };

    const createRequest = () => {
        let request = {};
        if (noOfHardwareSet !== 0) {
            hardwareData.forEach((hardware) => {
                request[hardware.hardware_id] = {};
                request[hardware.hardware_id].hardware_id = hardware.hardware_id;
                request[hardware.hardware_id].project_id = projectId;
                request[hardware.hardware_id].quantity = isNaN(Number(hardwareState[hardware.hardware_id])) ? 0 : Number(hardwareState[hardware.hardware_id]);
            })
        }
        return request;
    };

    const checkInAmount = () => {
        const errorArr = checkInValidation()
        if (errorArr.length !== 0) {
            let errString = errorArr.join(", ")
            dispatch(setShowPopUp({
                type: "error",
                message: "Please enter a valid request for the following: " + errString,
                heading: "Invalid Request!"
            }))
        } else {
            let request = createRequest("checkIn");
            checkInAPI(request, projectId, dispatch, accessToken)
            setHardwareState({})
            document.querySelectorAll('input').forEach(singleInput => singleInput.value = '');
        }
    };

    const checkOutAmount = () => {
        const errorArr = checkOutValidation()
        if (errorArr.length !== 0) {
            let errString = errorArr.join(", ")
            dispatch(setShowPopUp({
                type: "error",
                message: "Please enter a valid request for the following: " + errString,
                heading: "Invalid Request!"
            }))
        } else {
            let request = createRequest();
            checkOutAPI(request, projectId, dispatch, accessToken)
            setHardwareState({})
            document.querySelectorAll('input').forEach(singleInput => singleInput.value = '');
        }
    };

    const deleteProject = () => {
        // CHECK ENSURE THAT NO HARDWARE RESOURCES ARE CHECKED OUT STILL BY THIS PROJECT:
        const errorArr = deleteProjectValidation()

        // THEN DELETE THE PROJECT FROM THE API IF VALIDATION IS SUCCESSFUL:
        if (errorArr.length !== 0) {
            let errString = errorArr.join(", ")
            dispatch(setShowPopUp({
                type: "error",
                message: "Cannot delete project: " + errString,
                heading: "Invalid Request!"
            }))
        } else {
            // DELETE PROJECT API CALL, THEN CALL backButtonClick() IF SUCCESSFUL:
            deleteProjectAPI({"project_id": projectId}, dispatch, accessToken).then((success) => {
                if (success === 1) {
                    backButtonClick()
                }
            })
        }
    };

    const backButtonClick = () => {
        setHardwareData([]);
        setNoOfHardwareSet(0)
        dispatch(setProjectId(""));
        dispatch(setHardwareInfoArr([]));
        dispatch(setProjectResourcesArr([]));
    };

    return (
        <div>
            <React.Fragment>
                <div className='hardwareContainer'>
                    <div style={{ backgroundColor: "aliceblue" }}>
                        <ButtonComponent variant="contained" label="LOGOUT" containerStyle="logout" color="gray"
                            onClick={() => {
                                dispatch(setLoginSuccess({
                                    loginSuccess: false,
                                    username: "",
                                    password: "",
                                    accessToken: "",
                                    hardwareInfoArr: [],
                                    projectResourcesArr: [],
                                    projectId: ""
                                }));
                            }} />
                    </div>
                    <div className='hardwareHeader'>
                        <img src={backImg} alt="Back Button" style={{ width: "40px", height: "30px", marginLeft: "10px" }} onClick={() => { backButtonClick() }} />
                        <h3 style={{ marginLeft: "20px", fontSize: "25px" }} >Project ID: {projectId}</h3>
                        <div class="hardwareDelete"><DeleteIcon style={{ cursor: "pointer" }} onClick={deleteProject}/></div>
                    </div>
                    <div className='hardwareContent'>
                        <Box sx={{ width: '100%' }}>
                            <Paper sx={{ width: '100%', mb: 2 }}>
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 750 }}
                                        aria-labelledby="tableTitle"
                                        size={'large'}
                                    >
                                        <TableHead>
                                            <TableRow key={"tableHeaderRow"}>
                                                {headCells.map((headCell) => (
                                                    <TableCell
                                                        key={headCell.id}
                                                        align={'center'}
                                                        padding={'normal'}
                                                        style={{
                                                            fontSize: "25px",
                                                            fontWeight: "bold"
                                                        }}
                                                    >{headCell.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        {Object.keys(hardwareData).length !== 0 || undefined ?
                                            <TableBody>
                                                {hardwareData.map((row, index) => {
                                                    const labelId = `table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            tabIndex={-1}
                                                            key={labelId}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <TableCell
                                                                style={{
                                                                    fontSize: "22px",
                                                                    fontWeight: "normal"
                                                                }}
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                                align='center'
                                                            >
                                                                {row.hardware_id}
                                                            </TableCell>
                                                            <TableCell style={{
                                                                fontSize: "22px",
                                                                fontWeight: "normal"
                                                            }} align="center">{row.maxAmount}</TableCell>
                                                            <TableCell style={{
                                                                fontSize: "22px",
                                                                fontWeight: "normal"
                                                            }} align="center">{row.availableAmount}</TableCell>
                                                            <TableCell style={{
                                                                fontSize: "22px",
                                                                fontWeight: "normal"
                                                            }} align="center">
                                                                <TextInputComponent
                                                                    id={row.hardware_id}
                                                                    onChange={(e) => { setRequestAmountForHardware(e, row, index) }}
                                                                    type='number'
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                            :
                                            <TableBody>
                                                <TableRow
                                                    tabIndex={-1}
                                                    key={"noHardware"}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell>
                                                        <div style={{ fontSize: "22px", marginRight: "25px", fontWeight: "bold" }}> No Hardware Found for Project {projectId}, Please try again!</div>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        }
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </div>
                    <div className='hardwareFooter'>
                        <ButtonComponent className="checkInButton" variant="contained" id="checkInButton" label="Check In" size="large" color="gray" onClick={checkInAmount} />
                        <ButtonComponent className="checkOutButton" variant="contained" id="checkOutButton" label="Check Out" size="large" color="gray" onClick={checkOutAmount} />
                    </div>
                </div>
            </React.Fragment >
        </div >
    )
};

export default HardwareSetPage;
