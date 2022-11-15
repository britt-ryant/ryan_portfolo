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
    TextField,
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
            ...this.props,
            showPassword: false
        };
        this.showPassword = this.showPassword.bind(this);
    }

    properCaps(string){
        let word = string[0].toUpperCase();
        word += string.slice(1).toLowerCase();
        return word;
    }

    showPassword(){
        this.setState({showPassword: !this.state.showPassword})
    }
    render(){
        const user = this.state.user.userInfo;
        const firstName = this.properCaps(user.first);
        const lastName = this.properCaps(user.last);
        const lastFour = user.password.toString().replace(/.(?=.{4,}$)/g, 'X');
        const userPassword = user.password.toString()
        return(
            <Paper sx={{
                        width: ['90%', '50%', '50%'],
                        minWidth: '50%', 
                        height: '50%',
                        p: 2,
                        paddingTop: 5,
                        flexDirection: 'column',
                        display: 'flex',
                        textAlign: 'left',
                        boxShadow: 20
                        }}>
                <Stack>
                    {this.props.renderEdit ? 
                    <Typography 
                                noWrap
                                component="h2" 
                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                }}
                                variant="h4" 
                                color="primary" 
                                gutterBottom
                            >
                                {firstName} {lastName}
                    </Typography>
                    : 
                    <TextField
                            key={1}
                            //error={error.first[0]} 
                            id="outlined-basic 1" 
                            label="First Name" 
                            variant="outlined" 
                            name='first' 
                            //value={formData.first}
                            onChange={this.props.setFormData}
                            pattern="\S(.*\S)?"
                            required/>

                    }

                    <Typography 
                                component="h5" 
                                sx={{
                                    p:1
                                }}
                                variant="h8" 
                                color="primary" 
                                gutterBottom
                    >
                        ID: {user.id}
                    </Typography>
                    <Divider />
                    <Typography 
                                noWrap
                                component="h2" 
                                sx={{
                                    paddingLeft: 1,
                                    paddingTop: 3
                                }}
                                variant="h6" 
                                gutterBottom
                    >
                        {user.email}
                    </Typography>
                    <Divider />
                    <Grid 
                                sx={{
                                display: 'flex',
                                p: 1,
                                alignItems: 'center',
                                minWidth: '50%'
                            }}>
                        <Typography 
                                    noWrap
                                    varient="password"
                                    component="h2" 
                                    sx={{
                                        textAlign: 'no-wrap',
                                        paddingRight: 10,
                                        minWidth: '82%'
                                    }}
                                    // gutterBottom
                        >
                         Password: {this.state.showPassword ? userPassword : lastFour}
                        </Typography>
                        <IconButton onClick={this.showPassword} sx={{paddingLeft: 1, marginLeft: 3}}>
                            {this.state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </Grid>
                    <Divider />
                </Stack>
            </Paper>
        )
    }
};

export default connect(stateToProps)(AccountInfo);
