import React from 'react';
//import react-pdf to render resume
import {Document, Page, pdfjs} from 'react-pdf';
//import child components
import JobCard from './ChildComponents/JobCard';
import DescriptionDialog from './ChildComponents/DescriptionDialog';
//import framer-motion and related components
import { motion, AnimatePresence, } from 'framer-motion';
import move from 'lodash-move';
//import PDF resume file
import Resume from '../../../Pdf/Ryan Britt Resume_2022.pdf';
//import images
import tuna from '../../../images/gbft.jpeg';
import jl from '../../../images/jl.jpeg';
import sunset from '../../../images/sunset.jpeg';
import code from '../../../images/codescreenshot.jpg';
import cad from '../../../images/h2dwg.JPG';
import h2 from '../../../images/h2GA.JPG'
//import MUI components
import {
        Dialog, 
        Button,
        Box,
        Typography,
    
    } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default class SectionThree extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageNumber: 1,
            numPages: 2,
            renderResume: false,
            renderDescription: false,
            cards: [
                {
                title: "GalaxE. Solutions",
                role: "Software Engineer | Webb Developer", 
                description: [
                    [`Built applications using React, Redux, Express, NodeJS, .NET, SQL, PostgreSQL`],
                    [`Finished training on AWS Cloud Services such as S3, Lambda, EC2, AWS-Cloud Trial and Cloud Watch`],
                    [`Worked on a client project that was built with React, Redux, AWS, Python, and PostgreSQL`],
                ], 
                date: `07/2022-Present`,
                image: code
                },
                {
                title: "Griffin Marine",
                role: "CAD Designer | Electrical Engineer", 
                description: [
                    [`Created and maintained detailed CAD drawings for vessels in progress`],
                    [`Performed vessel installations and improvements including mechanical, and electrical`],
                ], 
                date: `03/2022-07/2022`,
                image: cad
                },
                {
                title: "Jenny Lee SportFishing",
                role: "Business Owner", 
                description: [
                    [`Built and grew an existing small business 
                    into a business of a much larger scale both 
                    in size of clientele and recognition/internet presence`],
                    [`Captained an offshore charter/commercial vessel 
                    year-round in both Manasquan, NJ and Wanchese, NC`],
                    [`Performed vessel maintenance and improvements 
                    including mechanical, structural, and electrical work`],
                    [`Managed various employees both on and off the vessel`]
                ], 
                date: `07/2018-11/2021`,
                image: tuna
                },
                {
                title: "Gibbs and Cox",
                role: "Naval Architect | Marine Engineer", 
                description: [
                    [`Refined ship superstructure designs using 3D modeling software including Solidworks, AutoCad and Rhino 3D`],
                    [`Developed ship general arrangements including floor plans, equipment specs, and egress/escape routing`],
                    [`Assumed role as lead engineer for developing interior volume estimates utilizing GHS software `],
                ], 
                date: `08/2014-03/2016`,
                image: h2
                },

            ],
            exitX: "100%",
            index: 0
        }
        this.handleOpenResume = this.handleOpenResume.bind(this);
        this.handleOpenDescription = this.handleOpenDescription.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.setExitX = this.setExitX.bind(this);
        this.setIndex = this.setIndex.bind(this);
    }

    handleOpenResume(){
        this.setState({renderResume: !this.state.renderResume});
    };
    handleOpenDescription(){
        this.setState({renderDescription: !this.state.renderDescription});
    }

    handlePage(){
        if(this.state.pageNumber === 1){
            this.setState({pageNumber: 2})
        } else {
            this.setState({pageNumber: 1})
        }
    }

    setExitX(val){
        this.setState({exitX: val});
    };
    setIndex(val){
        if(val === this.state.cards.length){
            this.setState({index: 0})
        } else {
            this.setState({index: val})
        }
    }

    render(){
        let totalLength = this.state.cards.length;
        let nextIndex = this.state.index + 1;
        return(
            <div className='inner-section-container three'>
                <Box sx={{width: '100vw', position: 'absolute', marginTop: ['10vh', '10vh']}}>
                    <Typography sx={{color: '#d6d6d6'}}>Swipe to See Experience</Typography>
                    </Box>
                <motion.div
                        transition={{x: {
                            duration: 1,
                            yoyo: Infinity,
                            ease: "easeOut"
                        }}}
                        animate={{
                            x: ["-1%", "1%"]
                        }}>
                    <Box sx={{
                            height: '100vh', 
                            position: 'absolute', 
                            marginLeft: ["0%",'13%','23%']
                            }}>
                                <ArrowBackIosNewIcon 
                                                fontSize='large' 
                                                sx={{
                                                    color: '#d6d6d6', 
                                                    marginTop:['30vh','45vh']
                                                    }}/>
                    </Box>
                </motion.div>
                <motion.div
                        transition={{x: {
                            duration: 1,
                            yoyo: Infinity,
                            ease: "easeOut"
                        }}}
                        animate={{
                            x: ["1%", "-1%"]
                        }}>
                    <Box sx={{
                            height: '100vh', 
                            position: 'absolute', 
                            marginLeft: ["90%",'85%','75%']
                            }}>
                                <ArrowForwardIosIcon 
                                                fontSize='large' 
                                                sx={{
                                                    color: '#d6d6d6', 
                                                    marginTop:['30vh','45vh']
                                                    }}/>
                    </Box>
                </motion.div>
                    <motion.div style={{
                        width: "100vw", 
                        height: "100vh", 
                        justifyContent: "center", 
                        display: 'flex', 
                        position: "absolute",
                        }}>
                        <AnimatePresence initial={false}>
                            <JobCard
                                key={this.state.index + 1}
                                initial={{scale: 0, y: 50, opacity: 0}}
                                animate={{scale: 0.75, y: 55, opacity: 0.5}}
                                transition={{
                                    scale: {duration: 0.2},
                                    opacity: {duration: 0.4}
                                }}
                                cardContents={totalLength === nextIndex ? this.state.cards[0] : this.state.cards[nextIndex]} />
                                <JobCard
                                    key={this.state.index}
                                    initial={{scale: 1, y: 0, opacity: 1}}
                                    animate={{scale: 1, y: 0, opacity: 1}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300, 
                                        damping: 20,
                                        opacity: {duration: 0.2},
                                    }}
                                    exitX={this.state.exitX}
                                    setExitX={this.setExitX}
                                    index={this.state.index}
                                    setIndex={this.setIndex}
                                    cardContents={this.state.cards[this.state.index]}
                                    drag="x"
                                    renderDialog={this.handleOpenDescription}
                                    />
                        </AnimatePresence>
                    </motion.div>
                    <Box 
                        sx={{position: 'absolute',
                            width: '100%',
                            marginTop: ['65vh','85vh'],
                            }}>
                        <Button onClick={this.handleOpenResume}>View PDF Resume</Button>
                    </Box>
                {this.state.renderDescription ? 
                    <DescriptionDialog
                        open={this.handleOpenDescription}
                        handleWindowClose={this.handleOpenDescription}
                        comp={this.state.cards[this.state.index]}
                        type="job"
                        fullWidth
                        sx={{height: '100vh'}}/> : null}
                {this.state.renderResume ? 
                    <Dialog 
                        open={this.handleOpenResume}
                        onClose={this.handleOpenResume}
                        fullWidth
                        sx={{height: '100vh'}}>
                        <Document file={Resume}  >
                            <Page pageNumber={this.state.pageNumber} />
                        </Document>
                        <Button onClick={this.handlePage}>{this.state.pageNumber === 1? "Next Page" : "Previous Page"}</Button>
                    </Dialog> : null}
            </div>
        )
    }
}