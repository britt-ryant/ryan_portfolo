import React from 'react';

//import MUI library components
import { Button } from '@mui/material';

//import React-router-dom components
import { Navigate } from 'react-router-dom';




export default class NotFound extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    };

    render(){
        return(
            <div className='oops'>
                <h1>Opps! 404: Page not found!</h1>
                {/* <Button variant='text'onClick={() => this.setState({redirect: true})}>Back To Homepage</Button>
                {this.state.redirect && <Navigate to='/' replace={true}/>} */}
            </div>
        )
    }
} ;

