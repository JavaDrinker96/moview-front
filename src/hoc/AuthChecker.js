import React from 'react';
import {Navigate} from "react-router-dom";
import {LOGIN_PATH} from "../constants/pagePaths";
import {ACCESS_TOKEN} from "../constants/security";
import {useCookies} from "react-cookie";

const AuthChecker = ({children}) => {

        if (sessionStorage.tokenData) {
        tokenData = JSON.parse(localStorage.tokenData);
    }
    const [cookie, setCookie] = useCookies([ACCESS_TOKEN]);

    if (cookie.accessToken == null) {
        return <Navigate to={LOGIN_PATH}/>
    }

    return (
        children
    );
};

export default AuthChecker;