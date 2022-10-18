import React, {Component} from 'react';
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OAuth2RedirectHandler from "./security/oauth2/OAuth2RedirectHandler";
import SignIn from "./pages/sign-in/SignIn";
import {
    FILMS_PATH,
    HOME_PATH,
    LOGIN_PATH, MOVIE_PATH,
    OAUTH2_REDIRECT_PATH,
    PROFILE_PATH,
    REGISTER_PATH,
    YOUR_FILMS_PATH
} from "./constants/pagePaths";
import Films from "./pages/films/Films";
import Profile from "./pages/profile/Profile";
import YourFilms from "./pages/your_films/YourFilms";
import AuthChecker from "./hoc/AuthChecker";
import SkipAuth from "./hoc/SkipAuth";
import {CookiesProvider} from "react-cookie";
import Movie from "./pages/movie/Movie";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4d47c3',
            light: '#8373f7',
            dark: '#001f91'
        },
        secondary: {
            main: '#a7a3ff',
            light: '#dbd4ff',
            dark: '#7574cb'
        },
    },
});

class App extends Component {
    state = {
        authenticated: false,
        currentUser: null,
    };

    render() {
        return (
            <BrowserRouter>
                <CookiesProvider>
                    <ThemeProvider theme={theme}>
                        <Routes>

                            <Route path={HOME_PATH} element={
                                <AuthChecker>
                                    <Home/>
                                </AuthChecker>
                            }/>
                            <Route path={PROFILE_PATH} element={
                                <AuthChecker>
                                    <Profile/>
                                </AuthChecker>
                            }/>
                            <Route path={FILMS_PATH} element={
                                <AuthChecker>
                                    <Films/>
                                </AuthChecker>
                            }/>
                            <Route path={YOUR_FILMS_PATH} element={
                                <AuthChecker>
                                    <YourFilms/>
                                </AuthChecker>
                            }/>
                            <Route path={MOVIE_PATH} element={
                                <AuthChecker>
                                    <Movie/>
                                </AuthChecker>
                            }/>

                            <Route path={LOGIN_PATH} element={
                                <SkipAuth>
                                    <SignIn/>
                                </SkipAuth>
                            }/>
                            <Route path={REGISTER_PATH} element={
                                <SkipAuth>
                                    <SignUp/>
                                </SkipAuth>
                            }/>
                            <Route path={OAUTH2_REDIRECT_PATH} element={<OAuth2RedirectHandler/>}/>
                        </Routes>
                    </ThemeProvider>
                </CookiesProvider>
            </BrowserRouter>
        );
    }
}

export default App;