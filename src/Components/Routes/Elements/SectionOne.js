import React from 'react';

import {motion} from 'framer-motion';



import {
    Button,
    Typography,
    Box,
    Switch,
    Slide,
    FormControlLabel,
    List, 
    ListItem
} from '@mui/material';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider
} from '@mui/material/styles'

const theme = createTheme();

theme.typography.h1 = {
    color: "#d6d6d6",
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    fontSize: '10rem',
    '@media (max-width: 800px)': {
        fontSize: '2.5rem'
    },
};
theme.typography.h3 = {
    color: "#d6d6d6",
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    fontSize: '2rem',
    '@media(max-width: 800px)': {
        fontSize: '.5rem'
    }
}

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

const SectionOne = (props) => {
    // const checked = React.useState(false);
    const [y, setY] = React.useState(-200);
    // const [x, setX] = React.useState(2000);
    // const [bottom, setBottom] = React.useState(-100);

    React.useEffect(()=> {
        setY(200);
        // setTimeout(()=> {
        //     setX(0)
        // }, 2500 )

    },[])

    return (
        <div className='wrapper'>
            <div>
                <ThemeProvider theme={theme}>
                <motion.div
                    className='test-motion'
                    animate={{y}}
                    transition={{type:"spring"}}
                    >
                            <Typography
                                    className='title'
                                    noWrap
                                    sx={{
                                        // border: 2s
                                        // p: 2,
                                        // paddingBottom:0,
                                    }}
                                    variant="h1" 
                                    gutterBottom
                            >Ryan Britt</Typography>
                                <motion.svg
                                className='line-container'

                                    initial="hidden"
                                    animate="visible"
                                    >
                                    <motion.line
                                                x1="0"
                                                x2="100%"
                                                stroke="#d6d6d6"
                                                strokeWidth={'1%'}
                                                variants={draw}
                                                custom={1}
                                            />

                                    </motion.svg>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, scale: 0.5}}
                        className='subtitle-motion'
                        animate={{opacity: 1, scale: 1}}
                        transition={{ease: "easeOut", duration: 2}}
                        >
                        <Typography
                                    variant='h3'
                                    >Web Developer | Software Engineer</Typography>
                    </motion.div>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default SectionOne;