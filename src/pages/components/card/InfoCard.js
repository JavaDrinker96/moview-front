import React from 'react';
import {Paper, Typography} from "@mui/material";

const InfoCard = (props) => {

    const styles = {
        block: {
            marginTop: '70px',

            display: 'flex',
        },
        infoText: {
            padding: '40px',
            fontStyle: 'Poppins',
            fontWeight: 500,
            fontSize: '36px',
            lineHeight: '54px',
        },

    }

    const chooseDirection = () => {
        return props.invert ? 'row-reverse' : 'row';
    }

    return (
        <Paper elevation={3}>
            <div style={{...styles.block, flexDirection: chooseDirection()}}>
                <Typography sx={styles.infoText}>{props.text}</Typography>
                <img src={props.imagePath} alt={props.imageAlt}/>
            </div>
        </Paper>
    );
};

export default InfoCard;