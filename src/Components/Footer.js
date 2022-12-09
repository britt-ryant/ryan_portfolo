import React from 'react';

//import redux components
import { connect } from 'react-redux';
import { renderReducer } from '../redux/formSlice';

import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListSubheader,
    ListItemIcon,
    ListItemText
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';

const stateToProps = state => {
    return state.form
}

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            footerInfo: [
                {name: "Email", icon: EmailIcon, info: "Britt.ryant@gmail.com", link: false},
                {name: "Cell Phone", icon: PhoneIphoneIcon, info: "(904) 403-1694", link: false},
                {name: "LinkedIn", icon: LinkedInIcon, info: "linkedin.com/in/ryantbritt", link: true, url: "https://www.linkedin.com/in/ryantbritt/"},
                {name: "GitHub", icon: GitHubIcon, info: "github.com/britt-ryant", link: true, url: "https://github.com/britt-ryant"},
            ],
            version: 1
        }
        this.handleEmail = this.handleEmail.bind(this);
    }

    handleIcon(name){
        switch(name){
            case "Email":
                return <EmailIcon />
            case "Cell Phone":
                return <PhoneIphoneIcon />
            case "LinkedIn":
                return <LinkedInIcon />
            case "GitHub":
                return <GitHubIcon />
            default:
                console.log("oops! Icon not found");
                return <EmailIcon />
        }
    };

    handleEmail(){
        const {dispatch} = this.props;
        dispatch(renderReducer());
    }
    render(){
        return(
            <div className='footer-container'>
                <Box sx={{border: 2, p: 2}}>
                    <List
                        sx={{width: '100%', color: '#d6d6d6'}}
                        dense={true}
                        >
                        <ListItem button onClick={this.handleEmail}>
                            <ListItemIcon style={{color: '#d6d6d6'}}><SendIcon /></ListItemIcon>
                            <ListItemText>Send Email Message</ListItemText>
                        </ListItem>
                        {this.state.footerInfo.map((item, index) => {
                            if(item.link){
                                return(
                                    <ListItem button component="a" href={item.url} key={index}>
                                        <ListItemIcon style={{color: '#d6d6d6'}}>{this.handleIcon(item.name)}</ListItemIcon>
                                        <ListItemText>{item.name}: {item.info}</ListItemText> 
                                    </ListItem>
                                )
                            } else {
                                return(
                                    <ListItem key={index}>
                                        <ListItemIcon style={{color: '#d6d6d6'}}>{this.handleIcon(item.name)}</ListItemIcon>
                                        <ListItemText>{item.name}: {item.info}</ListItemText> 
                                    </ListItem>
                                )
                            }

                        })}
                    </List>
                </Box>
            </div>
        )
    }
}
export default connect(stateToProps)(Footer)