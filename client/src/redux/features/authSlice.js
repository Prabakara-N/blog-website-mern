import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUserInfo(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addUserInfo = createAsyncThunk(
  "auth/addUserInfo",
  async ({ id, updatedData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.addUserInfo(updatedData, id);
      navigate(`/userinfo/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userInfo: {},
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    // login
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // register
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // userinfo
    [getUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // add edit
    [addUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [addUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.meta.arg;
      if (id) {
        state.userInfo =
          state.userInfo.result._id === id ? action.payload : state.userInfo;
      }
    },
    [addUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
