import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/user/userSlice"
import sessionReducer from "./features/sessionSlice"
import parkReducer from "./features/park/parkSlice"
import visitReducer from "./features/visits/visitSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        session: sessionReducer,
        park: parkReducer,
        visit: visitReducer
    }
})

export default store