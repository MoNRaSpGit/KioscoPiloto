import { io } from "socket.io-client";

// ✅ Detectar si estamos en local o producción
const isLocal = window.location.hostname === "localhost";

const SOCKET_URL = isLocal
  ? "http://localhost:3001" // 🔴 WebSocket en local
  : "https://kioscopiloto-back.onrender.com"; // 🔴 WebSocket en producción

// ✅ Conectar con WebSocket
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
