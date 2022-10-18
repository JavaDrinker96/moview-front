import React from 'react';
import {Button} from "@mui/material";
import AuthButtonStyles from "./AuthButtonStyles";

const AuthButton = (props) => {
    return (
        <Button
            style={AuthButtonStyles.buttonLogin}
            variant="contained"
            onClick={props.onClick}
        >
            {props.content}
        </Button>
    );
};

export default AuthButton;