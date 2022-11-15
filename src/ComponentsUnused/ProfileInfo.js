import React, { useEffect } from 'react';
//import redux components
import { connect } from 'react-redux';
//import react-hot-toast
import toast from 'react-hot-toast';
//import MUI components
import { Avatar, Stack, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { border } from '@mui/system';



const stateToProps = (state) => {
    return state;
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

class ProfileInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {...this.props }
    };

    componentDidMount(){
        let initials = this.state.user.userInfo.first.toString().charAt(0).toUpperCase();
        initials += this.state.user.userInfo.last.toString().charAt(0).toUpperCase();
        this.setState({ initials: initials})        
    }

    render(){
        const user = this.state.user.userInfo;
        return(
            <div className='profile-info'>
                <Box sx={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '75%',
                    height:300,
                    bgcolor: '#009688',
                    boxShadow: 10,
                    p: 5 }}>
                    <Grid container spacing={2}>
                            <Avatar>{this.state.initials}</Avatar>
                        <Grid item xs={2}>
                            <Item>{user.first}</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>{user.last}</Item>
                        </Grid>
                        <Grid item xs={5}>
                            <Item>{user.id}</Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>{user.email}</Item>
                        </Grid>
                    </Grid>

                </Box>
            </div>
        )
    }
};

export default connect(stateToProps)(ProfileInfo);


