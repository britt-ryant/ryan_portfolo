import React from 'react';
import { useDispatch } from 'react-redux';

//import MUI componenets
import { Button, Box, Typography, TextField, Stack } from '@mui/material';
import Toaster from 'react-hot-toast'; 

//import reducers
import { logInFormReducer } from '../redux/userSlice';





const LogInForm = (props) => {
    const dispatch = useDispatch();

    const handleClick = (event) => {
        dispatch(logInFormReducer());
    }

    return(
        <div className='log-in-form-container'>
            <h1>I am the form</h1>
               {/* <Toaster 
                position='top-left'
                reverseOrder={true}
                /> */}
                            {/* <Box
                                ref={form}
                                onSubmit={handleFieldCheck}
                                component="form"
                                noValidate
                                autoComplete='on'
                                >
                                    <Stack spacing={2} direction='column' sx={{p: 5}}>
                                        <Typography align="center" gutterBottom variant="h4" component="div">Send a Message</Typography>
                                        <TextField  error={error.first} 
                                                    id="outlined-basic" 
                                                    label="First Name" 
                                                    variant="outlined" 
                                                    name='first' 
                                                    value={formData.first} 
                                                    onChange={addFormData} 
                                                    required/>
                                        <TextField  error={error.last} 
                                                    id="outlined-basic" 
                                                    label="Last Name" 
                                                    variant="outlined"  
                                                    name='last' 
                                                    value={formData.last} 
                                                    onChange={addFormData} 
                                                    required/>
                                        <TextField  error={error.email} 
                                                    id="outlined-basic" 
                                                    label="Email" 
                                                    variant="outlined" 
                                                    type="email" 
                                                    name='email' 
                                                    value={formData.email} 
                                                    onChange={addFormData} 
                                                    required/>
                                        <TextField  error={error.message} 
                                                    id="outlined-multiline-flexible" 
                                                    label="Message" 
                                                    name='message' 
                                                    multiline 
                                                    maxRows={4} 
                                                    value={formData.message} 
                                                    onChange={addFormData} 
                                                    required/><br></br>
                                        <Button variant='contained' type="submit">Submit</Button>
                                    </Stack>
                                </Box> */}
        </div>
    )
}

export default LogInForm