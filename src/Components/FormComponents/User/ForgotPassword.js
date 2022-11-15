import React from 'react';
import { connect } from 'react-redux';

//import toast notifications
import toast, { Toaster } from 'react-hot-toast';

//import material UI Components
import {Dialog, Box, TextField, Stack, Typography, Button } from '@mui/material';

//import redux components
import { getUserDataAsync, logOut, createAccountFormReducer, updateUserPasswordAsync } from '../../../redux/userSlice';

//import from react router 
import { Navigate } from 'react-router-dom';

//import emailJS service
import emailjs from '@emailjs/browser';

const stateToProps = (state) => {
    return state;
}

class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error: {
                email: [false, 'Email'],
                password: [false, 'Password'],
                confirmPassword: [false, 'Confirm Password']
            },
            password: 'tempRequestPassword',
            renderCreateLink: false,
            redirect: false,
            resetRequest: false,
            resetForm: false
        };
        this.setFormData = this.setFormData.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.existingUserData = this.existingUserData.bind(this);
        this.toCreateAccount = this.toCreateAccount.bind(this);
    };
    

    componentDidMount(){
        const { dispatch } = this.props;
        const url = window.location.pathname;
        let path = url.replace('/', "").toString();
        if(path === "passwordreset"){
            this.setState({resetRequest: true});
        } else {
            this.setState({resetForm: true});
            this.setState({userId: path.slice(6)});
        }
    };

    componentDidUpdate(prevProps, prevState){
      if(prevProps.user.renderForm.createAccount !== this.props.user.renderForm.createAccount){
        this.setState({redirect: true})
      }
    }

    setFormData(event){
        const {name, value} = event.target;
        this.setState({ [name] : value })
    };

    formSubmit(event){
        event.preventDefault();
        if(this.state.resetRequest){
            this.emailValidation(event)
        } else {
            this.checkPassword(event)
        }
    };

    checkPassword(event){
        const { dispatch } = this.props;
        let newPassword = this.state.newPassword;
        let confirmPassword = this.state.confirmPassword;
        let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
        if(pattern.test(newPassword)){
            if(newPassword === confirmPassword){
                let payload = {
                    id: this.state.userId,
                    password: this.state.newPassword
                };
                toast.promise(
                    dispatch(updateUserPasswordAsync(payload)).then((res) => {
                        console.log(res);
                        this.setState({redirect: true})
                    }),
                    {
                        loading: "Updating Password....",
                        success: "Password Updated!",
                        error: (err) => err.response.data.msg
                    }
                )
            } else {
                toast.error("Passwords do not match!");
                this.setError("confirmPassword", true)
            }
        } else {
            toast.error("Password must contain at leat one uppercase letter, one lowercase letter, one number, and a special character");
            this.setError("password", true)
        }
        
    }

    setError(errorInfo, error){
        let title = this.state.error[errorInfo][1];
        this.setState((prevState) => ({
            error: {
               ...prevState.error,
               [errorInfo]: [error, title]
            }
        }))
    }

    emailValidation(event){
        if(this.state.email === "" || !event.currentTarget.email.checkValidity()){
            this.setError("email", true)
            toast.error(`Please make you filled in your email correctly!`)
        } else {
            this.setError("email", false)
            this.existingUserData();
        }
    };

    existingUserData(event){
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        const { dispatch } = this.props;
        dispatch(getUserDataAsync(formData)).then((data) => {
            let userReturn = data.payload.userInfo.result[0];
            if(userReturn){
                let user = {
                    email: userReturn.email,
                    id: userReturn.id,
                    first: userReturn.first,
                    last: userReturn.last
                } 
                this.sendLink(user, event)
            } else {
                toast.error(`${data.payload.userInfo.error}`);
                this.setError("email", true);
                this.setState({renderCreateLink: true});
            }
        })
    };

    sendLink(user, event){
        //event.preventDefault();
        let serviceId = process.env.REACT_APP_SERVICE_ID
        let templateId = process.env.REACT_APP_TEMPLATE_ID_RESET_PASSWORD
        let publicKey = process.env.REACT_APP_PUBLIC_KEY
        let url = `http://localhost:3000/reset/${user.id}`;
        let userInfo = {
            id: user.id,
            first: user.first,
            last: user.last,
            email: user.email,
            link: url
        };

        emailjs.send(serviceId, templateId, userInfo, publicKey).then((result) => {
            console.log(result.text);
            toast.success("The link has been sent! Check your email!",
            {
                duration: 5000
            });
            this.setState({homeButton: true});
        }, (error) => {
            console.log(error.text);
            toast.error("Oops! Something went wrong, please try again later!",
            {
                duration: 5000
            })
        })
    };

    toCreateAccount(){
        const { dispatch } = this.props;
        dispatch(logOut())
        dispatch(createAccountFormReducer());
       //this.setState({redirect: true})
    }
    render () {
        return (
            <div className='form-container forgot-password'>
                <Toaster 
                position='top-left'
                reverseOrder={true}
               />
                <Dialog
                    open={true}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    fullWidth
                >
                    <Box 
                        onSubmit={this.formSubmit}
                        component='form'
                        noValidate
                        autoComplete='on'
                    >
                        <Stack spacing={5} direction='column' sx={{p: 5}}>
                            <Typography align='center' gutterBottom variant='h4' component='div'>Password Reset</Typography>
                            {this.state.resetRequest ? <Typography align='center' gutterBottom variant='p' component='div'>Please enter your email address to recieve a reset password link!</Typography> : null }
                            {this.state.resetForm ? <Typography align='center' gutterBottom variant='p' component='div'>Please enter your new password</Typography> : null }
                            {this.state.resetRequest ? 
                                    <TextField
                                        error={this.state.error.email[0]}
                                        id='outlined-basic 6'
                                        label='Email Address'
                                        variant='outlined'
                                        type='email'
                                        name='email'
                                        onChange={this.setFormData}
                                        required
                                        /> : null }
                            {this.state.userId ? 
                                     <TextField
                                     error={this.state.error.password[0]}
                                     id='outlined-basic 7'
                                     label='New Password'
                                     variant='outlined'
                                     type='password'
                                     name='newPassword'
                                     onChange={this.setFormData}
                                     required
                                     /> : null }
                            {this.state.userId ? 
                                     <TextField
                                     error={this.state.error.confirmPassword[0]}
                                     id='outlined-basic 8'
                                     label='Confirm New Password'
                                     variant='outlined'
                                     type='password'
                                     name='confirmPassword'
                                     onChange={this.setFormData}
                                     required
                                     /> : null }         
                                {this.state.renderCreateLink ? <Button variant='text'onClick={this.toCreateAccount}>Create Account</Button> : null}
                                {this.state.homeButton ? <Button variant='text'onClick={() => this.setState({redirect: true})}>Back To Homepage</Button> : null}
                            <Button variant='contained' type='submit'>Submit</Button>
                            {this.state.redirect && <Navigate to='/' replace={true}/>}
                        </Stack>

                    </Box>
                </Dialog>
            </div>
        )
    }
};


export default connect(stateToProps)(ForgotPassword);