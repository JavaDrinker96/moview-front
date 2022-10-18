import React from 'react';
import FilmPageComponent from "../components/filmPageComponent/FilmPageComponent";

const YourFilms = () => {

    return <FilmPageComponent pageName="Your films" forCurrentUser={true}/>

};

export default YourFilms;