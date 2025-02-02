import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removerDelCarrito, vaciarCarrito } from "../Slice/carritoSlice";
import { agregarPedido } from "../Slice/PedidosSlice";

const Carrito = () => {
  const dispatch = useDispatch();
  const { items: carrito } = useSelector((state) => state.carrito);

  const handleComprar = () => {
    if (carrito.length > 0) {
      dispatch(agregarPedido(carrito)); // Agrega los productos con estado "Pendiente"
      dispatch(vaciarCarrito()); // Vacía el carrito después de la compra
      alert("✅ Pedido realizado con éxito!");
    } else {
      alert("⚠️ El carrito está vacío.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} style={styles.item}>
                <img src={item.image || "https://dummyimage.com/100/ddd/000.png&text=No+Image"} alt={item.name} style={styles.image} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  <button style={styles.removeButton} onClick={() => dispatch(removerDelCarrito(item.id))}>
                    ❌ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button style={styles.buyButton} onClick={handleComprar}>
            🛍 Comprar
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "10px"
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "5px"
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "5px"
  },
  buyButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
    marginLeft: "10px"
  }
};

export default Carrito;
