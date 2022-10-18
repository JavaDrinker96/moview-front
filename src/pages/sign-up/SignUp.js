import React, {useState} from 'react';
import {Container,  TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import infoImg from "../../assets/pictures/girl-art.svg";
import InputField from "../components/fields/input/InputField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthButton from "../components/button/auth-button/AuthButton";
import ButtonDivider from "../components/divider/ButtonDivider";
import GoogleButton from "../components/button/google-button/GoogleButton";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import {GOOGLE_AUTH_URL} from "../../constants/security";
import axios from "axios";
import moment from 'moment';
import {LOGIN_PATH} from "../../constants/pagePaths";

const SignUp = () => {


    const styles = {
        page: {
            display: "flex",
            justifyContent: "center"
        },
        inputBlock: {
            display: "flex",
            flexFlow: "column nowrap"
        },
        container: {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontFamily: "Poppins",
        },

        mainText: {
            fontSize: "50px",
            fontWeight: "600",
            lineHeight: "75px",
            color: "#000"
        },
        mainSubText: {
            fontSize: "40px",
            fontWeight: "700",
            lineHeight: "75px",
            color: "#000",
            marginLeft: "75px"
        },
        infoSubTextBlock: {
            marginTop: "42px",

            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#000",
        },
        registerLink: {
            fontWeight: 600,
            color: "#474CC3",
            textDecoration: 'none',
        },
        picture: {
            marginTop: "26px",
            height: "442px",
            width: "652px"
        },

        label: {
            fontWeight: 500,
            fontSize: "30px",
            lineHeight: "45px",
            fontFamily: "Poppins",
        },

        birthdayField: {
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: "#F0EFFF",
            color: "#7872fa"
        },

    }


    const [signUpData, setSignUpData] = useState({
        firstName: null,
        lastName: null,
        name: null,
        birthday: dayjs(),
        email: null,
        password: null,
        confirmPassword: null
    })
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const changeState = (key, value) => {
        let newState = {...signUpData}
        newState[key] = value;
        setSignUpData(newState);
    }

    const handleClickShowPassword = () => {
        setPasswordVisibility(!passwordVisibility)
    };

    const handleClickShowConfirmPassword = () => {
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = () => {
        let requestBody = Object.assign(signUpData);
        let formattedBirthday = moment(requestBody.birthday).format('DD.MM.YYYY');

        requestBody.birthday = formattedBirthday;

        axios.post('http://localhost:8080/auth/signup', requestBody)
            .then(response => {
                console.log(response)
            })
    }

    return (
        <>
            <Container style={styles.container}>
                <div className={"page"} style={styles.page}>
                    <div className={"info-block"}>
                        <Typography style={styles.mainText}>Sign Up to</Typography>
                        <Typography style={styles.mainSubText}>Moview</Typography>

                        <div style={styles.infoSubTextBlock}>
                            <Typography>If you already have an account </Typography>
                            <Typography>You can
                                <Link style={styles.registerLink} to={LOGIN_PATH}> Login here !</Link>
                            </Typography>
                        </div>

                        <div style={styles.picture}>
                            <img src={infoImg} alt={"Art girl is drawing."}/>
                        </div>
                    </div>

                    <div className={"input-block"} style={styles.inputBlock}>
                        <Typography style={styles.label}>Sign Up</Typography>

                        <InputField
                            id="first-name"
                            label="First name"
                            type="text"
                            value={signUpData.firstName}
                            onChange={e => changeState('firstName', e.target.value)}
                        />

                        <InputField
                            id="last-name"
                            label="Last name"
                            type="text"
                            value={signUpData.lastName}
                            onChange={e => changeState('lastName', e.target.value)}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Birthday"
                                inputFormat="DD.MM.YYYY"
                                value={signUpData.birthday}
                                onChange={newValue => changeState('birthday', newValue)}
                                renderInput={(params) =>
                                    <TextField style={{marginTop: "20px"}} {...params}
                                               sx={{div: {...styles.birthdayField}}}/>
                                }/>
                        </LocalizationProvider>

                        <InputField
                            id="email"
                            label="Email"
                            type="email"
                            value={signUpData.email}
                            onChange={e => changeState('email', e.target.value)}
                        />

                        <InputField
                            id="password"
                            label="Password"
                            type={passwordVisibility ? "text" : "password"}
                            value={signUpData.password}
                            onChange={e => changeState('password', e.target.value)}
                            inputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {passwordVisibility ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <InputField
                            id="confirm-password"
                            label="Confirm password"
                            type={confirmPasswordVisibility ? "text" : "password"}
                            value={signUpData.confirmPassword}
                            onChange={e => changeState('password', e.target.value)}
                            inputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {confirmPasswordVisibility ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <AuthButton content={"Register"} onClick={handleRegister}/>
                        <ButtonDivider content={"-OR-"}/>
                        <GoogleButton content={"Sign Up with Google"} href={GOOGLE_AUTH_URL}/>
                    </div>
                </div>
            </Container>
        </>
    )
};

export default SignUp;