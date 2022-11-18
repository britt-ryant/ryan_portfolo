import React from 'react';

//import redux components
import { useSelector, useDispatch } from 'react-redux';

//import react-hot-toast
import {Toaster} from 'react-hot-toast';

//import MUI components
import { 
    Container,
    Grid,
    Avatar,
    Box, 
    Toolbar, 
    CssBaseline, 
    Typography, 
    IconButton, 
    Button, 
    Divider, 
    Stack } from '@mui/material';
    import ListItem from '@mui/material/ListItem';
    import ListItemButton from '@mui/material/ListItemButton';
    import ListItemIcon from '@mui/material/ListItemIcon';
    import ListItemText from '@mui/material/ListItemText';
    import MuiDrawer from '@mui/material/Drawer';
    import MuiAppBar from '@mui/material/AppBar';
    import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
    import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {styled, useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CottageIcon from '@mui/icons-material/Cottage';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeIcon from '@mui/icons-material/Mode';
import MailIcon from '@mui/icons-material/Mail';
import { alpha } from "@mui/material";
import ProfileInfo from '../../ComponentsUnused/ProfileInfo';
import AccountInfo from './ProfileComponents/AccountInfo';
import MessageComponent from './ProfileComponents/MessageComponent';


//import react-router-dom components
import { Navigate } from 'react-router-dom';
import FormDialog from '../FormComponents/FormDialog';
import { editAccountFormReducer } from '../../redux/userSlice';
import {renderReducer} from '../../redux/formSlice';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
})
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')] : {
        width: `calc(${theme.spacing(8.5)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));


const SideBar = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const form = useSelector(state => state.form);
    const initials = `${user.userInfo.first.charAt(0).toUpperCase()}${user.userInfo.last.charAt(0).toUpperCase()}`;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [mode, setMode] = React.useState("Light Mode");
    const [edit, setEdit] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false)
    };

    const handleClick = (button) => {
        console.log("clicked", button);
        switch(button){
            case "Home":
                setRedirect(true);
            break;
            case "Edit Account":
                dispatch(editAccountFormReducer());
            break;
            case "Send Message":
                dispatch(renderReducer())
            break;
            case "Light Mode": 
                setMode("Dark Mode");
            break;
            case "Dark Mode":
                setMode("Light Mode");
            break;
            default:
                console.log('Something went wrong!');
        }
    }

    const iconSelector = (icon) => {
        switch(icon){
            case "Home":
                return(<CottageIcon />);
            case "Edit Account":
                return(<ModeIcon />);
            case "Send Message":
                return(<MailIcon />);
            case "Light Mode":
                return(<DarkModeIcon/>);
            case "Dark Mode":
                return(<LightModeIcon />);
            default:
                return(null);
        }
    };

    const successToast = () => {
        console.log("success Toast Sidebar");
    }


    return(
        <div>
            <Toaster 
                position='top-left'
                reverseOrder={true}
                />
            <ThemeProvider theme={mode === "Dark Mode" ? darkTheme : lightTheme}>
            <CssBaseline />
                <Box sx={{ display: 'flex'}}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open} style={{background: alpha('#031D40', 1)}}>
                        <Toolbar>
                            <IconButton 
                                color="inherit"
                                aria-label='open drawer'
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5, 
                                    ...(open && {display: 'none'}),
                                }}
                            >
                            <MenuIcon />
                            </IconButton>
                            <Avatar >{initials}</Avatar>
                            <Typography variant='h6' noWrap component="div" sx={{p: 2}}>
                                {user.userInfo.first} {user.userInfo.last}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <Stack>
                            <ListItem key="mode" disablePadding sx={{ display: 'block'}}>
                                    <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial': 'center',
                                                px: 2.5,
                                            }}
                                            onClick={() => handleClick(mode)}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {iconSelector(mode)}
                                            </ListItemIcon>
                                            <ListItemText primary={mode === "Light Mode"? "Dark Mode" : "Light Mode"} sx={{opacity: open ? 1 : 0}} />
                                    </ListItemButton>
                                </ListItem>
                            <Divider />
                            {['Home', 'Edit Account', 'Send Message'].map((text, index) => (
                                <ListItem key={text} disablePadding sx={{ display: 'block'}}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial': 'center',
                                            px: 2.5,
                                        }}
                                        onClick={() => handleClick(text)}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {iconSelector(text)}
                                        </ListItemIcon>
                                        <ListItemText primary={text} sx={{opacity: open ? 1 : 0}} />
                                </ListItemButton>
                                </ListItem>
                            ))}

                        </Stack>
                        <Divider />
                    </Drawer>
                    <Box component="main" 
                        sx={{ 
                            backgroundColor: (theme) => 
                                theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[700],
                            flexGrow: 1, 
                            p: 3,
                            justifyContent: "left",
                            width: '100vw',
                            height: '100vh'
                        }}>
                        <DrawerHeader theme={darkTheme}/>
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, marginLeft: 1}}>
                            <Grid container spacing={3} >
                                <Grid item xs={12} md={8} lg={9}>
                                    <AccountInfo 
                                                successToast={successToast}
                                                renderEdit={edit}/>
                                    <MessageComponent 
                                                successToast={successToast}
                                                />
                                </Grid>
                            </Grid>
                        </Container>
                        {redirect ? <Navigate to='/' replace={true} /> : null}
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    )
};

export default SideBar;