import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ILookup } from "@/components/profileForm/ProfileForm";
import { IRequestUserProfileUpdate } from "@/api/types/loginUser.types";
import { DEFAULT_MAX_EXPIRY_DAYS } from "@/components/senderForm/senderForm.utils";
import { setAuthenticationInfo } from "@/auth/auth";

export type AuthSliceType = Pick<RootState, "auth">;

export interface IProfileData {
  isLoggedIn: boolean;
  email: string;
  firstName: string;
  lastName: string;
  region?: ILookup;
  jobTitle?: ILookup;
  isLoadingUserInfo: boolean;
  isMarketingOptIn?: boolean;
  plan?: object;
  payment?: object;
  hasPrivateWorkspaceAccess: boolean;
  showTrialsModal: boolean;
  isTrialsModalRequired: boolean;
}

export interface IAuthSliceState extends IProfileData {
  storageLimit: number;
  maxExpiryDays: number;
  isShowLoginModal: boolean;
  isSender: boolean;
  loading: boolean;
  isRefreshTokenLoading: boolean;
}

const initialState: IAuthSliceState = {
  isLoggedIn: true,
  email: "a.malv@gmail.com",
  firstName: "Alex",
  lastName: "Malv",
  region: undefined,
  jobTitle: undefined,
  storageLimit: 0,
  maxExpiryDays: DEFAULT_MAX_EXPIRY_DAYS,
  isLoadingUserInfo: false,
  isMarketingOptIn: false,
  isShowLoginModal: false,
  showTrialsModal: false,
  isTrialsModalRequired: false,
  plan: {},
  payment: {},
  hasPrivateWorkspaceAccess: false,
  isSender: true,
  loading: true,
  isRefreshTokenLoading: true,
};

export const requestUpdateUserProfile = createAsyncThunk(
  "requestUpdateUserProfile",
  async ({}: IRequestUserProfileUpdate) => {
    return {};
  },
);

export const requestUserInfo = createAsyncThunk("requestUserInfo", async () => {
  const data = {};

  return data;
});

export const authSlice = createSlice({
  name: "[authSlice]",
  initialState,
  reducers: {
    setUserProfileData(state, action) {
      const { firstName, lastName, region, jobTitle, isMarketingOptIn } =
        action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.region = region;
      state.jobTitle = jobTitle;
      state.isMarketingOptIn = isMarketingOptIn;
    },

    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.isShowLoginModal = false;
    },

    setLoginSuccess: (state) => {
      state.isLoggedIn = true;
      state.isShowLoginModal = false;
    },

    setRefreshTokenLoading: (state, action) => {
      state.isRefreshTokenLoading = action.payload;
    },

    setAuthToken: (state, action) => {
      setAuthenticationInfo(action.payload);
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },
    setShowLoginModal: (state, action) => {
      state.isShowLoginModal = action.payload;
    },
    setShowTrialsModal: (state, action) => {
      state.showTrialsModal = action.payload;
    },
    setIsTrialsModalRequired: (state, action) => {
      state.isTrialsModalRequired = action.payload;
    },

    setCheckoutSuccessPlanDetails: (state, action) => {
      const { plan, payment } = action.payload;
      state.plan = plan;
      state.payment = payment;
      state.storageLimit =
        plan.featureSet.find(
          (obj: { feature: string; limit: number }) =>
            obj.feature === "storage",
        )?.limit || 0;
      state.maxExpiryDays =
        plan.featureSet.find(
          (obj: { feature: string; limit: number }) =>
            obj.feature === "max_expiry_days",
        )?.limit || DEFAULT_MAX_EXPIRY_DAYS;
      state.hasPrivateWorkspaceAccess =
        action.payload.plan.featureSet.find(
          (obj: { feature: string; limit: number }) =>
            obj.feature === "private_workspace",
        )?.limit === 1;
    },
    setIsSender: (state, action) => {
      state.isSender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestUpdateUserProfile.pending, () => {
      // draftState.firstName = "";
      // draftState.lastName = "";
    });

    builder.addCase(
      requestUpdateUserProfile.fulfilled,
      (draftState, action) => {
        draftState = action.payload;
      },
    );

    builder.addCase(requestUpdateUserProfile.rejected, (draftState) => {
      draftState.firstName = "";
      draftState.lastName = "";
    });

    builder.addCase(requestUserInfo.pending, (draftState) => {
      draftState.isLoadingUserInfo = true;
      draftState.loading = true;
    });

    builder.addCase(requestUserInfo.fulfilled, (draftState, action) => {});

    builder.addCase(requestUserInfo.rejected, (draftState) => {
      draftState.isLoadingUserInfo = false;
    });
  },
});

export const selectIsLoggedIn = () => true;
export const selectUserEmail = () => "a.malv@gmail.com";
export const selectUserFirstName = () => "Alex";
export const selectUserLastName = () => "Malv";
export const selectUserAuthProfile = (s: AuthSliceType) => s.auth;
export const selectUserAuthProfileLoading = (s: AuthSliceType) =>
  s.auth.isLoadingUserInfo;
export const selectMaxStorageLimit = (s: AuthSliceType) => s.auth.storageLimit;
export const selectMaxExpiryDays = (s: AuthSliceType) => s.auth.maxExpiryDays;
export const selectIsShowLoginModal = (s: AuthSliceType) =>
  s.auth.isShowLoginModal;
export const selectShowTrialsModal = (s: AuthSliceType) =>
  s.auth.showTrialsModal;
export const selectIsTrialsModalRequired = (s: AuthSliceType) =>
  s.auth.isTrialsModalRequired;
export const selectUserPlan = (s: AuthSliceType) => s.auth.plan;
export const selectUserPayment = (s: AuthSliceType) => s.auth.payment;
export const selectHasPrivateWorkspaceAccess = (s: AuthSliceType) =>
  s.auth.hasPrivateWorkspaceAccess;
export const selectIsSender = (s: AuthSliceType) => s.auth.isSender;
export const selectIsLoading = (s: AuthSliceType) => s.auth.loading;
export const selectIsRefreshTokenLoading = (s: AuthSliceType) =>
  s.auth.isRefreshTokenLoading;

export const {
  setUserProfileData,
  loginSuccess,
  setLoginSuccess,
  logout,
  setAuthToken,
  setShowLoginModal,
  setShowTrialsModal,
  setIsTrialsModalRequired,
  setCheckoutSuccessPlanDetails,
  setIsSender,
  setRefreshTokenLoading,
} = authSlice.actions;

export default authSlice.reducer;
