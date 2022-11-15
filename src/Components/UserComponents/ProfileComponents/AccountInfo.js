import React from 'react';

//import redux components
import { connect } from 'react-redux';

//import mui components
import {
    Paper,
    Typography,
    Stack,
    Divider,
    Grid,
    IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const stateToProps = (state) => {
    return state
}

class AccountInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.props
        }
    }

    properCaps(string){
        let word = string[0].toUpperCase();
        word += string.slice(1).toLowerCase();
        return word;
    }
    render(){
        const user = this.state.user.userInfo;
        const firstName = this.properCaps(user.first);
        const lastName = this.properCaps(user.last);
        const lastFour = user.password.toString().replace(/.(?=.{4,}$)/g, 'X');
        console.log(lastFour);
        return(
            <Paper sx={{
                        width: '50%',
                        minWidth: '400px', 
                        height: '25vh',
                        p: 2,
                        paddingTop: 5,
                        flexDirection: 'column',
                        display: 'flex',
                        textAlign: 'left',
                        boxShadow: 20
                        }}>
                <Stack>
                    <Typography 
                                component="h2" 
                                sx={{
                                    fontSize: 40,
                                    p: 1,
                                    paddingBottom:0,
                                }}
                                variant="h6" 
                                color="primary" 
                                gutterBottom
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography 
                                component="h2" 
                                sx={{
                                    fontSize: 12,
                                    paddingLeft: 2,
                                }}
                                variant="h6" 
                                color="primary" 
                                gutterBottom
                    >
                        ID: {user.id}
                    </Typography>
                    <Divider />
                    <Typography 
                                component="h2" 
                                sx={{
                                    fontSize: 25,
                                    paddingLeft: 1,
                                    paddingTop: 3
                                }}
                                variant="h6" 
                                gutterBottom
                    >
                        {user.email}
                    </Typography>
                    <Grid>
                        <Typography 
                                    varient="password"
                                    component="h2" 
                                    sx={{
                                        fontSize: 20,
                                        p: 1,
                                    }}
                                    gutterBottom
                        >
                            Password: {user.password}
                        </Typography>
                    </Grid>
                </Stack>
            </Paper>
        )
    }
};

export default connect(stateToProps)(AccountInfo);
