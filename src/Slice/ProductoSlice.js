import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const API_URL = "http://localhost:3001/api/products"; // 🔴 URL correcta
const API_URL = "https://kioscopiloto-back.onrender.com/api/products"; // 🔴 URL correcta

// ✅ Obtener productos desde la BDD
export const fetchProductos = createAsyncThunk("productos/fetchProductos", async () => {
  const response = await axios.get(API_URL);
  console.log("📦 Productos obtenidos:", response.data); // 👀 Verifica los datos aquí
  return response.data;
});

const productoSlice = createSlice({
  name: "productos",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => { state.status = "loading"; })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Guarda los productos correctamente
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productoSlice.reducer;
