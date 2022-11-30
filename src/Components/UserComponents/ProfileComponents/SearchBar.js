import React from 'react';

//import redux connect
import {connect} from 'react-redux';

//import MUI components
import {
        Box,
        Button,
        InputLabel,
        TextField,
        Select,
        MenuItem,
        FormControl
} from '@mui/material';

import {getMessagesBySearchAsync} from '../../../redux/formSlice';


const stateToProps = (state) => {
    return state
};

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            select: 'first'
        }
        this.setSearch = this.setSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelector = this.handleSelector.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();   
        const {dispatch} = this.props;
        dispatch(getMessagesBySearchAsync({select: this.state.select, searchString: this.state.searchString})).then((data)=>{
            this.props.searchResults(data.payload);
        })
    }

    setSearch(event){
        this.setState({searchString: event.target.value}); 
    };

    handleSelector(event){
        this.setState({select: event.target.value})
    }

    render(){
        return (
            <>
            <Box
                onSubmit={this.handleSubmit}
                component="form"
                noValidate
                autoComplete='on'
                sx={{display: 'flex'}}
                >
                <TextField 
                        variant='outlined'
                        label="Search"
                        name='search'
                        onChange={this.setSearch}
                        sx={{minWidth: '50%'}}
                        />
                <Box sx={{minWidth: '50%', paddingLeft :2, paddingRight: 2}}>
                    <FormControl fullWidth>
                        <InputLabel id='search-conditions'>Filter Type</InputLabel>
                            <Select 
                                labelId='search-conditions'
                                id='search-con'
                                value={this.state.select}
                                label="Filter Type"
                                onChange={this.handleSelector}
                                >
                                    <MenuItem value={"first"}>First Name</MenuItem>
                                    <MenuItem value={"last"}>Last Name</MenuItem>
                                    <MenuItem value={"email"}>Email</MenuItem>
                                    <MenuItem value={"message"}>Message</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button sx={{minWidth: '25%'}} type='submit' variant='outlined'>Search</Button>
            </Box>
            </>
        )
    }

}


export default connect(stateToProps)(SearchBar);