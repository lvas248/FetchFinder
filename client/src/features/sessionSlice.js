import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setUser, removeUser } from './user/userSlice'
import { setParks } from './park/parkSlice'
import updateParkDistances from '../turf'

export const signup = createAsyncThunk( 
    'session/signup',
    async( obj, { dispatch, rejectWithValue, getState})=>{
        const response = await fetch('/signup',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()
        if(response.ok){
            const parks = getState().park.entity
            const updatedParks = parks.map( p => {
                return {...p, distance_from_user: updateParkDistances([p.long, p.lat],data.home)}
            })
            dispatch(setUser(data))
            dispatch(setParks(updatedParks))

            
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
        //if response ok, update distance_from_park attribute in parks and update user
        if(response.ok){
            const parks = getState().park.entity
            const updatedParks = parks.map( p => {
                return {...p, distance_from_user: updateParkDistances([p.long, p.lat],data.home)}
            })
            //set user
            dispatch(setUser(data))
            //update parks with distance from user
            dispatch(setParks(updatedParks))
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
            const parks = getState().park.entity
            const updatedParks = parks.map( p => {
                return {...p, distance_from_user: updateParkDistances([p.long, p.lat], data.home)}
            })
            dispatch(setUser(data))
            dispatch(setParks(updatedParks))
            return 
        }
        return rejectWithValue(data)
    }
)

export const logout = createAsyncThunk(
    'session/logout',
    async( _,{ dispatch, getState })=>{

        const response = await fetch('/logout',{
            method: 'DELETE'
        })
        if(response.ok){ 
            dispatch(removeUser())

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
                state.error = action.payload
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