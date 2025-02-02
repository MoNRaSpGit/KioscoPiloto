import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pedidos: [], // Lista de pedidos realizados
};

const pedidosSlice = createSlice({
  name: "pedidos",
  initialState,
  reducers: {
    agregarPedido: (state, action) => {
      state.pedidos.push({
        id: Date.now(), // ID único para cada pedido
        productos: action.payload,
        estado: "Pendiente", // Estado inicial del pedido
        fecha: new Date().toLocaleString(),
      });
    },
    cambiarEstadoPedido: (state, action) => {
      const pedido = state.pedidos.find((p) => p.id === action.payload);
      if (pedido) {
        if (pedido.estado === "Pendiente") {
          pedido.estado = "Procesando";
        } else if (pedido.estado === "Procesando") {
          pedido.estado = "Listo";
        } else {
          pedido.estado = "Pendiente"; // Vuelve a reiniciar si se necesita
        }
      }
    },
  },
});

export const { agregarPedido, cambiarEstadoPedido } = pedidosSlice.actions;
export default pedidosSlice.reducer;
