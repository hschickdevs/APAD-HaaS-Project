import React from "react";
import "../CSS/components.css";
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ButtonComponent = (props) => {

    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#3F73DB',
                darker: '#053e85',
            },
            neutral: {
                main: '#3F73DB',
                contrastText: '#fff',
            },
            gray: {
                main: '#708090',
                contrastText: '#fff',
            },
            createProject: {
                main: "#3c74dc",
                contrastText: '#fff',
            },
            existingProject: {
                main: "#7599e5",
                contrastText: '#fff'
            }
        },
    });

    const getContainerStyle = (type) => {
        let style = null;
        if (type === "right") {
            style = {
                display: "flex",
                marginTop: "25px",
                justifyContent: "right"
            }
        } else if (type === "logout") {
            style = {
                display: "flex",
                marginRight: "5px",
                justifyContent: "right"
            }
        }
        return style;
    };

    return (
        <React.Fragment>
            <div id="buttonContainer" className="buttonContainer">
                <ThemeProvider theme={theme}>
                    <div id="buttonContainer" style={getContainerStyle(props.containerStyle)}>
                        <Button
                            variant={props.variant}
                            size={props.size}
                            id={props.id}
                            color={props.color}
                            onClick={props.onClick}
                            disabled={props.disabled}
                        >
                            {props.label}
                        </Button>
                    </div>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
};

export default ButtonComponent;