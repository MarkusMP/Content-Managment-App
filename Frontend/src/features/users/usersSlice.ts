import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginState {
  error: string;
  status: string;
  accessToken: string;
  refreshToken: string;
  user: UserObject;
}

interface UserObject {
  _id: string;
  email: string;
  name: string;
}

const initialState: LoginState = {
  error: "",
  status: "",
  accessToken: "",
  refreshToken: "",
  user: {
    _id: "",
    email: "",
    name: "",
  },
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await axios.post(
        "/api/sessions",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(
        "/api/user",
        { email, name, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(res);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signout: (state, action) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.status = "";
      state.user._id = "";
      state.user.email = "";
      state.user.name = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "Success";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user._id = action.payload.user._id;
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.status = "Success";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user._id = action.payload.user._id;
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.status = "Success";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { signout } = loginSlice.actions;

export default loginSlice.reducer;
