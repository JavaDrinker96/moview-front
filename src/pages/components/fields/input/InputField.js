import React, {useState} from 'react';
import {TextField} from "@mui/material";


const InputField = (props) => {

    return (
        <TextField
            spellCheck="false"
            style={{marginTop: "20px"}}
            id={props.id}
            label={props.label}
            type={props.type}
            variant={"outlined"}
            color={"primary"}
            onChange={props.onChange}
            InputProps={{
                style: {
                    width: "370px",
                    fontFamily: "Poppins, Montserrat",
                    fontSize: "16px",
                    fontWeight: "500",
                    backgroundColor: "#F0EFFF",
                    color: "#7872fa",
                },
                ...props.inputProps
            }}
        />
    );
};

export default InputField;