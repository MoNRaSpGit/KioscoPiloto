import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductos } from "../Slice/ProductoSlice";
import { agregarAlCarrito } from "../Slice/carritoSlice";
import "../Css/Productos.css"; // Importa el CSSsss

const Productos = () => {
  const dispatch = useDispatch();
  const { items: productos, status, error } = useSelector((state) => state.productos);

  useEffect(() => {
    if (productos.length === 0) {
      dispatch(fetchProductos()); // Solo hace la llamada si no hay productos en el store
    }
  }, [productos.length, dispatch]);

  if (status === "loading") return <p>🔄 Cargando productos...</p>;
  if (status === "failed") return <p>❌ Error: {error}</p>;

  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <img
            src={producto.image || "https://dummyimage.com/150/ddd/000.png&text=No+Image"}
            alt={producto.name}
            className="producto-imagen"
          />
          <h3>{producto.name}</h3>
          <p className="producto-descripcion">{producto.description}</p>
          <p className="producto-precio">${producto.price}</p>
          <button className="producto-boton" onClick={() => dispatch(agregarAlCarrito(producto))}>
            🛒 Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Productos;
