import React, { useState } from 'react';
import ButtonComponent from '../Components/button';
import backImg from "../media/backIcon.svg";
import { useDispatch, useSelector } from 'react-redux';
import "../CSS/hardwareSetPage.css"
import { setProjectId } from '../app/userSlice';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextInputComponent from '../Components/textInput';

function HardwareSetPage() {
    const dispatch = useDispatch();
    const projectId = useSelector((state) => state.user.projectId);
    const [request, setRequest] = useState(0);
    const [hardwareSet, setHardwareSet] = useState("");

    const setRequestAmountForHardware = (e, id) => {
        setRequest(e.target.value);
        setHardwareSet(id);
    };

    const checkInAmount = () => {
        console.log("checkIn", request, hardwareSet);
    };

    const checkOutAmount = () => {
        console.log("checkIn", request, hardwareSet);
    };

    const dataRows = [
        {
            name: "Hardware Set 1",
            capacity: 500,
            available: 300,
        },
        {
            name: "Hardware Set 2",
            capacity: 400,
            available: 200,
        }
    ];
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

    return (
        <div>
            <React.Fragment>
                <div className='hardwareContainer'>
                    <div className='hardwareHeader'>
                        <img src={backImg} alt="Back Button" style={{ width: "40px", height: "30px", marginTop: "25px", marginLeft: "10px" }} onClick={() => { dispatch(setProjectId("")) }} />
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
                                            <TableRow>
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
                                        <TableBody>
                                            {dataRows.map((row, index) => {
                                                const labelId = `table-checkbox-${index}`;
                                                return (
                                                    <TableRow
                                                        tabIndex={-1}
                                                        key={row.name}
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
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell style={{
                                                            fontSize: "22px",
                                                            fontWeight: "normal"
                                                        }} align="center">{row.capacity}</TableCell>
                                                        <TableCell style={{
                                                            fontSize: "22px",
                                                            fontWeight: "normal"
                                                        }} align="center">{row.available}</TableCell>
                                                        <TableCell style={{
                                                            fontSize: "22px",
                                                            fontWeight: "normal"
                                                        }} align="center">
                                                            <TextInputComponent
                                                                id={`${row.name} Request`}
                                                                pattern="[0-9]*"
                                                                onChange={(e) => { setRequestAmountForHardware(e, row.name) }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
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
            </React.Fragment>
        </div>
    )
};

export default HardwareSetPage;
