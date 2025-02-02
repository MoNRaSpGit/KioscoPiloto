import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidos } from "../Slice/PedidosSlice";
import socket from "../Componentes/Socket";

const MisPedidos = () => {
  const dispatch = useDispatch();
  const { pedidos } = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(fetchPedidos());

    socket.on("new_order", (newOrder) => {
      console.log("🆕 Nuevo pedido recibido:", newOrder);
      dispatch({ type: "pedidos/agregarPedido", payload: newOrder });
    });

    return () => {
      socket.off("new_order");
    };
  }, [dispatch]);

  return (
    <div className="mis-pedidos-container">
      <h2>📦 Mis Pedidos</h2>
      {pedidos.length === 0 ? <p>No hay pedidos aún.</p> : pedidos.map((pedido) => (
        <div key={pedido.id} className="pedido-card">
          <h3>Pedido #{pedido.id}</h3>
          <p>📅 Fecha: {pedido.created_at}</p>
          <p>Estado: {pedido.status}</p>
          <ul>{pedido.products.map((producto) => (
            <li key={producto.id}>{producto.name} - ${producto.price} x {producto.quantity}</li>
          ))}</ul>
        </div>
      ))}
    </div>
  );
};

export default MisPedidos;
