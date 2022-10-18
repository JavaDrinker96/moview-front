import React from 'react';
import {Avatar, Box, Card, CardContent, CardHeader, Rating, Stack, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {red} from "@mui/material/colors";

const Comment = (props) => {

    const styles = {

        card:{
          marginTop: '16px',
        },
        text: {
            fontStyle: 'Poppins, Montserrat',
        }
    }

    return (
        <>
            <Card sx={styles.card}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={props.title}
                    subheader={props.publicationDate}
                />
                <CardContent>
                    <Typography variant="body2" sx={styles.text}>
                        {props.content}
                    </Typography>
                    <Rating
                        readOnly
                        name="hover-feedback"
                        value={Math.round(props.score / 10)}
                        precision={0.5}
                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default Comment;