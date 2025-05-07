import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    modal: null,
    
    
    // at the time not logged in
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    // user:null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
            console.log('printing user in profile', localStorage.getItem('user'));
        },

       
        
        
        setModal(state, value) { 
            state.modal = value.payload
        }
    }
})



export const { setUser,setModal } = profileSlice.actions;
export default profileSlice.reducer;