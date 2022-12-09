import React from 'react';

//import redux components
import { useSelector, useDispatch } from 'react-redux';
import { PURGE } from 'redux-persist';
//import react-router-dom;
import { Navigate } from 'react-router-dom';
//import from react-scroll
import { Link } from 'react-scroll';

//import MUI components
import {
        AppBar,
        Box,
        Toolbar,
        Typography,
        Menu,
        Container,
        Avatar,
        Button,
        Tooltip,
        MenuItem,
        IconButton
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const navBarItems = ['Home', 'Tech', 'History', 'Contact'];
const userAvatarItems = ['User Profile', 'Log Out'];
const adminAvatarItems = ['Admin Dashboard', 'Purge Redux Store', 'Log Out'];

const NavMenu = (props) => {
    const user = useSelector(state => state.user);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [redirect, setRedirect] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setAnchorElUser(null)
    }, [user.loggedIn])
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
    };
    const handleRedirect = () => {
        setRedirect(true);
    }
    const purgeState = () => {

        dispatch({
            type: PURGE,
            key: 'root',
            result: () => null
        })
    }
    const handleLinkClick = (item) => {
        switch(item){
            case "Log Out":
                //console.log(`clicked the button Log Out`);
                props.handleLogOutClick();
            break;
            case "Log In":
                props.handleLogInRenderClick();
            break;
            case "Admin Dashboard":
                handleRedirect();
            break;
            case "User Profile":
                handleRedirect();
            break;
            case "Purge Redux Store":
                purgeState();
            break;
            default: 
                //console.log(`the link clicked is broken!`);
                return
        }
    }
    const handleTo = (item) => {
        switch(item){
            case "Home":
                return("section-one");
            case "Tech":
                return("section-two");
            case "History":
                return("section-three");
            // case "Goals":
            //     return("section-four");
            case "Contact":
                return("footer");
            default:
                return("section-one")
        }
    }
    const handleUserItemMenu = () => {
        return (
            userAvatarItems.map((item) => (
                <MenuItem key={item} onClick={() => handleLinkClick(item)}>
                    <Typography textAlign='center'>{item}</Typography>
                </MenuItem>
            ))
        )
    }
    const handleAdminItemMenu = () => {
        return(
            adminAvatarItems.map((item) => (
                <MenuItem key={item} onClick={() => handleLinkClick(item)}>
                    <Typography textAlign='center'>{item}</Typography>
                </MenuItem>
            ))
        )
    }
    return(
        <AppBar position='fixed' style={{ background: 'transparent', boxShadow: 'none'}}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    {/* <Typography>Hi</Typography> */}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical:'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}>
                                {navBarItems.map((item) => (
                                    <Link key={item} activeClass='active' className='section-link' to={handleTo(item)} spy={true} smooth={true} duration={500}>
                                        <MenuItem key={item} onClick={() => handleLinkClick(item)}>
                                            <Typography key={item} textAlign='center'>{item}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {navBarItems.map((item) => (
                            <Link key={item} activeClass='active' className='section-link' to={handleTo(item)} spy={true} smooth={true} duration={500}>
                                <Button
                                    key={item}
                                    onClick={() => handleLinkClick(item)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                {item}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {user.loggedIn ? <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p:0}}>
                                <Avatar>{`${user.userInfo.first[0].toUpperCase()}${user.userInfo.last[0].toUpperCase()}`}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }} 
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user.admin ? handleAdminItemMenu() : handleUserItemMenu()}
                        </Menu>
                    </Box>
                    : 
                    <Box sx={{flexGrow: 0}}>
                        <Button sx={{y: 2, color: 'white', display: 'block'}} onClick={() => handleLinkClick("Log In")}>Log In</Button>
                    </Box>}
                </Toolbar>
            </Container>
            {redirect ? <Navigate to={`/profile/${user.userInfo.id}`} replace={true} /> : null}
        </AppBar>
    )
    
};


export default NavMenu;