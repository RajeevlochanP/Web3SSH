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

const bookSlice=createSlice({
    name:'books',
    initialState:{books:[]},
    reducers:{
        setBooks(state,action) {
            const {booksData}=action.payload;
            console.log(booksData);
            state.books=booksData;
        }
    }
});

const store=configureStore({
    reducer:{
        connect:connectionSlice.reducer,
        userdata:userSlice.reducer,
        booksData:bookSlice.reducer
    }
})

export const connectionActions=connectionSlice.actions;
export const userdata=userSlice.actions;
export const booksActions=bookSlice.actions;
export default store;