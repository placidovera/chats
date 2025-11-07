import express from "express";
import { engine } from "express-handlebars";
import path from "node:path";
import userRoute from "./router/userRouter.js";
import petsRoute from "./router/pets.js";
import viewRoutes from "./router/view.js";
import { Server } from "socket.io";

const app = express();

app.use(express.static(path.join(process.cwd(), "src", "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/api/user", userRoute);
app.use("/api/pets", petsRoute);
app.use("/", viewRoutes);

const serverHttp = app.listen(8080, () => {
  console.log("App corriendo en el puerto 8080");
});

const serverSocket = new Server(serverHttp);

const BBDD = [];

let usuariosConectados = 0;

serverSocket.on("connection", (socket) => {
  usuariosConectados++;
  console.log("Nuevo cliente conectado con id ->", socket.id);
  console.log("Usuarios conectados:", usuariosConectados);

  socket.emit("usuarios_conectados", usuariosConectados);
  socket.emit("Lista de mensajes", BBDD);

  serverSocket.emit("usuarios_conectados", usuariosConectados);

  socket.on("disconnect", () => {
    usuariosConectados--;
    console.log("Usuario desconectado. Total:", usuariosConectados);

    serverSocket.emit("usuarios_conectados", usuariosConectados);
  });

  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    BBDD.push(data);
    
    serverSocket.emit("Lista de mensajes", BBDD);
  });
});
