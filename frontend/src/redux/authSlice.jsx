import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState={
    msg:"",
    user:"",
    token:"",
    loading:"",
    error:""
}



export const authSlice=createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers:{

    }
})






