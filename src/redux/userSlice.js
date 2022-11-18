import { createSlice, createAsyncThunk, current, nanoid } from '@reduxjs/toolkit';
import { get } from 'react-scroll/modules/mixins/scroller';


const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD
const adminEmail = process.env.REACT_APP_ADMIN_EMAIL

export const getUserDataAsync = createAsyncThunk(
    '/user/getUserDataAsync',
    async(payload) => {
        //console.log("getting user information...");
        let email = payload.email.toLowerCase();
        const response = await fetch(`http://localhost:5000/user/get/${email}/${payload.password}`)
        if(response.ok){
            let userInfo = await response.json();
            return { userInfo }
        } else {
            console.log("Something went wrong with dbQuery, check server console");
        }
    }
);

export const getUserByIdAsync = createAsyncThunk(
    '/user/getUserByIdAsync', 
    async(payload) => {
        let id = payload.id;
        const response = await fetch(`http://localhost:5000/user/get/${id}`)
        if(response.ok){
            let userInfo = await response.json();
            console.log(userInfo);
            return {userInfo}
        }
    }
)

export const updateUserPasswordAsync = createAsyncThunk(
    '/user/updateUserPasseordAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/user/put/${payload.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({id: payload.id, password: payload.password})
            })
        if(response.ok){
            let userInfo = await response.json();
            return { userInfo }
        }
    }
)

export const createUserAsync = createAsyncThunk(
    '/user/add',
    async(payload) => {
        let admin = false;
        payload.email === adminEmail && payload.password === adminPassword ? admin = true : admin = false;
        console.log("posting user to db...");
        const id = nanoid();
        const email = payload.email.toLowerCase();
        const response = await fetch(`http://localhost:5000/user/add`, 
        {
            method: `POST`,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({  id: id,
                                    first: payload.first,
                                    last: payload.last,
                                    email: email,
                                    password: payload.password,
                                    admin: admin
                                })
        });
        if(response.ok){
            const newUser = await response.json();
            return { newUser };
        }
    }
);

export const updateUserAsync = createAsyncThunk(
    '/user/updateUserAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/user/${payload.user.id}`,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                                user: payload.user,
                                formData: payload.formData,
                            })
        })
            if(response.ok){
                const result = await response.json();
                return{ result };
            }
        }
)


const initialState = { 
        admin: false,
        loggedIn: false, 
        userInfo:  {
                    id: "",
                    first: "",
                    last: "",
                    email: "",
                    password: "",
                    admin: false
                    }, 
        renderForm: {
                    logIn: false, 
                    createAccount: false,
                    editAccount: false
                    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        adminReducer: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
        },
        logInFormReducer: (state, action) => {
            state.renderForm.logIn = !state.renderForm.logIn;
        },
        createAccountFormReducer: (state, action) => {
            state.renderForm.createAccount = !state.renderForm.createAccount;
        },
        setState: (state, action) => {  
            let admin = false;      
            if(action.payload.admin === "1"){
                admin = true;
            }
            state.userInfo = { 
                ...state.userInfo,
                password: action.payload.password,
                id: action.payload.id,
                first: action.payload.first,
                last: action.payload.last,
                email: action.payload.email 
            };
            state.renderForm.logIn = false;
            state.renderForm.createAccount = false;
            state.loggedIn = true;
            state.admin = admin;
        },
        logOut: (state, action) => {
            return initialState;
        },
        editAccountFormReducer: (state, action) => {
            state.renderForm.editAccount = !state.renderForm.editAccount
        }
    },
    extraReducers: {
        [getUserDataAsync.pending]: (state, action) => {
            console.log("getting password from db...");
        },
        [getUserDataAsync.fulfilled]: (state, action) => {
            let returnData = action.payload.userInfo[0];
            if(returnData){
                let currentState = current(state);
                let newState = {
                    ...currentState,
                    admin: returnData.admin,
                    userInfo: {
                        id: returnData.id,
                        email: returnData.email,
                    }
                };
                return newState;
            };
        },
        [createUserAsync.pending]: (state, action) => {
            console.log("posting new user to db...");
        },
        [createUserAsync.fulfilled]: (state, action) => {
            let currentState = current(state);
            //console.log(currentState);
            return currentState;
        },
        [getUserByIdAsync.pending]: (state, action) => {
            console.log("fetching user by id...");
        },
        [getUserByIdAsync.fulfilled]: (state, action) => {
            console.log(action);
        },
        [updateUserPasswordAsync.pending]: (state, action) => {
            console.log("updating user password");
        },
        [updateUserPasswordAsync.fulfilled]: (state, action) => {
            console.log("password updated!");
            return action.userInfo
        },
        [updateUserAsync.pending]: (state, action) => {
            console.log("Updating user info");
        }, 
        [updateUserAsync.fulfilled]: (state, action) => {
            let currentState = current(state);
            let updateState = new Promise((resolve, reject) => {
                resolve(state.userInfo = {
                                            admin: currentState.admin,
                                            ...action.payload.result
                })
            }).then((data) => {
                return data
            })
        }
    }

})


export const {adminReducer, logInFormReducer, createAccountFormReducer, setState, logOut, editAccountFormReducer} = userSlice.actions;
export default userSlice.reducer;