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
)


const initialState = {
    renderChart: true,
    renderTotalUserCount: true,
    loading: true,
    userOverTimeData: [],
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
        }
    }, extraReducers: {
        [getUsersOverTimeAsync.pending]: (state, action) => {
            console.log(`getting user data over time`);
        }, 
        [getUsersOverTimeAsync.fulfilled]: (state, action) => {
            //console.log(action.payload);
            new Promise((resolve, reject) => {
                resolve(state.loading = false);
                resolve(state.userOverTimeData = action.payload.userOverTime)
            }).then(()=> {
                //console.log(action.payload);
                return action.payload
            })
        }
    }
})

export const {chartReducer, totalUserCountReducer, adminLogOutReducer} = adminSlice.actions;
export default adminSlice.reducer;