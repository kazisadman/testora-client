import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  image: string;
  name: string;
  id: string;
}

const initialState: AuthState = {
  email: "",
  image: "",
  name: "",
  id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      actions: PayloadAction<{
        email: string;
        image: string;
        name: string;
        id: string;
      }>
    ) => {
      state.email = actions.payload.email;
      state.image = actions.payload.image;
      state.name = actions.payload.name;
      state.id = actions.payload.id;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
