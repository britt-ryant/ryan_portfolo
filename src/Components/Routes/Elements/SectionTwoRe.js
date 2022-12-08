import React from 'react';

//import anitmation components
import { motion, useMotionValue, useSpring, domAnimation, LazyMotion, m} from 'framer-motion';

import { distance } from '@popmotion/popcorn';

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
        {
            component: cSharp, 
            name: 'C#', 
            description: `C# is a general-purpose, high-level multi-paradigm programming language. 
                                                    C# encompasses static typing, strong typing, lexically scoped, imperative, 
                                                    declarative, functional, generic, object-oriented, and component-oriented 
                                                    programming disciplines.` 
        },
        {
            component: expressJS, 
            name: 'ExpressJS',
            description: `Express.js, or simply Express, is a back end web application framework
                                for building RESTful APIs with Node.js, released as free and open-source software under 
                                the MIT License. It is designed for building web applications and APIs. It has been called 
                                the de facto standard server framework for Node.js.`
        },
        {
            component: javascript, 
            name: 'JavaScript',
            description: `JavaScript, often abbreviated as JS, is a programming language that is one 
                                of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of 
                                websites use JavaScript on the client side for webpage behavior, often incorporating 
                                third-party libraries.`
        },
        {
            component: java, 
            name: 'Java',
            description: `Java is a high-level, class-based, object-oriented programming language that is designed to have as few 
                                implementation dependencies as possible.`
        }
    ],[
        {
            component: amazonBucket, 
            name: 'Amazon S3',
            description: `Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage
                                through a web service interface. Amazon S3 uses the same scalable storage infrastructure 
                                that Amazon.com uses to run its e-commerce network.`
        },
        {
            component: rails, 
            name: 'Rails',
            description: `Ruby on Rails is a server-side web application framework written in Ruby under the MIT License. Rails is a model–view–controller 
                                (MVC) framework, providing default structures for a database, a web service, and web pages. `
        },
        {
            component: aws, 
            name: 'AWS Lambda',
            description: `AWS Lambda is an event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services. 
                                It is a computing service that runs code in response to events and automatically manages the computing resources required by that code.`
        },
        {
            component: apacheSpark, 
            name: 'Apache Spark',
            description: `Apache Spark is an open-source unified analytics engine for large-scale data processing. Spark provides an interface 
                                for programming clusters with implicit data parallelism and fault tolerance.`
        }
    ],[
        {
            component: mySQL, 
            name: 'MySQL',
            description: `MySQL is an open-source relational database management system. Its name is a combination of 'My', the name of co-founder Michael 
                                Widenius's daughter My, and 'SQL', the abbreviation for Structured Query Language. `
        },
        {
            component: nodeJs, 
            name: 'NodeJS',
            description: `Node.js is an open-source server environment. Node.js is cross-platform and runs on Windows, Linux, Unix, 
                                and macOS. Node.js is a back-end JavaScript runtime environment. Node.js runs on the V8 JavaScript Engine and executes 
                                JavaScript code outside a web browser. `
        },
        {
            component: postgreSQL, 
            name: 'PostgreSQL',
            description: `PostgreSQL, also known as Postgres, is a free and
                                open-source relational database management system emphasizing extensibility and SQL compliance. It was originally named POSTGRES, 
                                referring to its origins as a successor to the Ingres database developed at the University of California, Berkeley.`
        },
        {
            component: python, 
            name: 'Python',
            description: `Python is a high-level, general-purpose programming language. Its design philosophy
                                emphasizes code readability with the use of significant indentation. Python is dynamically-typed 
                                and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming.`
        }
    ],[
        {
            component: ruby, 
            name: 'Ruby',
            description: `Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms. 
                                It was designed with an emphasis on programming productivity and simplicity. In Ruby, everything is an object, including primitive data types.`
        },
        {
            component: react, 
            name: 'React',
            description: `React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. 
                                It is maintained by Meta and a community of individual developers and companies.`
        },
        {
            component: redux, 
            name: 'Redux',
            description: `Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly 
                                used with libraries such as React or Angular for building user interfaces. Similar to Facebook's Flux architecture, it was 
                                created by Dan Abramov and Andrew Clark.`
        },
        {
            component: github, 
            name: 'GitHub',
            description: `GitHub, Inc. is an Internet hosting service for software development and version control using Git. It provides 
                                the distributed version control of Git plus access control, bug tracking, software feature requests, task management, continuous 
                                integration, and wikis for every project. `
        }
    ]
]


const Square = ({ size, gap, active, setActive, colIndex, rowIndex, x, y, imgComp, setComp }) => {
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
        onDragEnd={() => setComp({
                                    image: imgComp.component, 
                                    title: imgComp.name, 
                                    description: imgComp.description,
                                    type: "tech"
                                })}
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
    const [comp, setComp] = React.useState({imgComp: null});
    const [windowSize, setWindowSize] = React.useState({x: window.innerWidth, y: window.innerHeight})
    const [size, setSize] = React.useState(150);
    const [gap, setGap] = React.useState(10);
    const [mobile, setMobile] = React.useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const bounceTransition = {
        y: {
            duration: 1,
            yoyo: Infinity,
            ease: "easeOut",
        }
    }

    React.useEffect(()=> {
        // windowResize();
        if(windowSize.x <= 680){
            setMobile(true);
            setSize(75);
            setGap(5)
        } else {
            setMobile(false);
            setSize(150);
            setGap(20)
        }  
        return window.onresize = windowResize
    }, [window.innerWidth])


    const handleWindowClose = () => {
        setComp({imgComp: null})
    };
    
    const windowResize = () => {
        setWindowSize({
            x: window.innerWidth,
            y: window.innerHeight
        })
    }
    return (
        <div className="app">
            {comp.imgComp !== null ? <DescriptionDialog handleWindowClose={handleWindowClose} comp={comp} /> : null}
        <div 
            className='ins-container'>
                <motion.div
                    transition={bounceTransition}
                    animate={{
                        y: ["400%", "-10%"],
                    }}>
                        <Typography sx={{color: '#d6d6d6'}}>Drag and drop logo for details</Typography>
                </motion.div>
            </div>
        <motion.div
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            style={{
            display: "flex",
            width: (size + gap) * 4 - gap,
            height: (size + gap) * 4 - gap,
            top: "50%",
            left: "50%",   
            transform: `translate(-50%, ${mobile ? '50%' : '15%'})`,
            position: "relative",
            perspective: 1000
            }}
          >
            {data.map((row, rowIndex) => 
                row.map((item, colIndex) => (
                    <Square
                        size={size}
                        gap={gap}
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