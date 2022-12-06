import React from 'react';
import './App.css';
import PageRouter from './Components/PageRouter';
import {styled, useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import {green} from "@mui/material/colors";
import { Typography, useMediaQuery} from '@mui/material';


const App = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));

  const sizes = () => {
    if (desktop) return "large";
    if (tablet) return "medium";
    if (mobile) return "small";
  };
  return (
    <div className="App">
        <PageRouter size={sizes()}/>
        {/* <Typography>Hey there</Typography> */}
    </div>

  );
}

export default App;
