import React, { useEffect } from 'react';
// import {connect} from 'react-redux';

//import google maps api components
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

//import MUI components
import {
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMarkersAsync } from '../../../redux/infoSlice';



const MapComponent = (props) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true);
    const [adminLocations, setAdminLocations] = React.useState([]);
    const [selected, setSelected] = React.useState({});
    const currentLocation = useSelector(state => state.info.currentLocation);
    const admin = useSelector(state => state.user.admin);

    useEffect(() => {
        if(currentLocation.lat){
            setLoading(false)
        }
        
    }, [currentLocation]);

    useEffect(() => {
        if(admin){
            // console.log(`getting locations from useEffect`);
            dispatch(getAllMarkersAsync()).then((data)=> {
                setAdminLocations(data.payload.dataReformat)
            })
        }
    }, [])

    const mapStyles = {
        height: '30vh',
        width: '100%'
    };
    const defaultCenter = {
        lat: currentLocation.lat,
        lng: currentLocation.lng
    };

    const loadingData = () => {
        return(
            <React.Fragment>
                <Typography>Loading Map Data...</Typography>
                <CircularProgress color='secondary' />
            </React.Fragment>
        )
    };

    const onSelect = (item) => {
        setSelected(item)
    }
    const googleMap = () => {
        return (
            <React.Fragment>
                   <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={13}
                                center={defaultCenter}
                                >
                                    {!admin ? <Marker key={1} position={currentLocation} /> : null }
                                    {admin && adminLocations ? 
                                        adminLocations.map(item => {
                                            return(
                                                <Marker key={item.timestamp} 
                                                        position={item.location}
                                                        onClick={() => onSelect(item)} />
                                            )
                                        }) : <Marker key={1} position={currentLocation} /> }
                                        {selected.location && 
                                            (
                                                <InfoWindow
                                                    position={selected.location}
                                                    clickable={true}
                                                    onCloseClick={() => setSelected({})}
                                                >
                                                    <div>
                                                    <p>{selected.first} {selected.last}</p>
                                                    <p>{selected.timestamp}</p>

                                                    </div>
                                                </InfoWindow>
                                            )}
                                    
                                </GoogleMap>
                    </LoadScript>
            </React.Fragment>
        )
    }


    return(
        <Paper sx={{p:2}}>
            <Typography
                    // sx={{border: 2}}
                        >
                {admin ? "User Locations" : "Your Location"}</Typography>
            {!loading ? googleMap() : loadingData() }
        </Paper>
    )
}


export default MapComponent;