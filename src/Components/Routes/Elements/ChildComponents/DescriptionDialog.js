import React from 'react';

//import MUI components
import {
    Paper,
    ImageList,
    ImageListItem,
    Box,
    Dialog,
    Typography,
    List,
    ListItem,
    Divider
} from '@mui/material';


//import tech logos
import amazonBucket from '../../../../images/logos/amazonBuckets.png';
import apacheSpark from '../../../../images/logos/apacheSpark.png';
import aws from '../../../../images/logos/aws.png';
import cSharp from '../../../../images/logos/cSharp.png';
import java from '../../../../images/logos/java.png';
import lambda from '../../../../images/logos/lambda.png';
import mySQL from '../../../../images/logos/mySQL.png';
import nodeJs from '../../../../images/logos/nodeJs.png';
import postgreSQL from '../../../../images/logos/postgreSQL.png';
import python from '../../../../images/logos/python.png';
import ruby from '../../../../images/logos/ruby.png';
import react from '../../../../images/logos/react.png';
import redux from '../../../../images/logos/redux.png';
import github from '../../../../images/logos/github.png';
import javascript from '../../../../images/logos/javascript.png';
import expressJS from '../../../../images/logos/expressJS.png';


class DescriptionDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: this.props.comp.type,
            logo: this.props.comp.image,
            title: this.props.comp.title,
            description: this.props.comp.description,
        }
    }
    componentDidMount(){
        // console.log(this.state.type);
    }

    renderJobDesc(){
        let data = this.props.comp;
        return (
            // <React.Fragment>
            <div style={{width: '95%', display: 'inline-block'}}>
                <Box sx={{boxShadow: 20, p: 2}}>
                    <img
                        src={data.image} 
                        width="100%"
                        alt="logo"
                        draggable={false}
                    />

                </Box>
                    <Box
                        sx={{
                            textAlign: 'left',
                            marginBottom: 2,
                            marginTop: 1
                            // paddingLeft: 2
                        }}>
                        <Typography
                            variant='h5'
                        >{this.state.title}</Typography>
                        <Typography
                            variant='h6'
                        >{data.role}</Typography>
                        <Typography
                            variant='h7'
                        >{data.date}</Typography>
                        </Box>
                        <Divider />
                        <List
                            sx={{
                                // border: 2,
                                textAlign: 'left',
                                // paddingLeft: -1
                            }}>
                                <Typography>Description: </Typography>
                        {data.description.map((item, index) => (
                            <ListItem ><Typography variant="body2">- {item}</Typography></ListItem>
                        ))}
                        </List>
                    {/* <Typography
                        variant='body1'
                        >{data.description}</Typography> */}

            </div>
            // </React.Fragment> */}
        )
    }

    renderTechDesc(){
        return(
            <div>
                <img 
                    className="dialog-logo"
                    src={this.state.logo} 
                    height="100vh" 
                    draggable={false}
                    alt="logo" />
                <Typography variant="h3">{this.state.title}</Typography>
                <Typography sx={{width: '80%', display: 'inline-block', p: 2}}>{this.state.description ? this.state.description : "No desc. loaded...." }</Typography>
                <Typography variant="caption" sx={{display: 'inline-block'}}>Descriptions are from Wikipedia.com</Typography>
            </div>

        )
    }

    render(){
        return (
            <Dialog
                    open={this.props.comp}
                    onClose={this.props.handleWindowClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    fullWidth>
                <Paper
                    sx={{
                        justifyContent: "center",
                        textAlign: "center",
                        p: 2,
                        }}
                >
                    {this.props.type === "job" ? this.renderJobDesc() : this.renderTechDesc()}
                  
                </Paper>
            </Dialog>
        )
    }
}


export default DescriptionDialog;