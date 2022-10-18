import React from 'react';
import {Button} from "@mui/material";
import googleLogo from "../../../../assets/pictures/logo-google.svg"
import GoogleButtonStyles from "./GoogleButtonStyles";

const GoogleButton = (props) => {
    return (
        <Button
            style={GoogleButtonStyles.googleButton}
            startIcon={<img src={googleLogo}/>}
            onClick={props.onClick}
            href={props.href}
        >
            {props.content}
        </Button>
    );
};

export default GoogleButton;