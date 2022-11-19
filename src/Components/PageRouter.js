import React from 'react';

//import redux functions and components
import { connect } from 'react-redux';

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
import { createAccountFormReducer } from '../redux/userSlice';

const stateToProps = (state) => {
    return state
};


class PageRouter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.props,
            id: this.props.user.userInfo.id,
        };
    };

  componentDidMount(){
    //console.log(this.state);
  }


    render(){
        return(
            <div className='router-container'>
                <Router>
                    <Routes>
                        <Route path='/' element={<LandingPage/>} />
                        <Route path='/passwordreset' element={<ForgotPassword />} />
                        <Route exact path={`/reset/${this.props.user.userInfo.id}`} element={<ForgotPassword />} />
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