import React from 'react';
import { connect } from 'react-redux';


const stateToProps = state => {
    return state.form
}

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("being clicked!");
        console.log(this.props)
        
    }
    render(){
        return(
            <div className='footer-container'>
                <p>Made by Ryan Britt</p>
                {/* {this.props.renderForm ? <p>hello</p> : <p>goodbye</p>}
                <button onClick={this.handleClick}>Click Me for store access</button> */}
            </div>
        )
    }
}
export default connect(stateToProps)(Footer)