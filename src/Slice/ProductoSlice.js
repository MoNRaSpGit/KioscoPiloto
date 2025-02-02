import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://kioscopiloto-back.onrender.com";
//const API_URL = "https://kioscopiloto-back.onrender.com"; 

// Acción asíncrona para obtener productos solo si no están en el storeeeeeeee
export const fetchProductos = createAsyncThunk(
  "productos/fetchProductos",
  async (_, { getState, rejectWithValue }) => {
    const { productos } = getState(); // Obtener el estado global
    if (productos.items.length > 0) {
      console.log("🔵 Productos ya están en el store, no se hace la llamada.");
      return productos.items; // Si ya hay productos, retornamos los almacenados
    }
    
    try {
      console.log("🔵 Fetching products from:", API_URL);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();
      console.log("✅ Productos recibidos:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productoSlice = createSlice({
  name: "productos",
  initialState: {
    items: [], // Productos almacenados
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Guardamos los productos en el store
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productoSlice.reducer;
