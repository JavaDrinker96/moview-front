import React, {useEffect, useState} from 'react';
import Bar from "../components/bar/Bar";
import Footer from "../components/footer/Footer";
import {Avatar, Box, Button, Container, Divider, Paper, Typography} from "@mui/material";
import {ACCESS_TOKEN} from "../../constants/security";
import {LOGIN_PATH} from "../../constants/pagePaths";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import image from "../../assets/pictures/pixeltrue-space-discovery-1 1.svg";
import axios from "axios";

const Profile = () => {

    const styles = {
        container: {
            fontStyle: 'Poppins',
            marginTop: '120px',
            minHeight: 'calc(100vh - 295px)',

            fontFamily: "Poppins",
        },
        wrapper: {
            display: 'flex',
            justifyContent: 'space-around',
        },
        avaBlock: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column'
        },
        avatar: {
            width: 300,
            height: 300,
            boxShadow: '0px 0px 5px rgba(77, 71, 195, 0.4)',
            marginBottom: '30px',
        },
        textBlock: {},
    }

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies([ACCESS_TOKEN]);
    const [userData, setUserData] = useState();

    const handleLogOut = () => {
        setCookie(ACCESS_TOKEN, '', {maxAge: -1})
        navigate(LOGIN_PATH);
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.accessToken}`;
        axios.get('http://localhost:8080/user/me')
            .then(response => {
                setUserData(response.data)
            })
    }, [])

    return (
        <div>
            <Bar pageName={"Profile"}/>
            <Container style={styles.container}>
                {
                    userData ?
                        <Box sx={styles.wrapper}>
                            <Box sx={styles.avaBlock}>
                                <Avatar
                                    alt="User Photo"
                                    src={image}
                                    sx={styles.avatar}
                                />
                                <Button variant="outlined" onClick={handleLogOut}>Logout</Button>
                            </Box>
                            <Box>
                                <Paper elevation={2} sx={{padding: '40px'}}>
                                    <p>
                                        <Typography variant="h6">
                                            Full name:
                                        </Typography>
                                        <Typography variant="h4">
                                            {userData.name}
                                        </Typography>
                                    </p>
                                    <Divider/>
                                    <p>
                                        <Typography variant="h6">
                                            Email:
                                        </Typography>
                                        <Typography variant="h5">
                                            {userData.email}
                                        </Typography>
                                    </p>
                                    <Divider/>
                                    <p>
                                        <Typography variant="h6">
                                            Birthday:
                                        </Typography>
                                        <Typography variant="h5">
                                            {userData.birthday}
                                        </Typography>
                                    </p>
                                </Paper>
                            </Box>
                        </Box>
                        : null
                }
            </Container>
            <Footer/>
        </div>
    );
};

export default Profile;