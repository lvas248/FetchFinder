import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createVisit = createAsyncThunk(
    'visit/createVisit',
    async( obj, { rejectWithValue })=>{
        const response = await fetch('/visits',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
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

export const editVisit = createAsyncThunk(
    'visit/editVisit',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/visits/${obj.visit_id}`,{
            method: 'PATCH',
            headers: {
                'Content-type':'application/json'
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

export const deleteVisit = createAsyncThunk(
    'visit/deleteVisit',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/visits/${obj}`,{
            method: 'DELETE',
            headers: {
                'Content-type':'application/json'
            }

        })

        const data = await response.json()

        if(response.ok){ 
            return data
        }
        return rejectWithValue(data)
    }
)

const initialState = {
    entity: [],
    status: '',
    error: ''
}

const visitSlice = createSlice({
    name: 'visits',
    initialState: initialState,
    reducers:{
        setVisits: (state, action) => {
            state.entity = action.payload
        },
        removeVisits: (state) =>{
            state.entity = initialState.entity
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( createVisit.pending, state =>{
                state.status = 'pending'
            })
            .addCase( createVisit.fulfilled, (state, action)=>{
                state.status = 'idle'
                state.entity = [...state.entity, action.payload].sort((a,b)=> Date.parse(b.start_time) - Date.parse(a.start_time))
            })
            .addCase( createVisit.rejected, (state, action)=>{
                state.error = action.payload.errors
                state.status = 'idle'
            })
            .addCase( deleteVisit.pending, state => {
                state.status = 'pending'
            })
            .addCase( deleteVisit.fulfilled, (state, action)=>{
                state.entity = state.entity.filter( v => v.id !== action.payload.id)
                state.status = 'idle'
            })
            .addCase( deleteVisit.rejected, (state, action)=>{
                state.error = action.payload
                state.status = 'idle'
            })
            .addCase( editVisit.pending, state => {
                state.status = 'pending'
            })
            .addCase( editVisit.fulfilled, (state, action)=>{
                state.status = 'idle'
                state.entity = state.entity.map( v => {
                    if(v.id === action.payload.id) return action.payload
                    else return v
                }).sort((a,b) => a.start_time - b.start_time)          
            })
            .addCase( editVisit.rejected, ( state, action )=>{
                state.errors = action.payload.errors
            })
}})

export default visitSlice.reducer
export const { setVisits, removeVisits } =  visitSlice.actions