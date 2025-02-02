import React from "react";
import { useSelector } from "react-redux";
import "../Css/MisPedidos.css"; // Importa el CSS

const MisPedidos = () => {
  const { pedidos } = useSelector((state) => state.pedidos);

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

  return (
    <div className="mis-pedidos-container">
      <h2 className="mis-pedidos-title">📦 Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p className="mis-pedidos-vacio">No hay pedidos realizados aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <h3>Pedido #{pedido.id}</h3>
            <p className="pedido-fecha">📅 Fecha: {pedido.fecha}</p>
            <ul className="pedido-lista">
              {pedido.productos.map((producto) => (
                <li key={producto.id} className="pedido-producto">
                  <img
                    src={producto.image || "https://dummyimage.com/100/ddd/000.png&text=No+Image"}
                    alt={producto.name}
                    className="pedido-imagen"
                  />
                  <span>{producto.name} - ${producto.price} x {producto.cantidad}</span>
                </li>
              ))}
            </ul>
            <button className={`estado-button ${getEstadoClase(pedido.estado)}`} disabled>
              Estado: {pedido.estado}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MisPedidos;
