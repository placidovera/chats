import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.json({ mensaje: "ruta GET de user funcionando 🐶" });
});

route.put("/", (req, res) => {
  res.json({ mensaje: "ruta PUT de user" });
});

export default route;
