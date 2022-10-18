import React from 'react';
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import {Navigate} from "react-router-dom";
import {HOME_PATH, LOGIN_PATH} from "../constants/pagePaths";
import {ACCESS_TOKEN} from "../constants/security";
import {useCookies} from "react-cookie";

const SkipAuth = ({children}) => {
    const [cookie, setCookie] = useCookies([ACCESS_TOKEN]);

    if (cookie.accessToken != null && (children.type.name === SignIn.name || children.type.name === SignUp.name)) {
        return <Navigate to={HOME_PATH}/>
    }

    return (
        children
    );
};

export default SkipAuth;