import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Productos from "./Componentes/Productos";
import Carrito from "./Componentes/Carrito";
import Pedidos from "./Componentes/Pedidos";
import MisPedidos from "./Componentes/MisPedidos";

function App() {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>🛍 Tienda</Link>
        <Link to="/carrito" style={styles.link}>🛒 Carrito</Link>
        <Link to="/pedidos" style={styles.link}>📦 Pedidos</Link>
        <Link to="/mis-pedidos" style={styles.link}>👤 Mis Pedidos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
      </Routes>
    </Router>
  );
}


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    padding: "15px",
    backgroundColor: "#007bff",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  }
};

export default App;
