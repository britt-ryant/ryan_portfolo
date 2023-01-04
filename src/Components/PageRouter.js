import React from 'react';
import axios from 'axios'

//import redux functions and components
import { connect } from 'react-redux';
import { PURGE } from 'redux-persist';

import toast, { Toaster } from 'react-hot-toast';

//import react-router-dom
import {BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

//import components 
import ForgotPassword from './FormComponents/User/ForgotPassword';
import LandingPage from './Routes/LandingPage';
import ResetPassword from '../ComponentsUnused/ResetPassword';
import NotFound from './NotFound';
import SideBar from './UserComponents/SideBar';
import FormDialog from './FormComponents/FormDialog';
import DevForm from '../DevComponents/DevForm';
import { createAccountFormReducer, getOauthUser, getUserByIdAsync, logInFormReducer } from '../redux/userSlice';
import {loggedInReducer, oAuthUserInfoReducer} from '../redux/infoSlice'

const stateToProps = (state) => {
    return state
};


class PageRouter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.props,
            id: this.props.user.userInfo.id,
            resetId: window.location.pathname.substring(7),
            loadedCookie: false
        };
    };

    componentDidMount(){
        if(!this.props.user.loggedIn){
            const {dispatch} = this.props;
            this.getUser().then((data) => {
                console.log(data);
                if(data && !data.error){
                    if(!data.user.emails){
                        dispatch(logInFormReducer());
                        console.log(`changing to logged in from githubb user`);
                        dispatch(loggedInReducer({data: true}));
                        toast.error(`Please make sure that your email address is public to use this feature!`);
                    }
                    if(data.user.emails){
                        dispatch(getOauthUser(data.user.emails[0].value)).then((response) => {
                            if(response.payload.userInfo.error){
                                dispatch(createAccountFormReducer())
                                toast.error(response.payload.userInfo.error)
                            }
                            // dispatch(oAuthUserInfoReducer(data.user))
                        })
                    }
                }
            });
        }
        
    }

  UNSAFE_componentWillMount(){
    const pathname = window.location.pathname;
    let id = pathname.substring(7);
    const {dispatch} = this.props;
    if(!this.props){
        dispatch(getUserByIdAsync(id)).then((data)=>{
            console.log(data);
        })
    }
  };

  async getUser(){
    try{
        const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
        const {data} = await axios.get(url, {withCredentials: true})
        return data
    } catch(error) {
        // console.log(`Error`, error);
    }
  };



  componentDidUpdate(){
    this.getUser();
  };


  handleLogIn(){
    
  }


    render(){
        return(
            <div className='router-container'>
            <Toaster 
                position='top-left'
                reverseOrder={true}
               />
                <Router>
                    <Routes>
                        <Route path='/' element={<LandingPage/>} />
                        <Route path='/passwordreset' element={<ForgotPassword />} />
                        <Route path={`/reset/${this.state.resetId}`} element={<ForgotPassword />} />
                        <Route  path={`/profile/${this.props.user.userInfo.id}`} element={<SideBar setEditAccountInfo={this.setEditAccountInfo} />} />
                        {/* <Route path={`/edit/${this.props.user.userInfo.id}`} element={<FormDialog 
                                                                                        handleFormClose={this.handleFormClose} 
                                                                                        successToast={this.successToast} 
                                                                                        handleCreateAccountRender={this.handleCreateAccountRender} />} /> */}
                        <Route path='/404' element={<NotFound />} />
                        <Route path='*' element={<Navigate replace to='/404' />} />
                    </Routes>
                </Router>
            </div>

        )
    }
};


export default connect(stateToProps)(PageRouter);