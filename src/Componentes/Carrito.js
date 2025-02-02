import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vaciarCarrito,removerDelCarrito } from "../Slice/carritoSlice";
import { realizarPedido, agregarPedido } from "../Slice/PedidosSlice";
import socket from "../Componentes/Socket";
import "../Css/Carrito.css";

const Carrito = () => {
  const dispatch = useDispatch();
  const { items: carrito } = useSelector((state) => state.carrito);

  const handleComprar = async () => {
    if (carrito.length > 0) {
      const nuevoPedido = {
        userId: 1, // ⚠️ Simulación de usuario
        products: carrito.map((producto) => ({
          id: producto.id,
          quantity: producto.cantidad || 1,
          price: producto.price,
        })),
      };

      console.log("📤 [handleComprar] Enviando pedido:", nuevoPedido);

      dispatch(realizarPedido(nuevoPedido))
        .unwrap()
        .then((savedOrder) => {
          console.log("✅ [handleComprar] Pedido guardado en BDD, actualizando store global...");
          
          dispatch(agregarPedido(savedOrder));
          socket.emit("new_order", savedOrder);
          
          dispatch(vaciarCarrito());
          alert("✅ Pedido realizado con éxito!");
        })
        .catch((error) => {
          console.error("❌ [handleComprar] Error al realizar el pedido:", error);
          alert("❌ Hubo un problema al procesar el pedido.");
        });
    } else {
      alert("⚠️ El carrito está vacío.");
    }
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito</h2>
      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((item) => (
              <li key={item.id} className="carrito-item">
                <img src={item.image || "https://dummyimage.com/100/ddd/000.png&text=No+Image"} alt={item.name} className="carrito-imagen" />
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
