import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CameraOutdoorOutlinedIcon from '@mui/icons-material/CameraOutdoorOutlined';
import {Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import {FILMS_PATH, HOME_PATH, PROFILE_PATH, YOUR_FILMS_PATH} from "../../../constants/pagePaths";

const Bar = (props) => {

    const styles = {

        navItemText: {
            fontStyle: 'Poppins',
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '24px',

            color: '#414141',
        },
        menuName: {
            fontStyle: 'Poppins',
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '24px',
            textAlign: 'center',

            color: '#414141',
        },
        navItemIcon: {
            fontSize: '32px'
        }

    }

    const [openMenu, setOpenMenu] = useState(false);

    const menuItems = [
        {
            icon: <CameraOutdoorOutlinedIcon sx={styles.navItemIcon}/>,
            name: "Home",
            linkTo: HOME_PATH,
        },
        {
            icon: <AccountCircleOutlinedIcon sx={styles.navItemIcon}/>,
            name: "Profile",
            linkTo: PROFILE_PATH,
        },
        {
            icon: <MovieFilterOutlinedIcon sx={styles.navItemIcon}/>,
            name: "Films",
            linkTo: FILMS_PATH,
        },
        {
            icon: <BookOutlinedIcon sx={styles.navItemIcon}/>,
            name: "Your films",
            linkTo: YOUR_FILMS_PATH,
        }
    ]


    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => setOpenMenu(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {props.pageName}
                    </Typography>
                    {props.rightButton}
                </Toolbar>
            </AppBar>

            <Drawer PaperProps={{sx: {width: '15%'}}} open={openMenu} onClose={() => setOpenMenu(false)}>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        <ListItem key={"menu_item"} disablePadding>
                            <ListItemText primary={
                                <Typography sx={styles.menuName}>
                                    MOVIEW MENU
                                </Typography>
                            }/>
                        </ListItem>
                        <Divider/>
                        {menuItems.map((item, index) => (
                            <ListItem key={item.name + "_" + index} disablePadding  component={Link} to={item.linkTo}>
                                <ListItemButton>
                                        <ListItemIcon sx={styles.navItemIcon}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography sx={styles.navItemText}>
                                                {item.name}
                                            </Typography>
                                        }/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Bar;