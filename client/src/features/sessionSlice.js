import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setUser } from './user/userSlice'

export const signup = createAsyncThunk( 
    'session/signup',
    async( obj, { dispatch, rejectWithValue})=>{
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
    }
})

export default sessionSlice.reducer