import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "../Componentes/Socket"; 

const API_URL = "http://localhost:3001/api/orders"; 

// ✅ Obtener pedidos desde la BDD
export const fetchPedidos = createAsyncThunk("pedidos/fetchPedidos", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    console.log("📦 Pedidos obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener pedidos:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Error desconocido");
  }
});

// ✅ Guardar un nuevo pedido en la BDD y actualizar Store + WebSocket
export const realizarPedido = createAsyncThunk("pedidos/realizarPedido", async (nuevoPedido, { rejectWithValue }) => {
  try {
    const formattedPedido = {
      userId: nuevoPedido.userId,
      products: nuevoPedido.products.map((producto) => ({
        id: producto.id,
        quantity: producto.quantity || 1,
        price: producto.price || 0,
      })),
    };

    console.log("📦 Enviando pedido:", formattedPedido);

    const response = await axios.post(API_URL, formattedPedido, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Pedido guardado en la BDD:", response.data);
    
    socket.emit("new_order", response.data); // 🔴 Emitir evento WebSocket

    return response.data; // Se añade al Store automáticamente
  } catch (error) {
    console.error("❌ Error al realizar pedido:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Error desconocido");
  }
});

// ✅ Cambiar el estado de un pedido en la BDD y WebSocket
export const cambiarEstadoPedido = createAsyncThunk("pedidos/cambiarEstado", async ({ id, status }, { rejectWithValue }) => {
  try {
    console.log(`🔄 Actualizando estado del pedido ${id} a ${status}`);

    const response = await axios.put(`${API_URL}/${id}/status`, { status });

    if (response.status === 200) {
      socket.emit("order_status_updated", { id, status });
      return { id, status };
    }
  } catch (error) {
    console.error("❌ Error al actualizar estado del pedido:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Error desconocido");
  }
});

const pedidosSlice = createSlice({
  name: "pedidos",
  initialState: { pedidos: [], status: "idle", error: null },
  reducers: {
    agregarPedido: (state, action) => {
      const pedidoExistente = state.pedidos.find((p) => p.id === action.payload.id);
      if (!pedidoExistente) {
        state.pedidos.push(action.payload); // ✅ Evita duplicados en Redux
      }
    },
    actualizarEstado: (state, action) => {
      const pedido = state.pedidos.find((p) => p.id === action.payload.id);
      if (pedido) pedido.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidos.pending, (state) => { state.status = "loading"; })
      .addCase(fetchPedidos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pedidos = action.payload;
      })
      .addCase(fetchPedidos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(realizarPedido.fulfilled, (state, action) => {
        state.pedidos.push(action.payload); // ✅ Se actualiza el store sin recargar
      })
      .addCase(realizarPedido.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(cambiarEstadoPedido.fulfilled, (state, action) => {
        const pedido = state.pedidos.find((p) => p.id === action.payload.id);
        if (pedido) pedido.status = action.payload.status;
      });
  },
});

export const { agregarPedido, actualizarEstado } = pedidosSlice.actions;
export default pedidosSlice.reducer;


//Funciono perfecto 
