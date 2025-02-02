import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarEstadoPedido } from "../Slice/PedidosSlice";

const Pedidos = () => {
  const dispatch = useDispatch();
  const { pedidos } = useSelector((state) => state.pedidos);

  const getColorEstado = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "#8B0000"; // Rojo oscuro
      case "Procesando":
        return "#DAA520"; // Amarillo oscuro
      case "Listo":
        return "#006400"; // Verde oscuro
      default:
        return "#000"; // Negro por defecto
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Pedidos Realizados</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos realizados aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} style={styles.pedidoCard}>
            <h3>Pedido #{pedido.id}</h3>
            <p>📅 Fecha: {pedido.fecha}</p>
            <ul>
              {pedido.productos.map((producto) => (
                <li key={producto.id} style={styles.productoItem}>
                  <img src={producto.image || "https://dummyimage.com/100/ddd/000.png&text=No+Image"} alt={producto.name} style={styles.image} />
                  <span>{producto.name} - ${producto.price} x {producto.cantidad}</span>
                </li>
              ))}
            </ul>
            <button
              style={{ ...styles.estadoButton, backgroundColor: getColorEstado(pedido.estado) }}
              onClick={() => dispatch(cambiarEstadoPedido(pedido.id))}
            >
              Estado: {pedido.estado} 🔄
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  pedidoCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9"
  },
  productoItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingBottom: "5px",
  },
  image: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px"
  },
  estadoButton: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
  }
};

export default Pedidos;
