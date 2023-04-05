import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getParks = createAsyncThunk(
    'park/get',
    async(_,{rejectWithValue})=>{
        const response = await fetch('/parks')
        const data = await response.json()

        if(response.ok){
            return data
        }
        return rejectWithValue(data)
    }
)
const initialState = {
    entity :[],
    status: 'idle',
    error: ''
}

const parkSlice = createSlice({
    name: 'park',
    initialState: initialState,
    reducers:{

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


    }
}

)

export default parkSlice.reducer

export const { setParks } = parkSlice.actions