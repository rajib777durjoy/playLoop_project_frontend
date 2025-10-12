import { createSlice } from "@reduxjs/toolkit";


 const userSlice = createSlice({
    name:"user",
    initialState:{
     userData:null,
     channelData:null
    },
     reducers: {
        setuserData:(state,action)=>{
            state.userData= action.payload
        },
        setChannelData:(state,action)=>{
            state.channelData= action.payload
        }
      }
})

export const {setuserData}= userSlice.actions
export const {setChannelData}= userSlice.actions
export default userSlice.reducer;