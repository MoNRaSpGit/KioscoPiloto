import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removerDelCarrito, vaciarCarrito } from "../Slice/carritoSlice";
import { agregarPedido } from "../Slice/PedidosSlice";
import "../Css/Carrito.css"; // Importa el archivo CSS

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
    <div className="carrito-container">
      <h2 className="carrito-title">🛒 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((item) => (
              <li key={item.id} className="carrito-item">
                <img
                  src={item.image || "https://dummyimage.com/100/ddd/000.png&text=No+Image"}
                  alt={item.name}
                  className="carrito-imagen"
                />
                <div className="carrito-info">
                  <h4>{item.name}</h4>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  <button className="carrito-eliminar" onClick={() => dispatch(removerDelCarrito(item.id))}>
                    ❌ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="carrito-comprar" onClick={handleComprar}>
            🛍 Comprar
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
