import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


//import Materil-UI components
import Dialog from '@mui/material/Dialog';

//import redux components
import { createUserAsync, editAccountFormReducer, getUserDataAsync, setState, updateUserAsync } from '../../redux/userSlice';
import { addInfoAsync, renderReducer, setMessageState } from '../../redux/formSlice';

//imoprt emailjs --> email service
import emailjs from '@emailjs/browser';

//import Components
import FormFieldChecker from './FormFieldChecker';

//Dev Components
import DevForm from '../../DevComponents/DevForm';
import { create, duration } from '@mui/material/styles/createTransitions';

//.env global variables
const serviceId = process.env.REACT_APP_SERVICE_ID
const templateId = process.env.REACT_APP_TEMPLATE_ID
const publicKey = process.env.REACT_APP_PUBLIC_KEY



const stateToProps = (state) => {
    return state;
};

const FormDialog = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userInfo);
    const emailForm = useSelector(state => state.form.renderForm);
    const logInForm = useSelector(state => state.user.renderForm.logIn);
    const createAccount = useSelector(state => state.user.renderForm.createAccount);
    const editAccount = useSelector(state => state.user.renderForm.editAccount)
    //const [error, setError] = useState(false);
    const formTypeValue = {
        emailForm: emailForm,
        logInForm: logInForm,
        signUpForm: createAccount,
        editAccountForm: editAccount
   };

   useEffect(() => {
    if(!formTypeValue.editAccountForm && !formTypeValue.emailForm){
        dispatch(getUserDataAsync());
    }
    }, [dispatch]);

    const dbStorage = (event, checked, formData) => {
        switch(true){
            case emailForm:
                console.log("dbStorage, message form");
                switch(checked){
                    case true:
                        dispatch(addInfoAsync(formData)).then((data) => {
                            dispatch(renderReducer());
                            callSuccessToast(`Message sent successfully!`)
                        });
                    break;
                    case false: 
                        dispatch(setMessageState(formData));
                        dispatch(renderReducer())
                        
                    break;
                    default: 
                        console.log("Something went wrong with the checkbox switch");
                };
            break; 
            case logInForm: 
                console.log("dbStorage, logIn form");
                dispatch(getUserDataAsync(formData)).then((data) => {
                    if(data.payload.userInfo.error){
                        toast.error(`${data.payload.userInfo.error}`)
                    } else {
                        const userInfo = {
                            ...data.payload.userInfo.result[0],
                            password: formData.password
                        };
                        dispatch(setState(userInfo));
                        callSuccessToast(`Welcome back ${userInfo.first} ${userInfo.last}!`);
                    }
                })
            break;
            case createAccount:
                console.log("dbStorage, create account");
                dispatch(getUserDataAsync(formData)).then((data) => {
                    if(data.payload.userInfo.result.length === 0){
                        //dispatch create user
                        console.log("dispatching create user");
                        dispatch(createUserAsync(formData)).then((data) => {
                            let userData = data.payload.newUser;
                            callSuccessToast(`Welcome ${formData.first} ${formData.last}!`)
                            dispatch(setState(userData));
                        });
                    } else {
                        toast.error(`User ${formData.email} already exists, please use a new email!`);
                        //add style in child to highlight email input as red
                    }
                });
            break;
            case editAccount:
                console.log('Edit account to db');
                let info = {
                    formData: formData,
                    user: user
                }
                dispatch(updateUserAsync(info)).then((data) => {
                    dispatch(editAccountFormReducer())
                    callSuccessToast(`Your information has been changed ${data.payload.result.first}!`)
                })
                
                
            break;
            default:
                console.log("something went wrong with dbStorage swtich");
        }
    };

    const passwordMatch = (formData, event) => {
        dispatch(getUserDataAsync(formData));
        //check to see if the state changes after get async and if it does add toast
    };

    const callSuccessToast = (message) => {
        toast.success(message, {
            duration: 
                5000
            })
    }

    
    //******************** Handling emails sending **********************************/

    const sendEmail = (event, formData) => {
        event.preventDefault();
        emailjs.send(serviceId, templateId, formData, publicKey).then((result) => {
            console.log(result.text);
            toast.success("Your message has been sent!", 
                {
                    duration: 5000
                })
        }, (error) => {
            console.log(error.text);
            toast.error("Oops!! Something went wrong with our email service, please try again later!",
                {
                    duration: 5000
                })
        });
        event.target.reset();
        
    };

    //******************** Handling emails sending **********************************/

        return(
            <div className='dialog-container'>
                <Dialog
                    open={props.form.renderForm || props.user.renderForm.logIn || props.user.renderForm.createAccount || props.user.renderForm.editAccount}
                    onClose={props.handleFormClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    fullWidth
                >
                    {props.form.renderForm || props.user.renderForm.logIn || props.user.renderForm.createAccount || props.user.renderForm.editAccount ? 
                                                        <FormFieldChecker
                                                            handleCreateAccountRender={props.handleCreateAccountRender}
                                                            handleLogInRenderClick={props.handleLogInRenderClick}
                                                            emailForm={formTypeValue.emailForm} 
                                                            logInForm={formTypeValue.logInForm}
                                                            signUpForm={formTypeValue.signUpForm}
                                                            editAccountForm={formTypeValue.editAccountForm}
                                                            successToast={props.successToast}
                                                            sendEmail = {sendEmail}
                                                            dbStorage={dbStorage} 
                                                            passwordMatch = {passwordMatch}
                                                            /> : null}
                </Dialog>
            </div>
        )
};

export default connect(stateToProps)(FormDialog);