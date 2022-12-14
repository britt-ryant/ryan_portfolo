import React from 'react';

//import redux components
import { useSelector, useDispatch } from 'react-redux';

//import react-hot-toast
import {Toaster} from 'react-hot-toast';

//import MUI components
import { 
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
import MapIcon from '@mui/icons-material/Map';
import MenuIcon from '@mui/icons-material/Menu';
import CottageIcon from '@mui/icons-material/Cottage';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeIcon from '@mui/icons-material/Mode';
import MailIcon from '@mui/icons-material/Mail';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InsightsIcon from '@mui/icons-material/Insights';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CycloneTwoToneIcon from '@mui/icons-material/CycloneTwoTone';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import { alpha } from "@mui/material";
import FormDialog from '../FormComponents/FormDialog';
import TestDnd from './TestDnd';



//import react-router-dom components
import { Navigate } from 'react-router-dom';
import { deleteAccountReducer, editAccountFormReducer } from '../../redux/userSlice';
import {renderListReducer, renderReducer} from '../../redux/formSlice';
import { chartReducer, totalUserCountReducer, tableReducer } from '../../redux/adminSlice';
import AreYouSure from '../FormComponents/User/AreYouSure';
import { renderWeatherInfo } from '../../redux/weatherSlice';
import { renderMapReducer } from '../../redux/infoSlice';



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
    // const admin = useSelector(state => state.admin);
    const form = useSelector(state => state.form);
    // const weather = useSelector(state => state.weather);
    const initials = `${user.userInfo.first.charAt(0).toUpperCase()}${user.userInfo.last.charAt(0).toUpperCase()}`;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [mode, setMode] = React.useState("Light Mode");
    const [edit, setEdit] = React.useState(false);
    //const [adminComp, setAdminComp] = React.useState([{src: <AccountInfo />}, {src: <UserStats />}, {src: <WeatherComponent />}, {src: <NewUserChart />}, {src: <TableManager />}, {src: <MessageComponent />}])


    // React.useEffect(() => {
    //     // console.log(user);
    //     if(user.admin){
    //         console.log(`Admin!`);
    //     }
    // }, [user])


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
            case "User Totals":
                dispatch(totalUserCountReducer());
            break;
            case "Insights": 
                dispatch(chartReducer());
            break;
            case "Show Messages":
                dispatch(renderListReducer());
            break;
            case "Delete Account":
                dispatch(deleteAccountReducer());
            break;
            case "Weather":
                dispatch(renderWeatherInfo());
            break;
            case "Map":
                dispatch(renderMapReducer());
            break;
            case "SQL Tables":
                dispatch(tableReducer());
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
            case "Delete Account":
                return(<DeleteForeverIcon />);
            case "Insights":
                return(<InsightsIcon />);
            case "User Totals":
                return(<EmojiPeopleIcon />);
            case "Show Messages":
                return(<DynamicFeedIcon />);
            case "Weather":
                return (<CycloneTwoToneIcon />);
            case "Map":
                return (<MapIcon />);
            case "SQL Tables":
                return(<BackupTableRoundedIcon />)
            default:
                return(null);
        }
    };

    const sideBarRenderList = () => {
        if(user.admin){
            return ["Home", "Edit Account", "User Totals", "Weather", "Map", "Insights", "SQL Tables", "Show Messages"]
        } else {
            return ["Home", "Edit Account", "Send Message", "Weather", "Map", "Show Messages", "Delete Account"]
        }
    }
    
    const handleRedirect = () => {
        return setRedirect(true)
    }

    const handleFormClose = () => {
        dispatch(renderReducer());
    }


    return(
        <div>
            <Toaster 
                position='top-left'
                reverseOrder={true}
                />
                {/* Change here to reflect state in redux store */}
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
                            {sideBarRenderList().map((text, index) => (
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
                            
                            p: 5,
                            justifyContent: "left",
                            
                        }}>
                        <DrawerHeader theme={darkTheme}/>
                        <TestDnd   
                            admin={user.admin}
                                    />
                        {redirect ? <Navigate to='/' replace={true} /> : null}
                        {form.renderForm ? <FormDialog
                                                                        handleFormClose={handleFormClose} 
                                                                        successToast={props.successToast} 
                                                                         /> : null}
                        {user.renderForm.deleteAccount ? <AreYouSure handleRedirect={handleRedirect}/> : null}
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    )
};

export default SideBar;