// Inventory state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../services/firebase';

// Async thunks for inventory operations
export const fetchInventoryItems = createAsyncThunk(
  'inventory/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'inventory'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addInventoryItem = createAsyncThunk(
  'inventory/addItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'inventory'), {
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      return {
        id: docRef.id,
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInventoryItem = createAsyncThunk(
  'inventory/updateItem',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'inventory', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      return { id, ...updates, updatedAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInventoryItem = createAsyncThunk(
  'inventory/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'inventory', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    searchTerm: '',
    selectedCategory: '',
    sortBy: 'name',
    sortOrder: 'asc'
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter(item =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        item.category.toLowerCase().includes(action.payload.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = action.payload 
        ? state.items.filter(item => item.category === action.payload)
        : state.items;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      // Apply sorting logic here
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchInventoryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add item
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems = state.items;
      })
      // Update item
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
          state.filteredItems = state.items;
        }
      })
      // Delete item
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.filteredItems = state.items;
      });
  }
});

export const { 
  setSearchTerm, 
  setSelectedCategory, 
  setSortBy, 
  setSortOrder, 
  clearFilters 
} = inventorySlice.actions;
export default inventorySlice.reducer;