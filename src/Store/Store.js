import { configureStore } from "@reduxjs/toolkit";
import productoReducer from "../Slice/ProductoSlice";
import carritoReducer from "../Slice/carritoSlice";
import pedidosReducer from "../Slice/PedidosSlice"; // Importar pedidos

export const store = configureStore({
  reducer: {
    productos: productoReducer,
    carrito: carritoReducer,
    pedidos: pedidosReducer, // Agregar pedidos al store
  },
});

export default store;

