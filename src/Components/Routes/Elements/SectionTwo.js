import React from 'react';

//import tech logos
import amazonBucket from '../../../images/logos/amazonBuckets.png';
import apacheSpark from '../../../images/logos/apacheSpark.png';
import aws from '../../../images/logos/aws.png';
import cSharp from '../../../images/logos/cSharp.png';
import expressJS from '../../../images/logos/express.png';
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

//import MUI components
import {
        Box,
        ImageList,
        ImageListItem, 
        ImageListItemBar,
        alpha,
        Paper,
        Typography
} from '@mui/material';
import { color } from '@mui/system';





class SectionTwo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            techLogos: [    
                        {component: amazonBucket, name: 'Amazon S3'},
                        {component: lambda, name: 'AWS Lambda'},
                        {component: aws, name: 'AWS'},
                        {component: apacheSpark, name: 'Apache Spark'},
                        {component: cSharp, name: 'C#'},
                        {component: expressJS, name: 'ExpressJS'},
                        // {component: html, name: 'Html JavaScript Css'},
                        {component: java, name: 'Java'},
                        {component: mySQL, name: 'MySQL'},
                        {component: nodeJs, name: 'NodeJS'},
                        {component: postgreSQL, name: 'PostgreSQL'},
                        {component: python, name: "Python"},
                        {component: ruby, name: 'Ruby'},
                        // {component: rails, name: 'Rails'},
                        {component: react, name: 'React'},
                        {component: redux, name: 'Redux'},
                        // {component: github, name: 'GitHub'}
                    ]
        }
        this.updateWindowDim = this.updateWindowDim.bind(this);
    }

    componentDidMount(){
        //console.log(this.state);
        this.updateWindowDim();
        window.addEventListener('resize', this.updateWindowDim);
    };

    // componentDidUpdate(){
    //     console.log(this.state.height, this.state.width);
    // }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDim);
    }

    updateWindowDim(){
        this.setState({ width: window.innerWidth, height: window.innerHeight})
    }

    render(){
        return(
            <div className='inner-section-container two'>
                    <Box 
                        sx={{ 
                        position: 'absolute',
                        width: '30%', 
                        transform: "translate(233%)",
                        height: '100vh', 
                        overflowY: 'scroll' , 
                        backgroundColor: alpha('#d6d6d6', 0.5),
                        "&::-webkit-scrollbar": {
                            width: '2px'
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: 'none'
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "white",
                          }
                        }}>
                        <ImageList variant="masonry" cols={this.state.width <= 800 ? 1 : 3} gap={8}>
                             {this.state.techLogos.map((item) => (
                                 <ImageListItem sx={{p: 0}} key={item.img}>
                                     <img
                                        src={`${item.component}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.component}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                {/* {this.state.width >= 800 ? <ImageListItemBar position="below" title={item.name} /> : null} */}
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                <Box sx={{
                    border: 2, 
                    position: 'absolute', 
                    height: '50vh', 
                    width: '30vw',
                    marginTop: '25vh',
                    marginLeft: '20vw'
                    }}>
                    <Paper>
                        <Typography>Technologies Studied</Typography>
                        <Typography></Typography>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default SectionTwo;