import React from "react";
import "../CSS/components.css"
const DialogComponent = (props) => {

    const headingStyle = (type) => {
        let style = null;
        if (type === "Login") {
            style = {
                fontSize: "30px",
                fontWeight: "bolder"
            }
        } else if (type === "createProject" || "existingProject") {
            style = {
                fontSize: "25px",
                fontWeight: "bolder"
            }
        }
        return style;
    }

    const headingDividerStyle = (type) => {
        let style = null;
        return style;
    }

    return (
        <div className="container" style={props.style}>
            <div className="headingContainer" style={headingStyle(props.headingStyle)}>
                {props.heading}
            </div>
            <div className="headingDividerContainer">
                {props.headingDivider ? <hr style={headingDividerStyle(props.headingDividerStyle)}></hr> : null}
            </div>
            <div className="contentContainer">
                {props.children}
            </div>
        </div>
    )

};

export default DialogComponent;