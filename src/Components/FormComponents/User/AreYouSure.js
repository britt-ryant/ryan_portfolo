import React from 'react';
//import redux components
import {connect} from 'react-redux';
//import mui components
import {
        Dialog,
        Paper,
        Typography,
        Button,
        TextField,
        Stack
} from '@mui/material';
import { deleteAccountReducer, deleteUserAsync, addDeletedUserAsync, updateAccountStatusAsync } from '../../../redux/userSlice';
import { Box } from '@mui/system';
import toast from 'react-hot-toast';
import { adminLogOutReducer } from '../../../redux/adminSlice';
import {Navigate, Redirect} from 'react-router-dom';

const stateToProps = (state) => {
    return state;
}


class AreYouSure extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props;
        this.handleClose = this.handleClose.bind(this);
        this.checkSubmission = this.checkSubmission.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    // componentDidMount(){
    //     console.log(this.props);
    // }

    handleClose(){
        const {dispatch} = this.props;
        dispatch(deleteAccountReducer());
    }

    checkSubmission(event){
        event.preventDefault();
        const {dispatch} = this.props;
        if(this.state.delete){
            let submission = this.state.delete.toLowerCase();
            console.log(submission);
            if(submission === 'delete'){
                console.log(this.state);
                if(this.state.user.admin){
                    console.log(`this will delete admin account`);
                    dispatch(adminLogOutReducer())
                } 
                new Promise((resolve, reject) => {
                    resolve(this.props.handleRedirect())
                }).then(() => {
                    toast.success(`Your account was successfully deleted!`);
                    dispatch(addDeletedUserAsync(this.props.user.userInfo)).then(() =>{
                        dispatch(updateAccountStatusAsync(this.props.user.userInfo)).then(()=>{
                            dispatch(deleteUserAsync(this.props));
                            dispatch(deleteAccountReducer());
                            dispatch(adminLogOutReducer());     
                        })
                    })
                })

            } else {
                this.setState({error: true});
                console.log(this.props);
                toast.error(`Please enter "delete" into the field`,
                {
                    duration: 5000
                })
            }
        } else {
            this.setState({error: true})
            toast.error(`Please enter a value`)
        }
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div className='form-container'>
                <Dialog
                        open={this.props.user.renderForm.deleteAccount}
                        onClose={this.handleClose}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                        fullWidth>
                    <Box
                        onSubmit={this.checkSubmission}
                        component='form'
                        noValidate
                        autoComplete='off'
                        >
                            <Stack spacing={5} direction='column' sx={{p:5}}>
                            <Typography align='center' gutterBottom variant='h4' component='div'>Delete Account</Typography>
                            <Typography align='center' gutterBottom variant='p' component='div'>Are you sure you want to permanently delete your account? If so, type "delete" and press submit.</Typography>
                            <TextField 
                                    error={this.state.error}
                                    id='outlined-basic 10'
                                    label="Delete"
                                    variant='outlined'
                                    type='text'
                                    name='delete'
                                    onChange={this.handleChange}
                                    required/>
                            <Box sx={{
                                        textAlign: 'center',
                                        justifyContent: 'center',
                            }}>
                                <Button color='secondary' variant="outlined" type='submit'>Delete Account</Button>
                                {/* <Button sx={{border: 2, margin: 2}} type='submit'>Close</Button> */}
                            </Box>
                            </Stack>
                        </Box>
                </Dialog>
            </div>
        )
    }
}

export default connect(stateToProps)(AreYouSure)