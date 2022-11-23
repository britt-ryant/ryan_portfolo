import { RepeatOneSharp } from '@mui/icons-material';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const axios = require('axios');

export const getWeatherDataAsync = createAsyncThunk(
    '/weather',
    async(payload) => {
        const latitude = payload.latitude;
        const longitude = payload.longitude;
        console.log(latitude, longitude);
        const response = await fetch(`https://dark-sky.p.rapidapi.com/${latitude},${longitude}?units=auto&lang=en`,
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
            }
        }).then((response) => {
            return response.json();
        }).then(response => console.log(response))
        
        // if(response.status === 200){
        //     return {success: true, data: data}
        // }
        // return {success: false, error: response.statusText}
    }
)
const initialState ={
    data: {},
    loaded: false,
    renderWeatherData: true,
    position: {}
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        renderWeatherInfo: (state, action) => {
            state.renderWeatherData = !state.renderWeatherData
        },
        setPosition: (state, action) => {
            console.log(action.payload);
            state.position = {latitude: action.payload.latitude, longitude: action.payload.longitude}
        }
    }
})

export const {renderWeatherInfo, setPosition} = weatherSlice.actions;
export default weatherSlice.reducer;