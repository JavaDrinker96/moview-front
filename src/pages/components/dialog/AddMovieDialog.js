import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers";
import axios from "axios";
import {useCookies} from "react-cookie";
import {ACCESS_TOKEN} from "../../../constants/security";
import moment from "moment";
import {newCustomEventEmitter} from 'react-custom-events';

const AddMovieDialog = (props) => {

    const emitter = newCustomEventEmitter()
    const [cookies, setCookie] = useCookies([ACCESS_TOKEN]);
    const [genres, setGenres] = useState([]);
    const [data, setData] = useState({
        title: '',
        description: '',
        releaseDate: dayjs(),
        duration: dayjs(),
        genreIds: [],
    });

    const changeData = (key, value) => {
        let newState = {...data}
        newState[key] = value;
        setData(newState);
    }

    const handleChangeAutocomplete = (event, valueArray, reason) => {

        let selectedGenresIds = genres
            .filter((genre) => valueArray.findIndex(value => value == genre.name) !== -1)
            .map(genre => genre.id);

        changeData('genreIds', selectedGenresIds);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/genre/all', {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setGenres(response.data);
            })
    }, [])

    const handleSave = () => {
        let requestBody = Object.assign(data);
        let formattedReleaseDate = moment(requestBody.releaseDate).format('DD.MM.YYYY');
        let formattedDuration = requestBody.duration.format('hh:mm:ss')
        requestBody.releaseDate = formattedReleaseDate;
        requestBody.duration = formattedDuration;

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.accessToken}`,
            },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:8080/movie', options)
            .then(res => {
                props.onSave();
            });
    }

    return (
        <Dialog
            maxWidth="md"
            fullWidth
            open={props.open}
            onClose={props.onClose}
            onCancel={props.onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="add-movie-dialog-title">
                {"Add new movie post"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    size="medium"
                    tabIndex={0}
                    margin="dense"
                    id="add-movie-title-field"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onChange={(e) => changeData('title', e.target.value)}
                />
                <TextField
                    size="medium"
                    tabIndex={1}
                    margin="dense"
                    id="add-movie-description-field"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows="5"
                    onChange={(e) => changeData('description', e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Release date"
                        inputFormat="DD.MM.YYYY"
                        value={data.releaseDate}
                        onChange={newValue => changeData('releaseDate', newValue)}
                        renderInput={(params) =>
                            <TextField
                                size="medium"
                                tabIndex={2}
                                margin="dense"
                                id="add-movie-description-field"
                                label="Release date"
                                type="text"
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                {...params}
                            />
                        }/>
                    <TimePicker
                        ampm={false}
                        openTo="hours"
                        views={['hours', 'minutes', 'seconds']}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        disableOpenPicker
                        label="Duration"
                        value={data.duration}
                        onChange={(newValue) => {
                            changeData('duration', newValue);
                        }}
                        renderInput={(params) =>
                            <TextField
                                size="medium"
                                tabIndex={3}
                                margin="dense"
                                id="add-movie-duration-field"
                                label="Release date"
                                type="text"
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                {...params}
                            />
                        }
                    />
                </LocalizationProvider>
                <Autocomplete
                    id="combo-box-demo"
                    options={genres.map(x => x.name)}
                    multiple
                    onChange={handleChangeAutocomplete}
                    renderInput={(params) => <TextField
                        size="medium"
                        tabIndex={4}
                        margin="dense"
                        id="add-movie-duration-field"
                        label="Genres"
                        type="text"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        {...params}
                    />}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button onClick={()=>{handleSave();props.onClose()}} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMovieDialog;