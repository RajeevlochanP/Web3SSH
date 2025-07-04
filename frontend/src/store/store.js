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

const userSlice=createSlice({
    name:'userdata',
    initialState:{address:''},
    reducers:{
        setData(state,action) {
            const {address}=action.payload
            state.address=address
        }
    }
})

const store=configureStore({
    reducer:{connect:connectionSlice.reducer,userdata:userSlice.reducer}
})

export const connectionActions=connectionSlice.actions;
export const userdata=userSlice.actions;
export default store;