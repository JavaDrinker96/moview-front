import React from 'react';
import {Container, Typography} from "@mui/material";
import InfoCard from "../components/card/InfoCard";
import analysisImg from "../../assets/pictures/pixeltrue-data-analysis 1.svg";
import studyFromBooks from "../../assets/pictures/pixeltrue-study-from-books-1 1.svg";
import vision from "../../assets/pictures/pixeltrue-vision-1 1.svg";
import search from "../../assets/pictures/pixeltrue-search-1 2.svg";
import spaceDiscovery from "../../assets/pictures/pixeltrue-space-discovery-1 1.svg";
import Bar from "../components/bar/Bar";
import Footer from "../components/footer/Footer";

const Home = (props) => {

    const styles = {
        container: {
            fontStyle: 'Poppins',
            marginTop: '120px',
            minHeight: 'calc(100vh - 295px)'
        },
        mainText: {
            fontWeight: 600,
            fontSize: '50px',
            lineHeight: '75px',
            marginBottom: '20px'
        },
        infoText: {
            fontStyle: 'Poppins',
            fontWeight: 500,
            fontSize: '36px',
            lineHeight: '54px'
        },
        infoTextHighLighted: {
            color: '#4D47C3'
        }
    }

    const infoBlocks = [
        {
            text: "Follow the popularity of new films and not only.",
            imagePath: analysisImg,
            imageAlt: "Girl analyzes data."
        },
        {
            text: "Read reviews of other cinema lovers and leave your own.",
            imagePath: studyFromBooks,
            imageAlt: "Man read books."
        },
        {
            text: "Find people with the same interests.",
            imagePath: vision,
            imageAlt: "The girl looks through the telescope."
        },
        {
            text: "Look for new and interesting movies.",
            imagePath: search,
            imageAlt: "A guy walks with a dog and a magnifying glass."
        },
        {
            text: "Discover the cosmos of cinema art!",
            imagePath: spaceDiscovery,
            imageAlt: "Girl and cat astronauts in space."
        },
    ]

    return (
        <>
            <Bar pageName={"Home"}/>
            <Container style={styles.container}>
                <Typography sx={styles.mainText}>Moview</Typography>
                <Typography sx={styles.infoText}>This is a web application where you can learn anything about movies.
                    Share your impressions of watching movies with</Typography>
                <Typography sx={{...styles.infoText, ...styles.infoTextHighLighted}}> everyone around you.</Typography>
                {infoBlocks.map((item, index) => (
                    <InfoCard
                        key={'info_card_' + index}
                        invert={index % 2 === 0}
                        text={item.text}
                        imagePath={item.imagePath}
                        imageAlt={item.imagePath}
                    />
                ))}
            </Container>
            <Footer/>
        </>
    );
};

export default Home;