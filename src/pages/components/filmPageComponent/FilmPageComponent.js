import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {ACCESS_TOKEN} from "../../../constants/security";
import axios from "axios";
import Bar from "../bar/Bar";
import {Button, Card, CardActions, CardContent, CardMedia, Container, Pagination, Typography} from "@mui/material";
import SearchField from "../fields/search/SearchField";
import image from "../../../assets/pictures/pixeltrue-space-discovery-1 1.svg";
import Footer from "../footer/Footer";
import AddMovieDialog from "../dialog/AddMovieDialog";
import {useNavigate} from "react-router-dom";
import {MOVIE_PATH} from "../../../constants/pagePaths";


const FilmPageComponent = (props) => {

    const styles = {
        container: {
            fontStyle: 'Poppins',
            marginTop: '120px',
            minHeight: 'calc(100vh - 295px)'
        },
        cards: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '60px 20px',
        },
        card: {
            display: 'flex',
            justifyContent: 'center',
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0'
        },
        notFoundBlock: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.54)'
        }
    }

    const [films, setFilms] = useState({});
    const [findingData, setFindingData] = useState({
        id: null,
        title: '',
        page: 1,
        size: 6,
        direction: "ASC",
        property: "TITLE",
        forCurrentUser: props.forCurrentUser,
    });
    const [cookies, setCookies] = useCookies([ACCESS_TOKEN]);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getDataByPageNumber(null, 1);
    }, [])

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const getDataByPageNumber = (event, pageNumber) => {
        let newData = Object.assign(findingData);
        newData.page = pageNumber;
        setFindingData(newData);
        sendData();
    }
    const handleChangeSearchField = (content) => {
        let newData = Object.assign(findingData);
        newData.title = content;
        newData.page = 1;
        setFindingData(newData);
        sendData();
    }

    const sendData = () => {
        let request = {...findingData};
        request.page = findingData.page - 1;

        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.accessToken}`;
        axios.defaults.headers.common['Content-type'] = 'application/json';
        axios.get('http://localhost:8080/movie/all', {params: {...request}})
            .then(response => {
                console.log('send data', response.data)
                setFilms(response.data)
            })
    }

    const handleReadMore = (id) => {
        navigate(MOVIE_PATH, {
            state: {id}
        })
    }

    return (
        <div>
            <Bar
                pageName={props.pageName}
                rightButton={
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{color: 'white'}}
                        onClick={handleClickOpen}

                    >Add movie</Button>
                }
            />
            <AddMovieDialog
                open={openDialog}
                onCancel={handleClose}
                onClose={handleClose}
                onSave={sendData}
            />
            <Container style={styles.container}>
                <SearchField
                    label={"Title of movie"}
                    onChange={(e) => handleChangeSearchField(e.target.value)}
                />
                <div style={styles.cards}>
                    {films?.movies?.map((item, index) => (
                        <div style={styles.card} key={item.title + "_" + index}>
                            <Card sx={{maxWidth: 346}} elevation={3}>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" noWrap>
                                        {item.title}
                                    </Typography>
                                    <div style={{overflow: "hidden", textOverflow: "clip", height: '120px'}}>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        Duration: {item.duration}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{display: 'flex', justifyContent: 'flex-end', padding: '0 20px 16px 0'}}>
                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        onClick={() => handleReadMore(item.id)}
                                    >
                                        Read more
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </div>
                <div style={styles.pagination}>
                    {films.pagesCount != null && films.pagesCount > 0 ?
                        (<Pagination count={films.pagesCount} color="primary"
                                     page={findingData.page}
                                     onChange={(event, pageNumber) => getDataByPageNumber(event, pageNumber)}/>)
                        : <div style={styles.notFoundBlock}>
                            <Typography variant="h3">Sorry, we didn't find anything.</Typography>
                            <Typography variant="h3" sx={{marginTop: '30px'}}>┐(￣ヘ￣;)┌</Typography>
                        </div>
                    }
                </div>
            </Container>
            <Footer/>
        </div>
    );
};

export default FilmPageComponent;