import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductos } from "../Slice/ProductoSlice";
import { agregarAlCarrito } from "../Slice/carritoSlice";

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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", padding: "20px" }}>
      {productos.map((producto) => (
        <div key={producto.id} style={styles.card}>
          <img src={producto.image || "https://dummyimage.com/150/ddd/000.png&text=No+Image"} alt={producto.name} style={styles.image} />
          <h3>{producto.name}</h3>
          <p>{producto.description}</p>
          <p><strong>${producto.price}</strong></p>
          <button style={styles.button} onClick={() => dispatch(agregarAlCarrito(producto))}>
            🛒 Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px"
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
  }
};

export default Productos;
