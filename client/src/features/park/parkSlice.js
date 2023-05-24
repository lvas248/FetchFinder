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
        const response = await fetch(`/parks/upload_images/${obj.park_id}`,{
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

export const addCommentToPark = createAsyncThunk(
    'parks/addComment',
    async(obj, { rejectWithValue })=>{
        const response = await fetch('/comments',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(obj)        
        })

        const data = await response.json()

        if(response.ok) return data

        return rejectWithValue(data)
 
    }
)
export const deleteComment = createAsyncThunk(
    'park/deleteComment',
    async( obj, {rejectWithValue} )=>{

        const response = await fetch('/comments',{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id: obj.comment_id})        
        })

        const data = await response

        if(response.ok) return obj

        return rejectWithValue(data)
    }
)
export const updateComment = createAsyncThunk(
    'parks/updateComment',
    async(obj, { dispatch, rejectWithValue })=>{
        const response = await fetch(`/comments/${obj.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ comment: obj.comment})        
        })

        const data = await response.json()

        if(response.ok) return data

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
                return {...p, distance_from_user: updateParkDistances([p.central_coords[1], p.central_coords[0]], action.payload)}
            })
        },
        removeParkDistanceFromUser: (state) =>{
            state.entity = state.entity.map( p =>{
                return {...p, distance_from_user: null}
            })
        },
        alphabetizeParks: ( state ) =>{
            state.entity = state.entity.sort((a,b)=>{
                if(a.name > b.name) return 1
                else if(a.name < b.name) return -1
                else return 0
            })
        },
        reverseAlphabetizeParks: ( state ) =>{
            state.entity = state.entity.sort((a,b)=>{
                if(a.name < b.name) return 1
                else if(a.name > b.name) return -1
                else return 0
            })
        },
        organizeParksByDistance: ( state ) => {
            state.entity = state.entity.sort((a,b)=>{
                if(a.distance_from_user > b.distance_from_user) return 1
                else if(a.distance_from_user < b.distance_from_user) return -1
                else return 0
            })
        },
        clearError: ( state ) => {
            state.error = ''
        }
    },
    extraReducers: builder =>{
        builder
            .addCase( getParks.pending, state => {
                state.status = 'pending'
                state.error = initialState.error

            })
            .addCase( getParks.fulfilled, (state,action) => {
                state.status = 'idle'
                state.entity = action.payload
                state.error = initialState.error
            })
            .addCase( getParks.rejected, (state,action) => {
                state.status = 'idle'
                state.error = action.error
            })

            .addCase( uploadParkImages.pending, state => {
                state.status = 'pending'
                state.error = initialState.error
            })
            .addCase( uploadParkImages.fulfilled, (state,action) => {
                state.status = 'idle'
                state.entity = state.entity.map( p => {
                   if(p.id === action.payload[0].imageable.id){
                        p.images = p.images.concat(action.payload)
                    return p
                   } 
                   else return p
                })
                state.error = initialState.error
            })
            .addCase( uploadParkImages.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })

            .addCase( addCommentToPark.pending, (state) => {
                state.status = 'pending'
                state.error = initialState.error
            })
            .addCase( addCommentToPark.fulfilled, (state, action)=>{
                state.status = 'idle'            
                state.entity = state.entity.map( p =>{
                    if( p.id === action.payload.park.id){
                        return {...p, comments: [action.payload, ...p.comments]}
                    }else return p
                })
                state.error = initialState.error
            })
            .addCase( addCommentToPark.rejected, (state, action)=>{
                state.error = action
                state.status = 'idle'
            })

            .addCase( deleteComment.pending, (state)=>{
                state.status = 'pending'
                state.error = initialState.error
            })
            .addCase( deleteComment.fulfilled, (state, action)=>{
                state.entity = state.entity.map( p => {
                    if( p.id === action.payload.park_id ){
                        return {...p, comments: p.comments.filter( c => c.id !== action.payload.comment_id)}
                    }else return p
                })
                state.status = 'idle'
                state.error = initialState.error
            })
            .addCase( deleteComment.rejected, (state,action) =>{
                state.error = action
                state.status = 'idle'
            })

            .addCase( updateComment.pending, (state)=>{
                state.status = 'pending'
                state.error = initialState.error
            })
            .addCase( updateComment.fulfilled, (state, action)=>{
                state.entity = state.entity.map( p =>{
                    if( p.id === action.payload.park.id){
                        return {...p, comments: p.comments.map( c => {
                            if( c.id === action.payload.id) return action.payload
                            else return c
                        })}
                    }else return p
                })
                state.status = 'idle'
                state.error = initialState.error
            })
            .addCase( updateComment.rejected, (state,action) =>{
                state.error = action
                state.status = 'idle'
            })

        


    }
}

)

export default parkSlice.reducer

export const { setParks, updateParkDistanceFromUser, removeParkDistanceFromUser, alphabetizeParks, reverseAlphabetizeParks, organizeParksByDistance, clearError } = parkSlice.actions