import {createSlice, creatSlice, current, nanoid, createAsyncThunk} from '@reduxjs/toolkit';

export const getLocationAsync = createAsyncThunk(
    '/weather/add',
    async(payload) => {
        // console.log(`in the get location`, payload);
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/weather/addLocation`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                                    id: nanoid(),
                                    userId: payload.id,
                                    latitude: payload.latitude,
                                    longitude: payload.longitude
            })
        });
        if(response.ok){
            let entryResponse = await response.json();
            return { entryResponse } 
        } else {
            console.log(`soething went wrong!`);
        }
    }
);

export const getAllMarkersAsync = createAsyncThunk(
    '/users/getAllLocations',
    async(payload) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/allUserLocations`)
        if(response.ok){
            let markerData = await response.json();
            let dataReformat = []
            markerData.forEach(element => {
                dataReformat.push({
                    first: element.first,
                    last: element.last,
                    timestamp: element.timestamp,
                    location: {
                        lat: Number(element.latitude),
                        lng: Number(element.longitude)
                    }
                })
            });
            // console.log(dataReformat);
            return {dataReformat}
            // return { markerData }

        } else {
            console.log(`Error getting data!`);
        }
    }
)

const initialState = {
    oAuthJson: {},
    oAuthLoggedIn: false,
    currentLocation: {},
    renderMap: true
}

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        loggedInReducer: (state, action) => {
            // console.log(action);
            state.oAuthLoggedIn = action.payload.data;
            // state.oAuthLoggedIn = action.payload
        },
        oAuthUserInfoReducer: (state, action) => {
            // console.log(action.payload);
        },
        setLocationReducer: (state, action) => {
            state.currentLocation = action.payload
            // console.log(action.payload);
        },
        renderMapReducer: (state, action) => {
            state.renderMap = !state.renderMap;
        }
    },
    extraReducers: {
        [getLocationAsync.pending]: (state, action) => {
            console.log(`fetching loctaion`);
        }, 
        [getLocationAsync.fulfilled]: (state, action) => {
            console.log(`got location and it is stored`);
        },
        [getAllMarkersAsync.pending]: (state, action) => {
            console.log(`Getting all marker info...`);
        },
    }
})

export const {loggedInReducer, oAuthUserInfoReducer, setLocationReducer, renderMapReducer} = infoSlice.actions;
export default infoSlice.reducer