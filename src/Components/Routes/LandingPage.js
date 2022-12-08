
//Libraries imports
import React, { useState, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Element, Events, scroller, animateScroll as scroll } from 'react-scroll';
import NavBar from '../../ComponentsUnused/NavBar';
import NavMenu from '../NavMenu';
import { renderReducer, resetFormDataReducer } from '../../redux/formSlice';
import { logInFormReducer, createAccountFormReducer, logOut } from '../../redux/userSlice';
import { connect } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';

//import components for the main page
import Footer from '../Footer';
import FormDialog from '../FormComponents/FormDialog';

//Landing Page section imports 
import SectionOne from './Elements/SectionOne';
import SectionTwo from '../../ComponentsUnused/SectionTwo';
import SectionThree from './Elements/SectionThree';
import SectionFour from './Elements/SectionFour';
import SectionTwoRe from './Elements/SectionTwoRe';
import { adminLogOutReducer } from '../../redux/adminSlice';

const stateToProps = (state) => {
    return state;
}
const LandingPage = (props, ref) => {
    const dispatch = useDispatch();

    const handleFormClick = (event) => {
        event.preventDefault();
        dispatch(renderReducer()); 
    };

    // React.useEffect(() => {
    //     console.log(props);
    // },[])

    const handleLogOutClick = (event) => {
        console.log('Log Out Button Clicked!');
        if(props.user.admin){
            console.log(`resetting admin data`);
            dispatch(adminLogOutReducer())
        }
        dispatch(logOut());
        dispatch(resetFormDataReducer());
        //need to dispatch an admin reducer to remove admin info OR purge redux state all together!

    };
    const handleLogInRenderClick = (event) => {
        if(props.user.renderForm.createAccount){
            dispatch(logInFormReducer());
            dispatch(createAccountFormReducer());
        } else {
            dispatch(logInFormReducer());
        }
    }

    const handleCreateAccountRender = (event) => {
        if(props.user.renderForm.logIn){
            dispatch(createAccountFormReducer())
            dispatch(logInFormReducer())
        } else {
            dispatch(createAccountFormReducer())
        }
    }

    const handleFormClose = (event) => {
        const requestForm = props.form.renderForm;
        const logInForm = props.user.renderForm.logIn;
        const signUpForm = props.user.renderForm.createAccount;
        switch (true) {
            case requestForm: 
                console.log("closing form: request form");
                dispatch(renderReducer());
                break;
            case logInForm:
                console.log("Closing form: log in form");
                dispatch(logInFormReducer());
                break;
            case signUpForm:
                console.log("Closing create account form");
                dispatch(createAccountFormReducer())
                break;
            default:
                console.log('oops something went wrong, setting all to false');
        }
    }

    //**************** Trying to get rid of this!********************/
    const successToast = (event) => {
        event.preventDefault();
        toast.success("Dev email requst sent successfully!", {
            duration: 5000,
        })
        handleFormClose(event);
    }
    //**************** Trying to get rid of this! *********************/
    return(
        <div className='landing-page-container'>
             <Toaster 
                position='top-left'
                reverseOrder={true}
               />
            {/* <NavBar size={props.size} handleFormClick={handleFormClick} handleLogInRenderClick={handleLogInRenderClick} handleLogOutClick={handleLogOutClick}/> */}
            <NavMenu  
                handleFormClick={handleFormClick}
                handleLogInRenderClick={handleLogInRenderClick}
                handleLogOutClick={handleLogOutClick}
            />
            <div className='outer-form-container'>
                {props.form.renderForm? <FormDialog 
                                                handleFormClose={handleFormClose} 
                                                successToast={successToast} /> : null}
                {props.user.renderForm.logIn? <FormDialog 
                                                    handleFormClose={handleFormClose} 
                                                    successToast={successToast} 
                                                    handleCreateAccountRender={handleCreateAccountRender} /> : null}
                {props.user.renderForm.createAccount ? <FormDialog 
                                                            handleFormClose={handleFormClose} 
                                                            successToast={successToast} 
                                                            handleLogInRenderClick={handleLogInRenderClick} /> : <div></div>}
            </div>
            {/* <h1>Test</h1> */}
            <Element name='section-one' className='element one'><SectionOne /></Element>
            <Element name='section-two' className='element two'><SectionTwoRe /></Element>
            <Element name='section-three' className='element three'><SectionThree /></Element>
            <Element name='section-four' className='element four'><SectionFour /></Element>
            <Element name='footer'><Footer /></Element>
    </div>
    )
}

export default connect(stateToProps)(LandingPage);
