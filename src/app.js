import express from "express";
import { engine } from "express-handlebars";
import path from "node:path";
import userRoute from "./router/userRouter.js";
import loginRoute from "./router/userRoute.js";
import viewRoutes from "./router/view.js";
import { Server } from "socket.io";

const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(process.cwd(), "src/public")));

// Configuración Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src/views"));

// Rutas
app.use("/api/user", userRoute);
app.use("/api/login", loginRoute);
app.use("/", viewRoutes);

// Puerto dinámico para Render
const PORT = process.env.PORT || 8080;
const serverHttp = app.listen(PORT, () => {
  console.log(`App corriendo en el puerto ${PORT}`);
});

// Socket.io
const serverSocket = new Server(serverHttp);
const BBDD = [];
let usuariosConectados = 0;

serverSocket.on("connection", (socket) => {
  usuariosConectados++;
  console.log("Nuevo cliente conectado con id ->", socket.id);
  console.log("Usuarios conectados:", usuariosConectados);

  socket.emit("Lista de mensajes", BBDD);
  serverSocket.emit("usuarios_conectados", usuariosConectados);

  socket.on("disconnect", () => {
    usuariosConectados--;
    serverSocket.emit("usuarios_conectados", usuariosConectados);
  });

  socket.on("mensaje", (data) => {
    BBDD.push(data);
    serverSocket.emit("Lista de mensajes", BBDD);
  });
});
