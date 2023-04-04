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

const initialState = {
    entity: {
        username: '',
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
    }

}

)


export default userSlice.reducer

export const { setUser, removeUser } = userSlice.actions