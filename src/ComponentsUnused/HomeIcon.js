import React from 'react';
import {Box, SvgIcon } from '@mui/material';



function HomeIcon(props) {
    return (
        <Box 
            sx={{
                '& > :not(style)': {m: 2,},
            }}>
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        </Box>
    );
  }

  export default HomeIcon;