import React from 'react';
import {Button, Container, List, ListItem, ListItemButton, Paper, Typography} from "@mui/material";
import logo from "../../../assets/pictures/logo.svg";
import vkIcon from "../../../assets/pictures/vk.svg";
import instagramIcon from "../../../assets/pictures/instagram.svg";
import telegramIcon from "../../../assets/pictures/telegram.svg";

const Footer = () => {

    const styles = {

        container: {
            fontStyle: 'Poppins',
            display: 'flex',
            justifyContent: 'center',
        },
        upLayer: {
            backgroundColor: '#625DCA',
        },
        downLayer: {
            backgroundColor: '#4D47C3',
        },
        logo: {
            padding: '30px 0',
        },
        sloganBlock: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        slogan: {
            fontSize: '32px',
            fontWeight: 500,
            color: '#FFFFFF',
        },
        bottomContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        bottomNavItemsBox: {
            height: '40px',
            width: '70%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        bottomNavList:{
            display: 'flex',
            justifyContent: 'center',
        },
        bottomNavItem: {
            fontStyle: 'Poppins',
            fontWeight: 400,
            fontSize: '18px',
            color: '#FFFFFF',
        },
        socialsBox:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        copyright:{
            fontStyle: 'Poppins',
            fontWeight: 400,
            fontSize: '14px',
            color: '#FFFFFF',
            padding: '14px 0 14px 0',
        }


    }

    const navigation = ['Home', 'Profile', 'Films', 'Your films'];
    const socials = [
        {
            alt: "Telegram icon.",
            icon: telegramIcon,
        },
        {
            alt: "Instagram icon.",
            icon: instagramIcon,
        },
        {
            alt: "Vk icon.",
            icon: vkIcon,
        },
    ]

    return (
        <Paper elevation={0} sx={styles.downLayer}>
            <Paper elevation={0} sx={styles.upLayer}>
                <Container style={styles.container}>
                    <div>
                        <img style={styles.logo} src={logo} alt={"Web application logo."}/>
                    </div>
                    <div style={styles.sloganBlock}>
                        <span style={styles.slogan}>There are not many movies!</span>
                    </div>
                </Container>
            </Paper>
            <Container style={{...styles.container, ...styles.bottomContainer}}>
                <List style={styles.bottomNavItemsBox}>
                    {navigation.map((item, index) => (
                        <ListItem key={item + "_" + index} disablePadding sx={styles.bottomNavList}>
                            <Button sx={styles.bottomNavItem} >{item}</Button>
                        </ListItem>
                    ))}
                </List>

                <List style={styles.socialsBox} disablePadding>
                    {socials.map((item, index) => (
                        <ListItem key={item.alt + "_" + index}>
                            <ListItemButton>
                                <img src={item.icon} alt={item.alt}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Typography sx={styles.copyright}>© Copyright 2022 - Moview</Typography>
            </Container>
        </Paper>
    );
};

export default Footer;