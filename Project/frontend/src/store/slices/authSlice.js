import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  const { data } = await api.post("/login", { username, password });
  return data.token || data?.data?.token;
});
export const register = createAsyncThunk("auth/register", async ({ username, password }) => {
  const { data } = await api.post("/register", { username, password });
  return data.token || data?.data?.token;
});

const initialToken = localStorage.getItem("token") || "";

const slice = createSlice({
  name: "auth",
  initialState: { token: initialToken, status: "idle", error: "" },
  reducers: {
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s)=>{ s.status="loading"; s.error=""; })
     .addCase(login.fulfilled, (s,a)=>{ s.status="idle"; s.token=a.payload; localStorage.setItem("token", a.payload); })
     .addCase(login.rejected, (s,a)=>{ s.status="idle"; s.error=a.error.message || "Login failed"; })
     .addCase(register.pending, (s)=>{ s.status="loading"; s.error=""; })
     .addCase(register.fulfilled, (s,a)=>{ s.status="idle"; s.token=a.payload; localStorage.setItem("token", a.payload); })
     .addCase(register.rejected, (s,a)=>{ s.status="idle"; s.error=a.error.message || "Register failed"; });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
