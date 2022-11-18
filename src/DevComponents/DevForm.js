import React from 'react';

//import MUI components
import {Box, Stack, TextField, Typography, Button} from '@mui/material';

//import React components
import SaveEmailButton from '../Components/FormComponents/Email/SaveEmailButton';

//import react-router-dom components
import { Link } from 'react-router-dom';


export default class DevForm extends React.Component {
    constructor(props){
        super(props);
        this.form = React.createRef();
        const userInfo = this.props.user.userInfo;
        this.state ={ 
            ...this.props,
            emailForm: this.props.emailForm,
            logInForm: this.props.logInForm,
            signUpForm: this.props.signUpForm,
            editAccount: this.props.editAccountForm,
            defaultValue: {
                first: userInfo.first || "",
                last: userInfo.last || "",
                email: userInfo.email || "",
                password: userInfo.password || "",
                confirmPassword: userInfo.password || ""
            }
        };

    };

    // componentDidMount(){
    //     console.log(this.state);
    // }

    renderTitle(){
        switch(true){
            case this.state.emailForm:
                return "Send a Message";
            case this.state.logInForm:
                return "Log In";
            case this.state.signUpForm:
                return "Create an Account";
            case this.state.editAccountForm:
                return "Edit Your Information"
            default:
                console.log("404: title not found");
        }
    }
    render(){
        let error = this.props.fieldError;
        return(
            <div>
                 <Box
                                ref={this.form}
                                onSubmit={this.props.handleFieldCheck}
                                component="form"
                                noValidate
                                autoComplete='on'
                                >
                                    <Stack spacing={2} direction='column' sx={{p: 5}}>
                                        <Typography align="center" gutterBottom variant="h4" component="div">{this.renderTitle()}</Typography>
                                        {this.state.logInForm ? <Button variant='text'onClick={this.props.handleCreateAccountRender}>Create an Account</Button> : null}
                                        {this.state.signUpForm && !this.state.editAccountForm ? <Button variant='text'onClick={this.props.handleLogInRenderClick}>Log In</Button> : null}
                                        {this.state.emailForm || this.state.signUpForm || this.state.editAccountForm ? 
                                            [
                                               <TextField  
                                                            defaultValue={this.state.defaultValue.first}
                                                            key={1}
                                                            error={error.first[0]} 
                                                            id="outlined-basic 1" 
                                                            label="First Name" 
                                                            variant="outlined" 
                                                            name='first' 
                                                            //value={formData.first}
                                                            onChange={this.props.setFormData}
                                                            pattern="\S(.*\S)?"
                                                            required/>,
                                                <TextField  
                                                            defaultValue={this.state.defaultValue.last}
                                                            key={2}
                                                            error={error.last[0]} 
                                                            id="outlined-basic 2" 
                                                            label="Last Name" 
                                                            variant="outlined"  
                                                            name='last' 
                                                            // value={formData.last} 
                                                            onChange={this.props.setFormData}
                                                            required/>
                                            ]: null}
                                        <TextField  
                                                    defaultValue={this.state.defaultValue.email}
                                                    key={3}
                                                    error={error.email[0]} 
                                                    id="outlined-basic 3" 
                                                    label="Email" 
                                                    variant="outlined" 
                                                    type="email" 
                                                    name='email' 
                                                    // value={formData.email} 
                                                    onChange={this.props.setFormData}
                                                    pattern="\S+"
                                                    required/>
                                        {this.props.emailForm ? 
                                                <TextField  
                                                    key={4}
                                                    error={error.message[0]} 
                                                    id="outlined-multiline-flexible" 
                                                    label="Message" 
                                                    name='message' 
                                                    multiline 
                                                    maxRows={4} 
                                                    // value={formData.message} 
                                                    onChange={this.props.setFormData}
                                                    pattern="\S+"
                                                    required/> : null
                                        }
                                        {this.props.signUpForm || this.props.logInForm || this.props.editAccountForm ? 
                                                <TextField
                                                defaultValue={this.state.defaultValue.password}  
                                                key={5}
                                                error={error.password[0]} 
                                                id="outlined-basic 4" 
                                                label="Password" 
                                                variant="outlined" 
                                                type="password" 
                                                name='password' 
                                                   // value={formData.email} 
                                                onChange={this.props.setFormData}
                                                pattern="\S+"
                                                required/> : null 
                                        }
                                        {this.props.signUpForm || this.props.editAccountForm ? 
                                                <TextField
                                                defaultValue={this.state.defaultValue.password}
                                                error={error.confirmPassword[0]} 
                                                id="outlined-basic 5" 
                                                label="Confirm Password" 
                                                variant="outlined" 
                                                type="password" 
                                                name='confirmPassword' 
                                                // value={formData.email} 
                                                onChange={this.props.setFormData}
                                                pattern="\S+"
                                                required/> : null} 
                                        {this.props.logInForm ? <Button component={Link} to={'/passwordreset'} className='mui-button dialog' variant='text'>Forgot Password?</Button> : null}
                                                   <br></br>
                                        {this.props.emailForm ? <SaveEmailButton  handleCheckbox={this.props.handleCheckbox} /> : <div></div> }
                                        <Button variant='contained' type="submit">Submit</Button>
                                    </Stack>
                                </Box>
            </div>
        )
    }
}