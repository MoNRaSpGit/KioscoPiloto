import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductos } from "../Slice/ProductoSlice";
import { agregarAlCarrito } from "../Slice/carritoSlice";
import "../Css/Productos.css";

const Productos = () => {
  const dispatch = useDispatch();
  const { items: productos, status, error } = useSelector((state) => state.productos);

  useEffect(() => {
    if (productos.length === 0) {
      dispatch(fetchProductos());
    }
  }, [dispatch, productos.length]); // Solo se ejecuta si `productos.length === 0`

  console.log("📦 Productos en Redux:", productos); // 👀 Verifica los datos en la consola

  if (status === "loading" && productos.length === 0) return <p>🔄 Cargando productos...</p>;
  if (status === "failed") return <p>❌ Error: {error}</p>;

  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id || Math.random()} className="producto-card">
          <img
            src={producto.image || "https://dummyimage.com/150/ddd/000.png&text=No+Image"}
            alt={producto.name || "Producto sin nombre"}
            className="producto-imagen"
          />
          <h3>{producto.name || "Producto sin nombre"}</h3>
          <p className="producto-precio">${producto.price || 0}</p>
          <button className="producto-boton" onClick={() => dispatch(agregarAlCarrito(producto))}>
            🛒 Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Productos;
