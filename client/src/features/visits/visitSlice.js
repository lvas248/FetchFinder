import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToVisitedParks, removeFromVisitedParks, updateVisitedParksAfterEdit } from "../user/userSlice";

export const createVisit = createAsyncThunk(
    'visit/createVisit',
    async( obj, { getState, dispatch, rejectWithValue })=>{
        const response = await fetch('/visits',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data = await response.json()

        if(response.ok){ 
            if(!getState().visit.entity.find( v => v.park.name === data.park.name)) dispatch(addToVisitedParks({name: data.park.name, id: data.park.id}))
            return data
        }

        return rejectWithValue(data)
    }
)

export const editVisit = createAsyncThunk(
    'visit/editVisit',
    async( obj, { getState, dispatch, rejectWithValue })=>{
        const response = await fetch(`/visits/${obj.visit_id}`,{
            method: 'PATCH',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data = await response.json()  

        if(response.ok){ 
            
            const allVisits = getState().visit.entity.map( v => {
                if(v.id === data.id) return data
                else return v
            })

            const uniqueParks = []

            allVisits.forEach( v =>{
                if(!uniqueParks.find( p => p.name === v.park.name)) uniqueParks.push({name: v.park.name, id: v.park.id})
            })

            dispatch(updateVisitedParksAfterEdit(uniqueParks))

            return data
        }
        return rejectWithValue(data)
    }

)

export const deleteVisit = createAsyncThunk(
    'visit/deleteVisit',
    async( obj, { getState, dispatch, rejectWithValue })=>{
        const response = await fetch(`/visits/${obj}`,{
            method: 'DELETE',
            headers: {
                'Content-type':'application/json'
            }

        })

        const data = await response.json()

        if(response.ok){ 
            if(getState().visit.entity.filter( v => v.park.name === data.park.name).length === 1) dispatch(removeFromVisitedParks({name: data.park.name}))
            return data
        }
        return rejectWithValue(data)
    }
)

const initialState = {
    entity: [],
    status: 'idle',
    errors: {}
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
        },
        removeErrors: (state) =>{
            state.errors = initialState.errors
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( createVisit.pending, state =>{
                state.status = 'pending'
                state.errors = initialState.errors
            })
            .addCase( createVisit.fulfilled, (state, action)=>{
                state.status = 'idle'
                state.entity = [...state.entity, action.payload].sort((a,b)=> Date.parse(b.start_time) - Date.parse(a.start_time))
                state.errors = initialState.errors
            })
            .addCase( createVisit.rejected, (state, action)=>{
                state.errors = action.payload
                state.status = 'idle'
            })
            .addCase( deleteVisit.pending, state => {
                state.status = 'pending'
                state.errors = initialState.errors
            })
            .addCase( deleteVisit.fulfilled, (state, action)=>{
                state.entity = state.entity.filter( v => v.id !== action.payload.id)
                state.status = 'idle'
                state.errors = initialState.errors
            })
            .addCase( deleteVisit.rejected, (state, action)=>{
                state.errors = action
                state.status = 'idle'
            })
            .addCase( editVisit.pending, state => {
                state.status = 'pending'
                state.errors = initialState.errors
            })
            .addCase( editVisit.fulfilled, (state, action)=>{
                state.status = 'idle'
                state.errors = initialState.errors
                state.entity = state.entity.map( v => {
                    if(v.id === action.payload.id) return action.payload
                    else return v
                }).sort((a,b) => a.start_time - b.start_time)          
            })
            .addCase( editVisit.rejected, ( state, action )=>{
                state.errors = {errors: action.payload?.errors, visit: action.meta.arg.visit_id}
                state.status = 'idle'
            })
}})

export default visitSlice.reducer
export const { setVisits, removeVisits, removeErrors } =  visitSlice.actions