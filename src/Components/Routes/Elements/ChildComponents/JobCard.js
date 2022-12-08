import React from 'react';

//import framer-motion components
import {
    motion,
    useMotionValue,
    useTransform,
    useAnimation
} from 'framer-motion';

//import MUI components
import {
    Paper, 
    Typography,
    Divider,
    Button,
    Dialog,
    Box
} from '@mui/material';

const JobCard = (props) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 0, 200], [-50, 0, 50], {
        clamp: false
    });

    const handleDragEnd = (event, info) => {
        if(info.offset.x < -100){
            props.setExitX(-250)
            props.setIndex(props.index + 1)
        }
        if(info.offset.x > 100){
            props.setExitX(250)
            props.setIndex(props.index + 1)
        }
    }

    return (
        <motion.div 
            className='stack-container'
            style={{
                position: "absolute",
                top: "15vh", 
                x: x,
                rotate: rotate,
                // border: '2px solid red',
                cursor: "grab"
            }}
            whileTap={{cursor: "grabbing"}}
            drag={props.drag}
            dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
            onDragEnd={handleDragEnd}
            initial={props.initial}
            animate={props.animate}
            transition={props.transition}
            exit={{
                x: props.exitX,
                opacity: 0,
                scale: 0.5,
                transition: {duration: 0.2}
            }}>
                <Paper
                    sx={{height: ["30vh","55vh"], width: ["50vw", "30vw"], borderRadius: '5%', p: 4}}>
                        <Box 
                            sx={{boxShadow: 10}}>
                        <img
                            style={{ width: '90%', padding: '5%'}}
                            src={props.cardContents.image}
                            alt="logo"
                            draggable={false}/>

                            </Box>
                        <Divider />
                        <Typography
                            gutterBottom
                            sx={{
                                typography: {xs: 'body1', sm: 'body1', lg: 'h5'},
                                marginTop: '2.5%',
                                textAlign: 'left'
                                }}
                            >{props.cardContents.title}</Typography>
                        <Typography
                            gutterBottom
                            sx={{
                                typography: {xs: 'subtitle2', sm: 'body1', lg: 'h6'},
                                textAlign: 'left',
                                }}
                            >{props.cardContents.role}</Typography>
                        <Typography 
                            gutterBottom
                            color="primary"
                            sx={{
                                typography: {xs: 'caption', sm:'body2', lg: 'h7'},
                                textAlign: 'left',
                                // float: 'left',
                                width: '50%',
                                }}
                            >{props.cardContents.date}</Typography>
                            <Divider />
                            <Button 
                            disabled={false}
                            size="small"
                            variant="outlined"
                            sx={{boxShadow: 5, marginTop: ['2%', '10%']}}
                            onClick={props.renderDialog}
                            >Description</Button>
                </Paper>
            </motion.div>
       
    )
};


export default JobCard;