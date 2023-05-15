import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setUser, removeUser } from './user/userSlice'
import { removeParkDistanceFromUser } from './park/parkSlice'
import { removeVisits, setVisits } from './visits/visitSlice'
export const signup = createAsyncThunk( 
    'session/signup',
    async( obj, { dispatch, rejectWithValue })=>{
        const response = await fetch('/signup',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()
        if(response.ok){
            dispatch(setUser(data))
            return
        }
        return rejectWithValue(data)
    }
)

export const login = createAsyncThunk( 
    'session/login',
    async( obj, { dispatch, rejectWithValue, getState })=>{
        const response = await fetch('/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()
        if(response.ok){
            dispatch(setUser({ home: data.home, username: data.username, user_image: data.user_image}))
            dispatch(setVisits(data.visits))
            return
        }
        return rejectWithValue(data)
    }
)

export const refresh = createAsyncThunk( 
    'session/refresh' ,
    async( _, { dispatch, rejectWithValue, getState })=>{
        const response = await fetch('/me')
        const data = await response.json()
        if(response.ok){ 
            dispatch(setUser({ home: data.home, username: data.username, user_image: data.user_image}))
            dispatch(setVisits(data.visits))
            removeParkDistanceFromUser()
            return 
        }
        return rejectWithValue(data)
    }
)

export const logout = createAsyncThunk(
    'session/logout',
    async( _,{ dispatch })=>{

        const response = await fetch('/logout',{
            method: 'DELETE'
        })
        if(response.ok){ 
            dispatch(removeUser())
            dispatch(removeVisits())
            dispatch(removeParkDistanceFromUser())
            return 
        }

    }
    
)

const initialState = {
    loggedIn: false,
    status: null,
    error: null
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState,
    reducers: {}, 
    extraReducers: (builder)=> {
        builder
            .addCase( signup.pending , state => {
                state.status = 'pending'
                state.loggedIn = false
            })            
            .addCase( signup.fulfilled, ( state ) => {
                state.status = 'idle'
                state.loggedIn = true
                state.error = null
            })
            .addCase( signup.rejected , (state, action )=> {
                state.status = 'error'
                state.loggedIn = false
                state.error = { errors: action.payload.errors }
            }) 
            .addCase( login.pending , state => {
                state.status = 'pending'
                state.error = null
            })            
            .addCase( login.fulfilled, state => {
                state.status = 'idle'
                state.loggedIn = true
                state.error = null
            })
            .addCase( login.rejected , (state, action )=> {
                state.status = 'idle'
                state.loggedIn = false
                state.error = action.payload
            }) 
            .addCase( refresh.pending, state => {
                state.status = 'pending'
                state.error = null
            })
            .addCase( refresh.fulfilled, state => {
                state.status = 'idle'
                state.loggedIn = true
                state.error = null
            })
            // .addCase( refresh.rejected , (state, action )=> {
            //     state.status = 'idle'
            //     state.loggedIn = false
            //     state.error = action.payload
            // }) 
            .addCase( logout.pending , state => {
                state.status = 'pending'
                state.error = null
            })            
            .addCase( logout.fulfilled, state => {
                state.status = 'idle'
                state.loggedIn = false
                state.error = null
            })
            .addCase( logout.rejected , (state, action )=> {
                state.status = 'idle'
                state.loggedIn = true
                
            }) 




    }
})

export default sessionSlice.reducer