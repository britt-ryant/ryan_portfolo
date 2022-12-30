import React, { useEffect } from 'react';

//import slice files
import { getWeatherDataAsync, setPosition } from '../../redux/weatherSlice';
import { getLocationAsync, setLocationReducer } from '../../redux/infoSlice';

//import mui components
import {
        Typography,
        Box,
        Stack,
        Paper,
        Button,
        CircularProgress,
        Divider
} from '@mui/material';

//import icons for weather from weather-icons-react
import {
        WiCloud,
        WiDaySunny,
        WiRain,
        WiSnow,
        WiFog,
        WiSleet,
        WiStrongWind,
        WiHail,
        WiLightning,
        WiThunderstorm,
        WiNightClear,
        WiNA
} from "weather-icons-react";

//import reat-hot-toast
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


const WeatherComponent = () => {
    const dispatch = useDispatch();
    const[loading, setLoading] = React.useState(true);
    const weather = useSelector(state => state.weather);
    const user = useSelector(state => state.user);


React.useEffect(() => {
    handleGetLocation(false)
},[])


    const handleGetLocation = (event) => {
        
        if(event){
            event.preventDefault();
        }
        setLoading(true);
        navigator.permissions.query({ name: 'geolocation'}).then((data) => {
            // console.log(data)
            if(data.state === 'denied'){
                toast.error(`Please enable Location on your browser, otherwise NY, NY will be your default weather source`);
                getWeatherData(40.730610, -73.935242);
            } else {
                navigator.geolocation.getCurrentPosition((position) => {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    getWeatherData(latitude, longitude);
                    // console.log(latitude, longitude);
                    dispatch(getLocationAsync({
                                                id: user.userInfo.id,
                                                latitude: latitude, 
                                                longitude: longitude
                                            }))
                    dispatch(setLocationReducer({lat: latitude, lng: longitude}))
                })
            }
        })
        // if(navigator.geolocation !== {}){
        // } else {
        // }
    }

    const getWeatherData = (latitude, longitude) => {
        console.log(`in get weather data`);
        dispatch(setPosition({latitude: latitude, longitude: longitude}));
        dispatch(getWeatherDataAsync({latitude: latitude, longitude: longitude})).then(() => {
            setLoading(false)
        })
    }

    const iconSelector = () => {
        if(weather.data.currently){
            let icon = weather.data.currently.icon;
            switch(icon){
                case "clear-day":
                    return <WiDaySunny size={50}/>
                case "clear-night":
                    return <WiNightClear size={50} />
                case "rain":
                    return <WiRain size={50}/>
                case "snow":
                    return <WiSnow size={50}/>
                case " fog":
                    return <WiFog size={50}/>
                case "sleet":
                    return <WiSleet size={50}/>
                case "wind":
                    return <WiStrongWind size={50}/>
                case "cloudy":
                    return <WiCloud size={50}/>
                case "partly-cloudy-day":
                    return <WiCloud size={50}/>
                case "partly-cloudy-night":
                    return <WiCloud size={50}/>
                case "hail":
                    return <WiHail size={50}/>
                case "lightning":
                    return <WiLightning size={50}/>
                case "thunderstorm":
                    return <WiThunderstorm size={50}/>
                default:
                    console.log("default in weather icon switch");
                    return <WiNA size={50}/>
            }
        }
    }

    const loadingData = () => {
        return(
            <React.Fragment>
                <CircularProgress color='secondary' />
            </React.Fragment>
        )
    }


    return (
        <>
        <Paper sx={{
                        border: 2,
                        boxShadow: 20,
                        p: 2,
                        // marginLeft: 6,
                        textAlign: 'left'
                    }}>
            <Box>
                <Stack>
                    <Box sx={{display: 'flex'}}>
                    <Typography noWrap
                                component="h3" 
                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                    textAlign: 'left'
                                }}
                                variant="h5" 
                                color="primary" 
                                gutterBottom>Current Weather</Typography>
                                <Box
                                    sx={{
                                        marginLeft: 'auto',
                                        marginRight: '2.5%'
                                    }}>
                                  {!loading ? iconSelector() : loadingData()}

                                </Box>
                    </Box>
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
                    >Summary: {!loading && weather.data.currently ? weather.data.currently.summary : loadingData()}</Typography>
                    <Divider/>
                    <Typography
                                noWrap
                                color='primary'
                                component="h3" 
                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                    textAlign: 'left'
                                }}
                                variant="h6" 
                                gutterBottom
                    >Temperature: {!loading && weather.data.currently ? `${weather.data.currently.temperature} °F` : loadingData()}</Typography>
                    <Divider/>
                    <Typography
                                noWrap
                                component="h3" 

                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                    textAlign: 'left'
                                }}
                                variant="h6" 
                                gutterBottom
                    >Average Wind Speed: {!loading && weather.data.currently ? `${weather.data.currently.windSpeed} mph`: loadingData()}</Typography>
                    <Divider/>
                    {/* <Typography
                                noWrap
                                component="h3" 
                                color= "primary"
                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                    textAlign: 'left',
                                }}
                                variant="h6" 
                                gutterBottom
                    >Percipitation Probability: {!loading && weather.data.currently ? `${weather.data.currently.precipProbability}%`: loadingData()}</Typography>
                    <Divider/>
                    <Typography
                                noWrap
                                component="h3" 

                                sx={{
                                    p: 1,
                                    paddingBottom:0,
                                    textAlign: 'left'
                                }}
                                variant="h6" 
                                gutterBottom
                    >Percipitation Intensity: {!loading && weather.data.currently ? `${weather.data.currently.precipIntensity} in`: loadingData()}</Typography>
                    <Divider/> */}
                </Stack>
                {/* <Button 
                    sx={{p: 2}}
                    onClick={handleGetLocation}>Get Local Weather Data</Button> */}
                {/* {loading ? loadingData() : null} */}
                

            </Box>
        </Paper>
        </>
    )
}


export default WeatherComponent;