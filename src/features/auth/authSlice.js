import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/apiService';
import { mockUsers } from '../../services/mockData';
import { data } from 'autoprefixer';

const AUTH_STORAGE_KEY = 'shophub_auth';
// const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true;
const USE_MOCK_DATA = false; // Disable mock data for auth

// // Load auth from localStorage
// const loadAuthFromStorage = () => {
//   try {
//     const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
//     return savedAuth ? JSON.parse(savedAuth) : null;
//   } catch (error) {
//     console.error('Error loading auth from storage:', error);
//     return null;
//   }
// };

// // Save auth to localStorage
// const saveAuthToStorage = (auth) => {
//   try {
//     localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
//   } catch (error) {
//     console.error('Error saving auth to storage:', error);
//   }
// };

// // Clear auth from localStorage
// const clearAuthFromStorage = () => {
//   try {
//     localStorage.removeItem(AUTH_STORAGE_KEY);
//   } catch (error) {
//     console.error('Error clearing auth from storage:', error);
//   }
// };

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, method, phone, step, otp }, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const { password: _, ...userWithoutPassword } = user;
        const token = `mock_jwt_token_${user.id}_${Date.now()}`;

        return {
          user: userWithoutPassword,
          token,
        };
      } else {
        // Use real API
        if(method === 'passwordless') {
          if(step==='send_code'){
            const data = await authAPI.loginPasswordlessSendCode(phone?{ phone }:{email});
            // return data;
          }
          else if(step==='verify_code'){
            const data = await authAPI.loginPasswordlessVerifyCode(phone?{ phone, otp }:{email, otp});
            return data;
          }
          else{
            throw new Error('Invalid passwordless login step');
          }
        }
        else if(method==='local'){
          const data = await authAPI.loginLocal({ email, password });
          return data;
        }
        else if(method==='google'){
          const data = await authAPI.loginGoogle();
          return data;
        }
        else{
          throw new Error('Unsupported login method');
        }
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
        // Use real API
        const data = await authAPI.me();
        return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const exists = mockUsers.find((u) => u.email === userData.email);
        if (exists) {
          throw new Error('Email already registered');
        }

        const newUser = {
          id: mockUsers.length + 1,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || '',
          avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=0ea5e9&color=fff`,
          addresses: [],
          createdAt: new Date().toISOString(),
        };

        const token = `mock_jwt_token_${newUser.id}_${Date.now()}`;

        return {
          user: newUser,
          token,
        };
      } else {
        // Use real API
        const data = await authAPI.register(userData);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 800));
        return userData;
      } else {
        // Use real API
        const data = await authAPI.updateProfile(userData);
        return data.user || data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      if (!USE_MOCK_DATA) {
        await authAPI.logout();
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 800));
        return true;
      } else {
        // Use real API
        const data = await authAPI.changePassword(passwordData);
        return data.success || true;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    //   state.isAuthenticated = false;
    //   state.error = null;
    //   clearAuthFromStorage();
    // },
    // clearError: (state) => {
    //   state.error = null;
    // },
    // checkAuthStatus: (state) => {
    //   const savedAuth = loadAuthFromStorage();
    //   if (savedAuth && savedAuth.token) {
    //     state.user = savedAuth.user;
    //     state.token = savedAuth.token;
    //     state.isAuthenticated = true;
    //   }
    // },
    // updateUserData: (state, action) => {
    //   if (state.user) {
    //     state.user = { ...state.user, ...action.payload };
    //     saveAuthToStorage({ user: state.user, token: state.token });
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // Current Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if(!action.payload) {
          state.loading = false;
          return;
        }
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // saveAuthToStorage(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // saveAuthToStorage(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        // saveAuthToStorage({ user: state.user, token: state.token });
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        // clearAuthFromStorage();
      });
  },
});

export const { clearError, updateUserData } =
  authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserAddresses = (state) => state.auth.user?.addresses || [];
export const selectDefaultAddress = (state) =>
  state.auth.user?.addresses?.find((addr) => addr.isDefault) || null;

export default authSlice.reducer;