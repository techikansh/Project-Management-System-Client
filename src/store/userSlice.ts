import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});


export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;