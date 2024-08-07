import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/index";

const initialState = {
  authData: null,
};

export const signIn = createAsyncThunk("auth/signIn", async (formData) => {
  try {
    const { data } = await API.post(`/user/signin`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (formData) => {
  try {
    const { data } = await API.post(`/user/signup`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        const { token, result } = action.payload;
        localStorage.setItem("profile", JSON.stringify({ ...result, token }));
        state.authData = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        console.error("Sign In failed:", action.error.message);
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { token, result } = action.payload;
        localStorage.setItem("profile", JSON.stringify({ ...result, token }));
        state.authData = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.error("Sign Up failed:", action.error.message);
      });
  },
});
export default authSlice.reducer;
