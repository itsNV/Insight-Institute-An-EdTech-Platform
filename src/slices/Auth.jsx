import { createSlice } from "@reduxjs/toolkit";



const initialState = {

    loading: false,
    SignUpData: null,
    token: localStorage.getItem('token') || null,
       
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:
    {
        // if user logged in then must have token 
        // if not logged then token is empty
        // used to check authorization of user
        setToken(state, actions) {
        
            state.token = actions.payload;
            

        },

        setSignUpData(state, value) { 
            state.SignUpData = value.payload;
        },
        setLoading(state, value) { 
            state.loading = value.payload
        }
    }
        
});

export const { setToken,setSignUpData,setLoading } = authSlice.actions;
export default authSlice.reducer;