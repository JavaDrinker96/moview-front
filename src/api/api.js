import {LOGIN_URL, REFRESH_TOKEN_URL} from "../constants/endpoints";

function saveToken(tokenData) {
    sessionStorage.setItem('tokenData', JSON.stringify(tokenData));
}

export function login(email, password) {
    return fetch(LOGIN_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((res) => {
            if (res.status === 200) {
                const tokenData = res.json();
                saveToken(JSON.stringify(tokenData));
            }
        });
}

function refreshToken(token) {

    return fetch(REFRESH_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
        }),
    })
        .then((res) => {
            if (res.status === 200) {
                const tokenData = res.json();
                //TODO: save new token to localStorage
                saveToken(JSON.stringify(tokenData));
                return Promise.resolve();
            }
            //TODO: remove token here
            return Promise.reject();
        });
}

export async function fetchWithAuth(url, options) {

    let tokenData = null;

    if (sessionStorage.tokenData) {
        tokenData = JSON.parse(localStorage.tokenData);
    } else {
        //TODO: navigate to login page
        return window.location.replace(LOGIN_URL);
    }

    if (!options.headers) {
        options.headers = {};
    }

    if (tokenData) {
        if (Date.now() >= tokenData.expiresOn * 1000) {
            try {
                const newToken = await refreshToken(tokenData.refreshToken);
                saveToken(newToken);
            } catch {
                //remove token here
                sessionStorage.removeItem(tokenData);
                //navigate to login page
                return window.location.replace(LOGIN_URL);
            }
        }

        options.headers.Authorization = `Bearer ${tokenData.accessToken}`;
    }

    return fetch(url, options);
}

