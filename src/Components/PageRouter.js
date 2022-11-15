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

const stateToProps = (state) => {
    return state
};


class PageRouter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.user.userInfo.id
        }
    }

    render(){
        return(
            <div className='router-container'>
                <Router>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/passwordreset' element={<ForgotPassword />} />
                        <Route exact path={`/reset/${this.props.user.userInfo.id}`} element={<ForgotPassword />} />
                        <Route  path={`/profile/${this.props.user.userInfo.id}`} element={<SideBar />} /> 
                        <Route path='/404' element={<NotFound />} />
                        <Route path='*' element={<Navigate replace to='/404' />} />
                    </Routes>
                </Router>
            </div>

        )
    }
};


export default connect(stateToProps)(PageRouter);