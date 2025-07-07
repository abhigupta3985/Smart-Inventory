// UI state management
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    colorMode: 'light',
    sidebarOpen: false,
    activeToasts: [],
    loading: {
      global: false,
      inventory: false,
      auth: false
    }
  },
  reducers: {
    toggleColorMode: (state) => {
      state.colorMode = state.colorMode === 'light' ? 'dark' : 'light';
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    addToast: (state, action) => {
      state.activeToasts.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeToast: (state, action) => {
      state.activeToasts = state.activeToasts.filter(
        toast => toast.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    }
  }
});

export const { 
  toggleColorMode, 
  setSidebarOpen, 
  addToast, 
  removeToast, 
  setLoading 
} = uiSlice.actions;
export default uiSlice.reducer;