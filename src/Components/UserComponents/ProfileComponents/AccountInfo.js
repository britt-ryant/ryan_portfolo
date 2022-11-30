import React from 'react';

//import redux components
import { connect } from 'react-redux';

import {Toaster} from 'react-hot-toast';

//import mui components
import {
    Paper,
    Typography,
    Stack,
    Divider,
    Grid,
    IconButton,
    TextField,
    Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import { createAccountFormReducer, editAccountFormReducer } from '../../../redux/userSlice';
import FormDialog from '../../FormComponents/FormDialog';

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
        this.editAccount = this.editAccount.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
       if(prevProps.user.userInfo !== this.props.user.userInfo){
            let user = {...this.state.user}
            user.userInfo = this.props.user.userInfo;
            this.setState({user})
       }
    }

    properCaps(string){
        let word = string[0].toUpperCase();
        word += string.slice(1).toLowerCase();
        return word;
    }

    showPassword(){
        this.setState({showPassword: !this.state.showPassword})
    }
    editAccount(){
        const { dispatch } = this.props;
        dispatch(editAccountFormReducer())
    }
    handleFormClose(){
        const { dispatch } = this.props;
        dispatch(editAccountFormReducer());
    }
    render(){
        const user = this.state.user.userInfo;
        const firstName = this.properCaps(user.first);
        const lastName = this.properCaps(user.last);
        const lastFour = user.password.toString().replace(/.(?=.{4,}$)/g, 'X');
        const userPassword = user.password.toString();
        const editForm = this.props.user.renderForm.editAccount;
        return(
            <div>
            <Paper sx={{
                        border:2,
                        p: 2,
                        paddingTop: 5,
                        flexDirection: 'column',
                        display: 'flex',
                        textAlign: 'left',
                        boxShadow: 20
                        }}>
                <Stack>
                    <Box 
                        sx={{display: 'flex'}}>
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
                        <IconButton
                                sx={{
                                    marginLeft: 'auto',
                                    marginRight: '2.5%',
                                }} 
                                onClick={this.editAccount}>
                                <EditIcon />
                        </IconButton>
                    </Box>

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
                   
                        {this.props.user.renderForm.editAccount ? <FormDialog
                                                                        handleFormClose={this.handleFormClose} 
                                                                        successToast={this.props.successToast} 
                                                                         /> : null}
                </Stack>
            </Paper>
            </div>
        )
    }
};

export default connect(stateToProps)(AccountInfo);
