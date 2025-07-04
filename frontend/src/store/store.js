import { configureStore,createSlice } from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:'connectionSlice',
    initialState:{isConnected:false},
    reducers:{
        connect(state) {
            state.isConnected=true;
        },
        disconnect(state) {
            state.isConnected=false;
        }
    }
});

const store=configureStore({
    reducer:{connect:connectionSlice.reducer}
})

export const connectionActions=connectionSlice.actions;
export default store;