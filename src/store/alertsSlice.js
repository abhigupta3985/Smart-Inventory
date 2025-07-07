// Alerts state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';

export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAlerts',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'alerts'), where('active', '==', true));
      const querySnapshot = await getDocs(q);
      const alerts = [];
      
      querySnapshot.forEach((doc) => {
        alerts.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return alerts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAlert = createAsyncThunk(
  'alerts/createAlert',
  async (alertData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'alerts'), {
        ...alertData,
        active: true,
        createdAt: new Date().toISOString()
      });
      
      return {
        id: docRef.id,
        ...alertData,
        active: true,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dismissAlert = createAsyncThunk(
  'alerts/dismissAlert',
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'alerts', id);
      await updateDoc(docRef, {
        active: false,
        dismissedAt: new Date().toISOString()
      });
      
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
    loading: false,
    error: null
  },
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        state.alerts.push(action.payload);
      })
      .addCase(dismissAlert.fulfilled, (state, action) => {
        state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      });
  }
});

export const { addAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;