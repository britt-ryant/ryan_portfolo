
//Libraries imports
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

//Styling libraries imports
//import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContenet from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import toast, {Toaster} from 'react-hot-toast';
//import _default from '@emailjs/browser';

//Components import
import SaveEmailButtion from '../Components/FormComponents/Email/SaveEmailButton';
import { addInfoAsync, renderReducer } from '../redux/formSlice';
import { render } from '@testing-library/react';



const EmailForm = (props) => {
    //Define local vaiables and state
    const form = useRef();
    const [formData, setFormData] = useState({first: "", last: "", email: "", message: ""});
    const [error, setError] = useState({first: false, last: false, email: false, message: false});
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();

    let errorTitle = {
        first: "First Name",
        last: "Last Name", 
        email: "Email",
        message: "Message"
    };  

    //set form data on change
    const addFormData = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value});
    };

    //validate whether the form fields are filled out correctly and send emial
    const handleFieldCheck = (event) => {
        event.preventDefault(); 
        for(let key in formData) {
            if(formData[key] === "" && key !== "email"){
                setError((error) => ({...error, [key]: true}))
                toast.error(`Please make sure ${errorTitle[key]} is filled out correctly`,
                {duration: 3000
                });
            } else if(key === "email") {
                if(formData[key] === "" || !event.currentTarget.email.checkValidity()){
                    setError((error) => ({...error, [key]: true}));
                    toast.error(`Please make sure ${errorTitle[key]} is formatted and filled out completely`, {
                        duration: 3000,
                    });
                } else{
                    setError((error) => ({...error, [key]: false}))
                }
            } else {
                setError((error) => ({...error, [key]: false}))
            }
        }
        if(event.currentTarget.checkValidity()){
            console.log("success, sending info to emailjs and checking checkbox")
            devEmail(event);
            storeInfo();
        }
        //event.currentTarget.checkValidity() ? devEmail(event) : console.log("dont send email");
    };


    //save form information if the button is checked (child component)
    const handleCheckbox = (event) => {
        event.target.checked ? setChecked(true) : setChecked(false);
    };

    //send the form information to db
    const storeInfo = () => {
        if(checked){
            dispatch(addInfoAsync({
                first: formData.first,
                last: formData.last,
                email: formData.email,
                message: formData.message
            }))
        }
    };

//*********************** DEVELOPMENT FUNCTION  ***************************/
    const devEmail = (event) => {
        props.successToast(event);
    };
//************************************************************************* */

    //send infromation to emailjs and send email
//     const sendEmail = (event) => {
//         event.preventDefault();
//         emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
//           .then((result) => {
//               console.log(result.text);
//           }, (error) => {
//               console.log(error.text);
//           });
//           toast.success("Your request has been sent!",
//           {
//             duration: 5000
//           })
//           event.target.reset();
//   };

  return (
    <div className='form-container'>
        <div className='new-form'>
            <Toaster 
                position='top-left'
                reverseOrder={true}
                />
                            <Box
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
                                        <SaveEmailButtion  handleCheckbox={handleCheckbox} />
                                        <Button variant='contained' type="submit">Submit</Button>
                                    </Stack>
                                </Box>
        </div>
    </div>
  );
};

export default EmailForm;