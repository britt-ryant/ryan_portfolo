import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-scroll';

//import redux persist component
import {PURGE} from 'redux-persist';

//import from react router dom
import { Navigate } from 'react-router-dom';

//import MUI components
import Button from '@mui/material/Button';
import { width } from '@mui/system';
import { useMediaQuery, useTheme } from '@mui/material';
//import { color } from '@mui/system';

const stateToProps = (state) => {
    return state;
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            hide: false,
            redirect: false,
            dev: true
        };
        this.renderRedirect = this.renderRedirect.bind(this);
        this.handlePurge = this.handlePurge.bind(this);
    };


    handlePurge(event){
        event.preventDefault()
        const {dispatch} = this.props;
        dispatch({
                type: PURGE,
                key: 'root',
                result: () => null
            })
    }

    renderRedirect(){
        this.setState({redirect: true})
    }
    render() {
        const loggedIn = this.props.user.loggedIn;
        const admin = this.props.user.admin;
        let userId = this.props.user.userInfo.id;
        return (
            <div className='nav-bar-container'>
                <nav className='navbar navbar-default navbar-fixed-top'>
                    <div className='container-fluid'>
                        <div className='collapse navbar-collapse' id='navbar-collapse-one'>
                            <ul className='nav navbar-nav'>
                                    <li className='nav-button'><Link activeClass='active' className='section-one' to='section-one' spy={true} smooth={true} duration={500}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>One</Button></Link></li>
                                    <li className='nav-button'><Link activeClass='active' className='section-two' to='section-two' spy={true} smooth={true} duration={500}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Two</Button></Link></li>
                                    <li className='nav-button'><Link activeClass='active' className='section-three' to='section-three' spy={true} smooth={true} duration={500}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Three</Button></Link></li>
                                    <li className='nav-button'><Link activeClass='active' className='section-four' to='section-four' spy={true} smooth={true} duration={500}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Four</Button></Link></li>
                                    <li className='nav-button'><Link activeClass='active' className='footer' to='footer' spy={true} smooth={true} duration={500}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Contact</Button></Link></li>
                                    {!admin ? <li className='nav-button form-button'onClick={this.props.handleFormClick}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Send Email</Button></li> : null}
                                    {admin ? <li className='nav-button form-button'onClick={this.handlePurge}><Button size={this.props.size} sx={{color: 'red'}} variant='text'>Purge Redux state</Button></li> : null}
                                    {loggedIn ? 
                                    <li className='nav-button log-in-button' onClick={this.props.handleLogOutClick}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Log Out</Button></li> : 
                                    <li className='nav-button log-in-button'onClick={this.props.handleLogInRenderClick}><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Log In</Button></li>}
                                    {loggedIn && !admin ? <li className='nav-button dashboard-button' onClick={this.renderRedirect} ><Button size={this.props.size} sx={{color: 'white'}} variant='text'>Profile</Button></li> : 
                                    null}
                                    {loggedIn && admin ? 
                                    <li className='nav-button dashboard-button'onClick={this.renderRedirect} ><Button sx={{color: 'white'}} variant='text'>Admin Dashboard</Button></li> : 
                                    null } 
                                    {this.state.redirect ? <Navigate to={`/profile/${userId}`} replace={true} /> : null } 
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default connect(stateToProps)(NavBar);