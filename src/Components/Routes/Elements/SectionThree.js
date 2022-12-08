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
//import MUI components
import {
        Dialog, 
        Button,
        Box
    } from '@mui/material';



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
                {image: tuna, color: '#d6d6d6', title: "Tuna"},
                {image: jl, color: '#d6d6d6', title: "Jenny Lee"},
                {image: sunset, color: '#d6d6d6', title: "Sunset"},
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

    // componentDidUpdate(){
    //     console.log(this.state.index);
    //     console.log(this.state.cards.length);
    // }

    handleOpenResume(){
        this.setState({renderResume: !this.state.renderResume})
    };
    handleOpenDescription(){
       // console.log("Clicked from the parent for ---> ", this.state.cards[this.state.index].title);
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
                {/* <div style={{position: "absolute", height: '75vh', width: '40vw', border: '2px solid black', marginTop: "10vh"}}> */}
                    <motion.div style={{
                        border: '2px solid red',
                        width: "100vw", 
                        height: "100vh", 
                        justifyContent: "center", 
                        display: 'flex', 
                        position: "absolute", 
                        // alignSelf: "center" 
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
                            marginTop: ['60vh','85vh'],
                            }}>
                        <Button onClick={this.handleOpenResume}>View PDF Resume</Button>
                    </Box>
                    {/* {this.state.cards.map((card) => {
                        return (<JobCard image={card.image} color={card.color} />)
                    })} */}
                {/* </div> */}
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