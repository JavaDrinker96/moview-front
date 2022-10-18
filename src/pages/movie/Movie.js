import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Rating,
    Stack,
    Typography
} from "@mui/material";
import Bar from "../components/bar/Bar";
import Footer from "../components/footer/Footer";
import {useLocation} from "react-router-dom";
import {useCookies} from "react-cookie";
import {ACCESS_TOKEN} from "../../constants/security";
import movieImg from "../../assets/pictures/movie.png"
import StarIcon from '@mui/icons-material/Star';
import Comment from "../components/commponent/Comment";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = (props) => {

    const styles = {
        container: {
            fontStyle: 'Poppins, Montserrat',
            marginTop: '120px',
            minHeight: 'calc(100vh - 295px)'
        },
        mainWrapper: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        movieAvatar: {
            padding: '30px'
        },
        movieInfoBlock: {
            flexGrow: 1,
            padding: '30px',
            fontStyle: 'Poppins, Montserrat',
        },
        title: {
            fontSize: '36px',
        },
        subtitleInfo: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        releaseDate: {
            fontSize: '22px',
        },
        duration: {
            fontSize: '22px',
        },
        description: {
            marginTop: '20px',
            fontSize: '22px',
        },
        commentsBlock: {
            marginTop: '30px',
            marginBottom: '30px',
        }
    }

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const getLabelText = (value) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const params = useLocation();
    const [cookies, setCookie] = useCookies([ACCESS_TOKEN]);

    const [movieId, setMovieId] = useState(params.state.id);
    const [movie, setMovie] = useState();

    const [comments, setComments] = useState([]);

    const [totalCount, setTotalCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginationParams, setPaginationParams] = useState({
        size: 3,
        direction: 'ASC',
        property: 'DATE',
    });

    const movieOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.accessToken}`,
        }
    }

    const reviewsOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.accessToken}`,
        }
    }

    const buildCommentParams = () => {
        return `?movieId=${movieId}
        &page=${currentPage}
        &size=${paginationParams.size}
        &direction=${paginationParams.direction}
        &property=${paginationParams.property}`
    }


    const fetchCommentsPage = () => {
        if (comments.length < totalCount) {
            let uri = `http://localhost:8080/review/all`.concat(buildCommentParams());
            fetch(uri, reviewsOptions)
                .then(response => response.json())
                .then(data => {
                    setComments([...comments, ...data.reviews]);
                    setCurrentPage((prevState => prevState + 1))
                    setTotalCount(data.totalElementsCount)
                })
        }
    }

    useEffect(() => {
        fetch(`http://localhost:8080/movie/${movieId}`, movieOptions)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
            });

        fetchCommentsPage();
    }, [])


    return (
        <div>
            <Bar pageName={props.pageName}/>
            <Container style={styles.container}>
                <Paper elevation={3} sx={styles.mainWrapper}>
                    <Box sx={styles.movieAvatar}>
                        <Avatar variant="rounded" src={movieImg} sx={{width: 240, height: 240}}/>
                    </Box>
                    <Box sx={styles.movieInfoBlock}>
                        <Typography sx={styles.title}>
                            {movie?.title}
                        </Typography>
                        <Box sx={styles.subtitleInfo}>
                            <Typography sx={styles.releaseDate}>
                                Date of release: {movie?.releaseDate}
                            </Typography>
                            <Typography sx={styles.duration}>
                                Duration: {movie?.duration}
                            </Typography>
                        </Box>
                        {movie?.rating
                            ? <Rating
                                readOnly
                                name="hover-feedback"
                                value={Math.round(movie.rating / 10)}
                                precision={0.5}
                                getLabelText={getLabelText}
                                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                            />
                            : null
                        }
                        <Divider/>
                        <Typography sx={styles.description}>
                            {movie?.description}
                        </Typography>
                        <Box>
                            {movie?.genres.map((item, index) => (
                                <Chip
                                    key={item.name + " " + index}
                                    label={item.name}
                                    variant="outlined"
                                    size="medium"
                                />
                            ))}
                        </Box>

                    </Box>
                </Paper>

                <Box elevation={3} sx={styles.commentsBlock}>
                    {comments.map((comment, index) =>
                        <Comment
                            key={`comment _${comment.id}_${index}`}
                            title={comment.title}
                            publicationDate={comment.publicationDate}
                            content={comment.content}
                            score={comment.score}
                        />
                    )}
                </Box>
                {
                    comments.length > 0
                        ? <Stack justifyContent="center" alignItems="center" sx={{padding: '20px'}}>
                            <Button variant="contained" onClick={fetchCommentsPage}>Show more</Button>
                        </Stack>
                        : null
                }
            </Container>
            <Footer/>
        </div>
    );
};

export default Movie;