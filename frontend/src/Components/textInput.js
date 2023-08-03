import React from "react";
import "../CSS/components.css";
import TextField from '@mui/material/TextField';

const TextInputComponent = (props) => {

    return (
        <React.Fragment>
            <div id="textInputContainer" className="textInputContainer">
                <TextField
                    error={props.error}
                    required={props.required}
                    id={props.id}
                    label={props.label}
                    fullWidth={props.fullWidth}
                    onChange={props.onChange}
                    type={props.type ? props.type : null}
                    multiline={props.multiline ? true : false}
                    helperText={props.error ? "Invalid request quantity" : null}
                />
            </div>
        </React.Fragment>
    )
};

export default TextInputComponent;