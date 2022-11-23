import React from 'react';

//import redux connect
import {connect} from 'react-redux';

//import MUI components
import {Paper, Typography, Divider} from '@mui/material';
import { getTotalUserCountAsync } from '../../../redux/userSlice';
import { getMessageCountAsync } from '../../../redux/formSlice';

const stateToProps = (state) => {
    return state;
}


class UserStats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.props
        }
    }

    componentDidMount(){
        const {dispatch} = this.props;
        if(!this.state.userCount){
            this.dataHandling(dispatch(getTotalUserCountAsync()));
            this.dataHandling(dispatch(getMessageCountAsync()));
        }
    }

    componentDidUpdate(prevProps, prevState){
      
    }

    dataHandling(query){
        query.then((data) => {
            if(data.payload.userCount){
                this.renderUserCount(data.payload.userCount[0])
            } else if(data.payload.messageCount){
                this.setState({
                    messageCount: true
                })
            }
        })
    }

    renderUserCount(count){
        this.setState({
            userTotal: count.user_total
        })
    }

    render(){
        return(
            <Paper
                    sx={{
                        border: 2,
                        boxShadow: 20,
                        p: 2,
                        // marginLeft: 6,
                        textAlign: 'left'
                    }}>
                <Typography
                                noWrap
                                component="h3" 
                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                    textAlign: 'left'
                                }}
                                variant="h5" 
                                color="primary" 
                                gutterBottom
            >
                Users</Typography>
                <Divider />
                <Typography
                                noWrap
                                component="h2" 
                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                    textAlign: 'left'
                                }}
                                variant="h5" 
                                gutterBottom
            >
                Total Users:      {this.state.userTotal ? this.state.userTotal : "Loading user total..."}</Typography>
                <Divider />
                <Typography 
                         noWrap
                         component="h3" 
                         sx={{
                             p: 1,
                             paddingBottom:0,
                             textAlign: 'left'
                         }}
                         variant="h6" 
                         color="primary" 
                         gutterBottom>
                Total Messages: {this.state.messageCount ? this.props.form.messageCount : "Loading message total..."}</Typography>
                <Divider />
      
            </Paper>
        )
    }
};

export default connect(stateToProps)(UserStats);