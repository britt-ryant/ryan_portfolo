import React, { useEffect } from 'react';

//import redux state
import {connect, useDispatch, useSelector } from 'react-redux';

//import reducers
import {getAllUsersAsync} from '../../../redux/adminSlice';

//import MUI components
import {
        Paper,
        Toolbar,
        Container,
        Box,
        Typography,
        Divider
        
} from '@mui/material'

import {DataGrid} from '@mui/x-data-grid';

const columns = [
    {field: 'id', headerName: 'ID', flex: 1},
    {field: `timestamp`, headerName: 'Date Created', flex:1},
    {field: `first`, headerName: 'First Name', flex:1},
    {field: `last`, headerName: 'Last Name', flex:1},
    {field: `email`, headerName: 'Email', flex:1},
    {field: `password`, headerName: 'Hashed Password', flex:1}
];

const rows = [
{id: "12322", timestamp: 'asdsadasd', first: 'sdfdfdfd', last: 'sdfsdfsdfdsf', email: "sdfdfdfsd", password: 'asdfsdaasd'}
]

const loadingMessage = [
    {id: 'Loading information...'}
]


const TableManager = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.admin.allUserData);
    const loading = useSelector(state => state.admin.loadingUsers);
    

    React.useEffect(() => {
        dispatch(getAllUsersAsync()).then(() => {
            return handleUserData();
        })
    },[]);

    const handleUserData = () => {
        return users
    }

    return (
            // <div style={{height: '70%', width: '70%'}}>
            <Container>
                <Toolbar />
                    <Paper  
                            width={1} 
                            sx={{
                                p:2,
                                border:2,
                                minWidth: "50vw",
                                // width: '100%',
                                marginBottom: 10,
                                boxShadow: 20,
                                // height: 700
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
                            >User Table Data</Typography>
                        <DataGrid 
                            autoHeight={true}
                            rows={loading ? loadingMessage : users}
                            columns={columns}
                            />
                    </Paper>
            </Container>
            // </div>
    )
}


export default TableManager;