import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
        const response = await fetch('upload_user_image',{
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

const initialState = {
    entity: {
        username: '',
        user_image: {}
    },
    status: '',
    error: ''
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        setUser: ( state, action) => {
            state.entity = action.payload}
            ,

        removeUser: ( state ) => {
            state.entity = initialState
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( editUser.pending, state => {
                state.status = 'pending'
            })
            .addCase( editUser.rejected, state => {
                state.status = 'error'
            })
            .addCase( editUser.fulfilled, (state,action)=>{
                state.status = 'idle'
                state.entity = action.payload
            })
            .addCase( uploadUserImage.pending, state => {
                state.status = 'pending'
            })
            .addCase( uploadUserImage.fulfilled, (state, action)=>{
                state.state = 'idle'
                state.entity = {...state.entity, user_image: action.payload}
            })
            .addCase( uploadUserImage.rejected, state => {
                state.status = 'error'
            })
            
    }

}

)


export default userSlice.reducer

export const { setUser, removeUser } = userSlice.actions