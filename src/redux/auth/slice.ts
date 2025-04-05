import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AutharizationInfo, ProfileData, UserInfo } from "../types";

interface AuthState {
  isAuth: boolean;
  user: UserInfo | null;
  profile: ProfileData | null;
  autharizationData: AutharizationInfo | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  profile: null,
  autharizationData: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.autharizationData = null;
      state.isAuth = false;
      localStorage.removeItem("SKUToken");
    },
    setAutharizationData(
      state,
      action: PayloadAction<{ data: AutharizationInfo }>
    ) {
      state.autharizationData = action.payload.data;
      state.isAuth = true;
    },

    setUserData(state, action: PayloadAction<{ data: UserInfo }>) {
      state.user = action.payload.data;
    },

    setProfileData(state, action: PayloadAction<{ data: ProfileData }>) {
      state.profile = action.payload.data;
    },
  },
});

export const { logout, setAutharizationData, setUserData, setProfileData } = authSlice.actions;
export default authSlice.reducer;
