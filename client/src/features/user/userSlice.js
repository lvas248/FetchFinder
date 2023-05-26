import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateParkDistanceFromUser } from "../park/parkSlice";
import { removeVisits } from "../visits/visitSlice";
import { removeParkDistanceFromUser } from "../park/parkSlice";

export const editUser = createAsyncThunk(
    'user/editUser',
    async(obj, { rejectWithValue })=>{
        const response = await fetch('/user',{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()

        if(response.ok){
            return data
        }
        return rejectWithValue(data)
    }
)

export const uploadUserImage = createAsyncThunk(
    'user/image_upload',
    async(obj, { rejectWithValue })=>{
        const response = await fetch('/upload_user_image',{
            method: 'POST',
            body: obj
        })
        const image = await response.json()

        if(response.ok){
            return image
        }

        return rejectWithValue(image)
    }

)

export const getUserPosition = createAsyncThunk(
    'user/getPosition',
    async( _, { dispatch })=>{
        return new Promise((resolve, reject)=>{
           navigator.geolocation.getCurrentPosition( 
            p=>{
                const coords = [p.coords.longitude, p.coords.latitude]
                dispatch(updateParkDistanceFromUser(coords))
                resolve(coords)
            },
            error => {
                reject(error)
            }) 
        })
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async(_,{dispatch, rejectWithValue})=>{
        const response = await fetch('/user',{
            method: 'DELETE',
            headers: {
                'Content-type':'application/json'
            }
        })

        const data = await response.json()

        if(response.ok){
            dispatch(removeVisits())
            dispatch(removeParkDistanceFromUser())
            return data
        } 
        return rejectWithValue(data)
    }
)


const initialState = {
    entity: {
        username: '',
        image: {}
    },
    location: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        setUser: ( state, action) => {
            state.entity = action.payload
        },
        removeUser: ( state ) => {
            state.entity = initialState.entity
            state.location = null
        }, 
        setUserLocation: (state, action) => {
            state.location = action.payload
        },
        clearError: ( state ) =>{
            state.error = initialState.error
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( editUser.pending, state => {
                state.status = 'pending'
            })
            .addCase( editUser.rejected,( state, action ) => {
                state.status = 'idle'
                state.error = action.payload.errors
            })
            .addCase( editUser.fulfilled, (state,action)=>{
                state.status = 'idle'
                state.entity = action.payload
            })
            .addCase( uploadUserImage.pending, state => {
                state.status = 'pending'
            })
        
            .addCase( uploadUserImage.fulfilled, (state, action)=>{
                state.status = 'idle'
                state.entity = {...state.entity, image: action.payload}
            })
            .addCase( uploadUserImage.rejected, ( state, action ) => {
                state.status = 'idle'
                state.error = action.payload
            })

            .addCase( getUserPosition.pending, state=>{
                state.status = 'pending'
            })
            .addCase( getUserPosition.fulfilled, (state, action)=>{
                state.status = 'fullfilled'
                state.location = action.payload
            })
            .addCase( getUserPosition.rejected, (state, action)=>{
                state.status = 'rejected'
                state.error = action.payload
            })
            .addCase( deleteUser.pending, ( state )=>{
                state.status = 'pending'
            })
            .addCase( deleteUser.fulfilled, ( state )=>{
                state.status = 'idle'
                state.entity = initialState
                state.location = null
                state.error = null
            })
            .addCase( deleteUser.rejected, (state, action)=>{
                state.status = 'idle'
                state.error = action.payload
            })



            
    }

}

)


export default userSlice.reducer

export const { setUser, removeUser, setUserLocation, clearError } = userSlice.actions