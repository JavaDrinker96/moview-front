import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {ACCESS_TOKEN} from "../../constants/security";
import {HOME_PATH, LOGIN_PATH} from "../../constants/pagePaths";
import {useCookies} from "react-cookie";

const OAuth2RedirectHandler = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cookie, setCookie] = useCookies([ACCESS_TOKEN]);
    const navigate = useNavigate();

    let token = searchParams.get('token');
    let expirationDays = searchParams.get('expirationDays');

    useEffect(() => {
        if (token) {
            let info = {
                accessToken: token,
                expires: expirationDays
            }

            console.log(info);
            let expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + Math.round(Number(expirationDays)));
            setCookie(ACCESS_TOKEN, token, {expires: expireDate})
            navigate(HOME_PATH)
        } else {
            navigate(LOGIN_PATH)
        }
    })

}

export default OAuth2RedirectHandler;