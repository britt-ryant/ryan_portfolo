import { RepeatOneSharp } from '@mui/icons-material';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const axios = require('axios');

export const getWeatherDataAsync = createAsyncThunk(
    '/weather',
    async(payload) => {
        const latitude = payload.latitude;
        const longitude = payload.longitude;
        const response = await fetch(`https://dark-sky.p.rapidapi.com/${latitude},${longitude}?units=auto&lang=en`,
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
            }
        })
        if(response.ok){
            let data = await response.json();
            return { data }
        }
    }
)
const initialState ={
    data: {},
    loaded: false,
    renderWeatherData: true,
    position: {},
    icon: false
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        renderWeatherInfo: (state, action) => {
            state.renderWeatherData = !state.renderWeatherData
        },
        setPosition: (state, action) => {
            state.position = {latitude: action.payload.latitude, longitude: action.payload.longitude}
        }
    },
    extraReducers:{
        [getWeatherDataAsync.pending]: (state, action) => {
            console.log(`getting weather data....`);
        },
        [getWeatherDataAsync.fulfilled]: (state, action) => {
            state.data = action.payload.data
        }
    }
})

export const {renderWeatherInfo, setPosition} = weatherSlice.actions;
export default weatherSlice.reducer;