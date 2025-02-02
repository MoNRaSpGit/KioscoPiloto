import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Lista de productos en el carrito
};

const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    agregarAlCarrito: (state, action) => {
      const producto = action.payload;
      const itemExistente = state.items.find((item) => item.id === producto.id);

      if (itemExistente) {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        itemExistente.cantidad += 1;
      } else {
        // Si no está, lo agregamos con cantidad = 1
        state.items.push({ ...producto, cantidad: 1 });
      }
    },
    removerDelCarrito: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    vaciarCarrito: (state) => {
      state.items = [];
    },
  },
});

export const { agregarAlCarrito, removerDelCarrito, vaciarCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;
