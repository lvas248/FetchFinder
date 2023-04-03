import { createSlice } from "@reduxjs/toolkit";

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
    }

}

)


export default userSlice.reducer

export const { setUser } = userSlice.actions