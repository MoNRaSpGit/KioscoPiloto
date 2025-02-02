import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidos, cambiarEstadoPedido, agregarPedido, actualizarEstado } from "../Slice/PedidosSlice";
import "../Css/Pedidos.css";
import socket from "../Componentes/Socket";

const Pedidos = () => {
  const dispatch = useDispatch();
  const { pedidos, status, error } = useSelector((state) => state.pedidos);

  console.log("📌 [Pedidos.js] Pedidos actuales en Redux:", pedidos);

  // ✅ Cargar pedidos desde la API al entrar al componente
  useEffect(() => {
    console.log("🔄 [Pedidos.js] Llamando a fetchPedidos()");
    dispatch(fetchPedidos());
  }, [dispatch]);

  // ✅ Escuchar eventos de WebSocket en tiempo real
  useEffect(() => {
    socket.on("new_order", (nuevoPedido) => {
      console.log("🆕 [Pedidos.js] Nuevo pedido recibido via WebSocket:", nuevoPedido);
      dispatch(agregarPedido(nuevoPedido));
    });

    socket.on("order_status_updated", (updatedOrder) => {
      console.log("🔄 [Pedidos.js] Pedido actualizado via WebSocket:", updatedOrder);
      dispatch(actualizarEstado(updatedOrder));
    });

    return () => {
      socket.off("new_order");
      socket.off("order_status_updated");
    };
  }, [dispatch]);

  // ✅ Verificar si los pedidos tienen datos completos
  useEffect(() => {
    if (Array.isArray(pedidos)) {
      pedidos.forEach((pedido) => {
        if (Array.isArray(pedido.products)) {
          pedido.products.forEach((producto) => {
            if (!producto.name || !producto.image) {
              console.warn(`⚠️ [Pedidos.js] Producto con datos incompletos:`, producto);
            }
          });
        } else {
          console.warn(`⚠️ [Pedidos.js] Pedido con productos undefined:`, pedido);
        }
      });
    } else {
      console.warn(`⚠️ [Pedidos.js] Pedidos es undefined o no es un array.`);
    }
  }, [pedidos]);

  // ✅ Manejo de clases para estados
  const getEstadoClase = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "estado-pendiente";
      case "Procesando":
        return "estado-procesando";
      case "Listo":
        return "estado-listo";
      default:
        return "";
    }
  };

  if (status === "loading" && pedidos.length === 0) return <p>🔄 Cargando pedidos...</p>;
  if (status === "failed") return <p>❌ Error: {error}</p>;

  return (
    <div className="pedidos-container">
      <h2 className="pedidos-title">📦 Pedidos Realizados</h2>
      {Array.isArray(pedidos) && pedidos.length === 0 ? (
        <p className="pedidos-vacio">No hay pedidos realizados aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <h3>Pedido #{pedido.id}</h3>
            <p className="pedido-fecha">📅 Fecha: {pedido.created_at}</p>
            <p className="pedido-estado">Estado: {pedido.status}</p>
            <ul className="pedido-lista">
              {Array.isArray(pedido.products) && pedido.products.length > 0 ? (
                pedido.products.map((producto, index) => (
                  <li key={`${pedido.id}-${producto.id || index}`} className="pedido-producto">
                    <img
                      src={producto.image || "https://dummyimage.com/100/ddd/000.png&text=No+Image"}
                      alt={producto.name || "Producto sin nombre"}
                      className="pedido-imagen"
                    />
                    <span>
                      {producto.name || "Producto sin nombre"} - ${producto.price || 0} x{" "}
                      {producto.quantity || 1}
                    </span>
                  </li>
                ))
              ) : (
                <p>❌ No hay productos en este pedido.</p>
              )}
            </ul>

            <button
              className={`estado-button ${getEstadoClase(pedido.status)}`}
              onClick={() => dispatch(cambiarEstadoPedido({ id: pedido.id, status: "Procesando" }))}
            >
              Estado: {pedido.status} 🔄
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Pedidos;


// Esta es la funcional monra 