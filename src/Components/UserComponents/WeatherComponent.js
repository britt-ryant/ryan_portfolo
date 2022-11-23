import React from 'react';

//import slice files
import { getWeatherDataAsync, setPosition } from '../../redux/weatherSlice';

//import mui components
import {
        Parper,
        Typography,
        Box,
        Stack,
        Paper,
        Button
} from '@mui/material';

//import reat-hot-toast
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';


const WeatherComponent = () => {
const dispatch = useDispatch();
const[loading, setLoading] = React.useState(false);

const handleGetLocation = (event) => {
    event.preventDefault();
    setLoading(true)
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            setLoading(false)
            dispatch(setPosition({latitude: latitude, longitude: longitude}));
            dispatch(getWeatherDataAsync({latitude: latitude, longitude: longitude}))
        })
    } else {
        setLoading(false)
        toast.error(`Please enable Location on your browser, otherwise NY, NY will be your default weather source`)
    }
}


    return (
        <>
        <Paper>
            <Box>
                <Typography>I am the weather component</Typography>
                <Button onClick={handleGetLocation}>Get your current location</Button>
                {loading ? <Typography>Loading Data....</Typography> : null}
            </Box>
        </Paper>
        </>
    )
}


export default WeatherComponent;