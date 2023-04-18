import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import updateParkDistances from '../../turf'

export const getParks = createAsyncThunk(
    'parks/get',
    async(_,{rejectWithValue, getState})=>{
        const response = await fetch('/parks')
        const data = await response.json()

        if(response.ok){        
            return data
        }
        return rejectWithValue(data)
    }
)

export const uploadParkImages = createAsyncThunk(
    'parks/UploadImages',
    async(obj, { rejectWithValue })=>{
        const response = await fetch(`/park_images/${obj.park_id}`,{
            method: 'POST',
            body: obj.formData
        })

        const data = await response.json()
        if(response.ok){
            return data
        }
        return rejectWithValue(data)
    }
)

const initialState = {
    entity:[],
    status: 'idle',
    error: ''
}

const parkSlice = createSlice({
    name: 'park',
    initialState: initialState,
    reducers:{
        setParks: (state, action) =>{
            state.entity = action.payload
        },
        updateParkDistanceFromUser: (state, action) =>{
            state.entity = state.entity.map( p =>{
                return {...p, distance_from_user: updateParkDistances([p.long, p.lat], action.payload)}
            })
        },
        removeParkDistanceFromUser: (state) =>{
            state.entity = state.entity.map( p =>{
                return {...p, distance_from_user: 1}
            })
        }
    },
    extraReducers: builder =>{
        builder
            .addCase( getParks.pending, state => {
                state.status = 'pending'
            })
            .addCase( getParks.fulfilled, (state,action) => {
                state.status = 'idle'
                state.entity = action.payload
            })
            .addCase( getParks.rejected, (state,action) => {
                state.status = 'idle'
                state.error = action.error
            })
            .addCase( uploadParkImages.pending, state => {
                state.status = 'pending'
            })
            .addCase( uploadParkImages.fulfilled, (state,action) => {
                state.status = 'idle'
                state.entity = state.entity.map( p => {
                   if(p.id === action.payload[0].park.id){
                        p.park_images = p.park_images.concat(action.payload)
                    return p
                   } 
                   else return p
                })
            })


    }
}

)

export default parkSlice.reducer

export const { setParks, updateParkDistanceFromUser, removeParkDistanceFromUser } = parkSlice.actions