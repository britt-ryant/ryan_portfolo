import React from 'react';

//import anitmation components
import { motion, useMotionValue, useSpring, domAnimation, LazyMotion, m} from 'framer-motion';

import { distance} from '@popmotion/popcorn';

//import child components
import DescriptionDialog from '../Elements/ChildComponents/DescriptionDialog';


//import MUI components
import {
    Paper,
    ImageList,
    ImageListItem,
    Box,
    Dialog,
    Typography
} from '@mui/material';

//import tech logos
import amazonBucket from '../../../images/logos/amazonBuckets.png';
import apacheSpark from '../../../images/logos/apacheSpark.png';
import aws from '../../../images/logos/aws.png';
import cSharp from '../../../images/logos/cSharp.png';
//import express from '../../../images/logos/express.png';
import java from '../../../images/logos/java.png';
import lambda from '../../../images/logos/lambda.png';
import mySQL from '../../../images/logos/mySQL.png';
import nodeJs from '../../../images/logos/nodeJs.png';
import postgreSQL from '../../../images/logos/postgreSQL.png';
import python from '../../../images/logos/python.png';
import rails from '../../../images/logos/rails.png';
import ruby from '../../../images/logos/ruby.png';
import react from '../../../images/logos/react.png';
import redux from '../../../images/logos/redux.png';
import github from '../../../images/logos/github.png';
import javascript from '../../../images/logos/javascript.png';
import expressJS from '../../../images/logos/expressJS.png';

const data = [ 
    [             
        {component: cSharp, name: 'C#'},
        {component: expressJS, name: 'ExpressJS'},
        {component: javascript, name: 'JavaScript'},
        {component: java, name: 'Java'}
    ],[
        {component: amazonBucket, name: 'Amazon S3'},
        {component: rails, name: 'Rails'},
        {component: aws, name: 'AWS Lambda'},
        {component: apacheSpark, name: 'Apache Spark'}
    ],[
        {component: mySQL, name: 'MySQL'},
        {component: nodeJs, name: 'NodeJS'},
        {component: postgreSQL, name: 'PostgreSQL'},
        {component: python, name: 'Python'}
    ],[
        {component: ruby, name: 'Ruby'},
        {component: react, name: 'React'},
        {component: redux, name: 'Redux'},
        {component: github, name: 'GitHub'}
    ]
]

const size = 150;
const gap = 20;

const Square = ({ active, setActive, colIndex, rowIndex, x, y, imgComp, setComp }) => {
    const isDragging = colIndex === active.col && rowIndex === active.row;
    const d = distance(
      { x: active.col, y: active.row },
      { x: colIndex, y: rowIndex }
    );
    const springConfig = {
      stiffness: Math.max(700 - d * 120, 0),
      damping: 20 + d * 5
    };
    const dx = useSpring(x, springConfig);
    const dy = useSpring(y, springConfig);
    return (
        <motion.div
        drag
        dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
        dragTransition={{bounceStiffness: 500, bounceDamping: 20}}
        dragElastic={1}
        onDragStart={() => setActive({row: rowIndex, col: colIndex})}
        onDragEnd={() => setComp({img: imgComp.component, text: imgComp.name})}
        style={{
            background: 'linear-gradient(30deg, #787a79, #ebf0ed)',
            width: size,
            height: size,
            top: rowIndex * (size + gap),
            left: colIndex * (size + gap),
            position: 'absolute',
            borderRadius: '50%',
            x: isDragging ? x : dx,
            y: isDragging ? y : dy,
            zIndex: isDragging ? 1 : 0
        }} >
            <img 
                style={{marginTop: '10%' }}
                src={imgComp.component} 
                height="75%" 
                className='logo' 
                draggable={false}
                alt="logo" />
        </motion.div>
    )
}
const SectionTwoRe = (props) => {
    const [active, setActive] = React.useState({row: 0, col: 0});
    const [comp, setComp] = React.useState({imgComp: null})
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const bounceTransition = {
        y: {
            duration: 1,
            yoyo: Infinity,
            ease: "easeOut",
        }
    }
    const handleWindowClose = () => {
        setComp({imgComp: null})
    }
    React.useEffect(()=>{
    }, [comp])
    return (
        <div className="app">
            {comp.imgComp !== null ? <DescriptionDialog handleWindowClose={handleWindowClose} comp={comp} /> : null}
        <div 
            className='ins-container'
                style={{
                    width: '20%',
                    position: 'absolute',
                    marginTop: '20vh',
                    marginLeft: '5%'
                }}>
                <motion.div
                    transition={bounceTransition}
                    animate={{
                        y: ["100%", "-100%"],
                    }}>
                        <Typography sx={{color: '#d6d6d6'}}>Drag and drop logo for details</Typography>
                </motion.div>
            </div>
        <motion.div
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ width: "100%", height: "100%" }}
        >
          <motion.div
            style={{
            display: "flex",
            width: (size + gap) * 4 - gap,
            height: (size + gap) * 4 - gap,
            top: "50%",
            left: "50%",   
            transform: 'translate(-50%, 15%)',
            position: "relative",
            perspective: 1000
            }}
          >
            {data.map((row, rowIndex) => 
                row.map((item, colIndex) => (
                    <Square
                        x={x}
                        y={y}
                        active={active}
                        setActive={setActive}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        key={rowIndex + colIndex}
                        imgComp={item}
                        setComp={setComp}
                                                />
                )))}
          </motion.div>
        </motion.div>
      </div>
    )
}

export default SectionTwoRe