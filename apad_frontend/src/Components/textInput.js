import React from "react";
import "../CSS/components.css";
import TextField from '@mui/material/TextField';

const TextInputComponent = (props) => {


    return (
        <React.Fragment>
            <div id="textInputContainer" className="textInputContainer">
                <TextField
                    required={props.required}
                    id={props.id}
                    label={props.label}
                    fullWidth={props.fullWidth}
                    onChange={props.onChange}
                />
            </div>
        </React.Fragment>
    )
};

export default TextInputComponent;