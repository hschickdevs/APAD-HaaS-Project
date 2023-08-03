import React, { useEffect, useState } from "react";
import "../CSS/components.css";
import TextField from '@mui/material/TextField';

const TextInputComponent = (props) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        if (props.errorId !== null && props.errorId === props.id) {
            setError(true);
        } else {
            setError(false)
        }
    }, [props.errorId, props.id])

    return (
        <React.Fragment>
            <div id="textInputContainer" className="textInputContainer">
                <TextField
                    error={error}
                    required={props.required}
                    id={props.id}
                    label={props.label}
                    fullWidth={props.fullWidth}
                    onChange={props.onChange}
                    type={props.type ? props.type : null}
                    multiline={props.multiline ? true : false}
                    helperText={error ? "Invalid request quantity" : null}
                />
            </div>
        </React.Fragment>
    )
};

export default TextInputComponent;