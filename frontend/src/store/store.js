import { configureStore,createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";


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
    name:'usedata',
    initialState:{data:{item1:'',item2:'',item3:''}},
    reducers:{
        setData(state,action) {
            const {item1,item2,item3}=action.payload
            state.data.item1=item1
            state.data.item2=item2
            state.data.item3=item3
        }
    }
});

const store=configureStore({
    reducer:{connect:connectionSlice.reducer}
})

export const connectionActions=connectionSlice.actions;
export default store;