import React, {useState} from 'react';
import {Container, Typography} from "@mui/material";
import {Link} from "react-router-dom"
import SignInStyles from "./SignInStyles";
import infoImg from "../../assets/pictures/pixeltrue-idea-1 1.svg"
import InputField from "../components/fields/input/InputField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import AuthButton from "../components/button/auth-button/AuthButton";
import ButtonDivider from "../components/divider/ButtonDivider";
import GoogleButton from "../components/button/google-button/GoogleButton";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../../constants/security";
import axios from "axios";
import {Cookies, useCookies} from "react-cookie"
import {HOME_PATH, REGISTER_PATH} from "../../constants/pagePaths";
import {useNavigate} from "react-router-dom";
import {getTokenData} from "../../api/api";

const SignIn = () => {

    const styles = {
        page: {
            display: "flex",
            justifyContent: "center"
        },
        inputBlock: {
            display: "flex",
            flexFlow: "column nowrap"
        }
    }

    const [signInData, setSignInData] = useState({
        email: null,
        password: null
    });

    const [cookie, setCookie] = useCookies([ACCESS_TOKEN]);

    const changeState = (key, value) => {
        let newState = {...signInData}
        newState[key] = value;
        setSignInData(newState);
    }

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setPasswordVisibility(!passwordVisibility)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        const loginOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signInData)
        }
        fetch('http://localhost:8080/auth/login', loginOptions)
            .then(response => response.json())
            .then(data => {
                let expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + Math.round(data.expirationDays));
                setCookie(ACCESS_TOKEN, data.accessToken, {expires: expireDate})
                navigate(HOME_PATH);
            })

    }

    return (
        <Container style={SignInStyles.container}>
            <div className={"page"} style={styles.page}>
                <div className={"info-block"}>
                    <Typography style={SignInStyles.mainText}>Sign in to</Typography>
                    <Typography style={SignInStyles.mainSubText}>Moview</Typography>

                    <div style={SignInStyles.infoSubTextBlock}>
                        <Typography>If you don’t have an account register</Typography>
                        <Typography>You can
                            <Link style={SignInStyles.registerLink} to={REGISTER_PATH}> Register here !</Link>
                        </Typography>
                    </div>

                    <div style={SignInStyles.picture}>
                        <img src={infoImg} alt={"Art girl with laptop."}/>
                    </div>
                </div>

                <div className={"input-block"} style={styles.inputBlock}>
                    <Typography style={SignInStyles.label}>Sign in</Typography>
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        value={signInData.email}
                        onChange={(e) => changeState('email', e.target.value)}
                    />

                    <InputField
                        id={passwordVisibility ? "text" : "password"}
                        label="Password"
                        type={passwordVisibility ? "text" : "password"}
                        value={signInData.password}
                        onChange={(e) => changeState('password', e.target.value)}
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

                    <AuthButton content={"Login"} onClick={handleLogin}/>
                    <ButtonDivider content={"-OR-"}/>
                    <GoogleButton content={"Log In with Google"} href={GOOGLE_AUTH_URL}/>
                </div>
            </div>
        </Container>
    )
};

export default SignIn;