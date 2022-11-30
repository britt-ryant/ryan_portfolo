import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';



//create a seperate thunk to get just the dates and the user amounts since app went live

export const getUsersOverTimeAsync = createAsyncThunk(
    'admin/getUsersOverTimeAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/admin/timechart`)
        if(response.ok){
            let userOverTime = await response.json();
            return {userOverTime}
        } else {
            console.log(`something went wrong getting user over time`);
        }
    }
);

export const getAllUsersAsync = createAsyncThunk(
    'admin/getAllUsers?async',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/admin/all`);
        if(response.ok){
            let allUsers = await response.json();
            return {allUsers}
        } else {
            console.log(`error getting all users from the admin slice`);
        }
    }
)


const initialState = {
    renderChart: true,
    renderTable: true,
    renderTotalUserCount: true,
    loading: true,
    loadingUsers: false,
    userOverTimeData: [],
    allUserData: [],
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        chartReducer: (state, action) => {
            state.renderChart = !state.renderChart;
        },
        totalUserCountReducer: (state, action) => {
            state.renderTotalUserCount = !state.renderTotalUserCount;
        },
        adminLogOutReducer: (state, action) => {
           return initialState
        },
        tableReducer: (state, action) => {
            state.renderTable = !state.renderTable
        }
    }, extraReducers: {
        [getUsersOverTimeAsync.pending]: (state, action) => {
            console.log(`getting user data over time`);
        }, 
        [getUsersOverTimeAsync.fulfilled]: (state, action) => {
            //console.log(action.payload);
            new Promise((resolve, reject) => {
                resolve(state.loading = false);
                let data = [];
                action.payload.userOverTime.map((dataset) => {
                    if(dataset.date !== null){
                        data.push(dataset);
                    }
                });
                resolve(state.userOverTimeData = data)
            }).then(()=> {
                return action.payload
            })
        },
        [getAllUsersAsync.pending]: (state, action) => {
            console.log('getting all user data');
            state.loadingUsers = true
        },
        [getAllUsersAsync.fulfilled]: (state, action) => {
            new Promise((resolve, reject) => {
                resolve(state.loadingUsers = false);
                resolve(state.allUserData = action.payload.allUsers)
            }).then(() => {
                return action.payload.allUsers
            })
        }
    }
})

export const {chartReducer, tableReducer, totalUserCountReducer, adminLogOutReducer} = adminSlice.actions;
export default adminSlice.reducer;