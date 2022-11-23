import { CloudQueue } from '@mui/icons-material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';
import { nanoid } from '@reduxjs/toolkit';

export const addInfoAsync = createAsyncThunk(
    '/api/addInfoAsync',
    async(payload) => {
        console.log(`sending payload from front end to server ----> ${payload}`);
        const id = nanoid();
        const timestamp = new Date().toISOString();
        const response = await fetch(`http://localhost:5000/api/add`,
        {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({  
                                    id: id,
                                    timestamp: timestamp,
                                    first: payload.first, 
                                    last: payload.last, 
                                    email: payload.email,
                                    message: payload.message
                                })
        })
        if(response.ok){
            const entry = await response.json();
            return entry;
        }
    }
);

export const getMessagesByUserAsync = createAsyncThunk(
    '/api/getMessagesByUserAsync',
    async(payload) => {
        let email = payload.toLowerCase();
        const response = await fetch(`http://localhost:5000/api/get/${email}`)
        if(response.ok){
            let messageList = await response.json();
            return messageList;
        }
    }
);

export const getMessageCountAsync = createAsyncThunk(
    '/api/getMessageCountAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/api/totalMessages`)
        if(response.ok){
            let messageCount = await response.json()
            return {messageCount};
        }
    }
)

export const getAllMessagesAsync = createAsyncThunk(
    '/api/getAllMessagesAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/api/allMessages`)
        if(response.ok){
            let messageList = await response.json();
            return messageList;
        }
    }
)

const initialState = {
    data: {}, 
    submitted: false,
    renderList: true,
    renderForm: false,
    messageLoading: true,
    messageCount: 0
}


const formSlice = createSlice({
    name: "form",
    // initialState: {
    //     data: {}, 
    //     submitted: false,
    //     renderList: true,
    //     renderForm: false,
    //     messageLoading: true,
    //     messageCount: 0
    // },
    initialState,
    reducers: {
        infoReducer: (state, action) => {
            //state.submitted = action.payload.submitted
        },
        renderReducer: (state, action) => {
           state.renderForm = !state.renderForm;
        },
        renderListReducer: (state, action) => {
            state.renderList = !state.renderList
        },
        setMessageState: (state, action) => {
            state.data = action.payload
        },
        setStateUponFormSubmit: (state, action) => {
            console.log(`seeting email form state`);
            state.renderForm = false
        },
        resetFormDataReducer: (state, action) => {
            return initialState;
        }
    }, 
    extraReducers: {
        [addInfoAsync.pending]: (state, action) => {
            console.log("posting request form information to db");
        },
        [addInfoAsync.fulfilled]: (state, action) => {
            console.log("posted request form information to db");
            state.submitted = true;
            state.data = action.payload;
            state.messageCount += 1;
        },
        [getMessagesByUserAsync.pending]: (state, action) => {
            state.messageLoading = true
        },
        [getMessagesByUserAsync.fulfilled]: (state, action) => {
            const setState = new Promise((resolve, reject) => {
                resolve(state.messageLoading = false)
            });
            setState.then(() => {
                return action.payload
            })   
        },
        [getAllMessagesAsync.pending]: (state, action) => {
            console.log("getting messages");
        }, 
        [getAllMessagesAsync.fulfilled]: (state, action) => {
            const setState = new Promise((resolve, reject) => {
                resolve(state.messageLoading = false)
            });
            setState.then(() => {
                return action.payload
            })   
        },
        [getMessageCountAsync.pending]: (state, action) => {
            console.log(`Loading message count....`);
        },
        [getMessageCountAsync.fulfilled]: (state, action) => {
            let totalMessages = action.payload.messageCount[0].message_count;
            state.messageCount = totalMessages
        }
    }


})

export const { infoReducer, renderReducer, setMessageState, renderListReducer, resetFormDataReducer } = formSlice.actions;
export default formSlice.reducer;