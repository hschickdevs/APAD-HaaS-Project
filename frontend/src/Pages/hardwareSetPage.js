import React, { useEffect, useState } from 'react';
import ButtonComponent from '../Components/button';
import backImg from "../media/backIcon.svg";
import { useDispatch, useSelector } from 'react-redux';
import "../CSS/hardwareSetPage.css"
import { setHardwareInfoArr, setLoginSuccess, setProjectId } from '../app/userSlice';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextInputComponent from '../Components/textInput';
import { checkInAPI, checkOutAPI } from '../app/API';

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
    const [noOfHardwareSet, setNoOfHardwareSet] = useState(0);
    const [hardwareState, setHardwareState] = useState({});
    const [hardwareData, setHardwareData] = useState([]);
    const [errorId, setErrorId] = useState("");

    useEffect(() => {
        if (hardwareInfoArr !== null && hardwareInfoArr !== undefined && hardwareInfoArr.length !== 0) {
            setHardwareData(hardwareInfoArr);
            setNoOfHardwareSet(hardwareInfoArr.length);
        }
    }, [hardwareInfoArr, projectId])

    const setRequestAmountForHardware = (e, row, index) => {
        setHardwareState({
            ...hardwareState,
            [row.hardware_id]: e.target.value
        })
        inputValidation(row.hardware_id, e.target.value, index)
    };

    const inputValidation = (hardwareId, value, index) => {
        if (Number(value) < 0 || Number(value) > hardwareData[index].availableAmount || Number(value) > hardwareData[index].maxAmount) {
            setErrorId(hardwareId)
        } else {
            setErrorId("")
        }
    }

    const createRequest = () => {
        let request = {};
        if (noOfHardwareSet !== 0) {
            hardwareData.forEach((hardware) => {
                console.log("num", Number(hardwareState[hardware.hardware_id]), hardwareState[hardware.hardware_id], hardwareState, hardware)
                request[hardware.hardware_id] = {};
                request[hardware.hardware_id].hardware_id = hardware.hardware_id;
                request[hardware.hardware_id].project_id = projectId;
                request[hardware.hardware_id].quantity = isNaN(Number(hardwareState[hardware.hardware_id])) ? 0 : Number(hardwareState[hardware.hardware_id]);
            })
        }
        return request;
    };

    const checkInAmount = () => {
        let request = createRequest();
        checkInAPI(request, projectId, dispatch, accessToken)
        setHardwareState({})
    };

    const checkOutAmount = () => {
        let request = createRequest();
        checkOutAPI(request, projectId, dispatch, accessToken)
        setHardwareState({})
    };

    const backButtonClick = () => {
        setHardwareData([]);
        setNoOfHardwareSet(0)
        dispatch(setProjectId(""));
        dispatch(setHardwareInfoArr([]));
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
                                    projectId: ""
                                }));
                            }} />
                    </div>
                    <div className='hardwareHeader'>
                        <img src={backImg} alt="Back Button" style={{ width: "40px", height: "30px", marginTop: "25px", marginLeft: "10px" }} onClick={() => { backButtonClick() }} />
                        <h3 style={{ marginLeft: "20px", fontSize: "25px" }} >Project ID: {projectId}</h3>
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
                                                                    errorId={errorId !== "" ? errorId : null}
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
                        <ButtonComponent className="checkInButton" variant="contained" id="checkInButton" label="Check In" size="large" color="gray" onClick={checkInAmount} disabled={errorId !== "" ? true : false} />
                        <ButtonComponent className="checkOutButton" variant="contained" id="checkOutButton" label="Check Out" size="large" color="gray" onClick={checkOutAmount} disabled={errorId !== "" ? true : false} />
                    </div>
                </div>
            </React.Fragment >
        </div >
    )
};

export default HardwareSetPage;
