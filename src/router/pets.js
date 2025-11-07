import { Router } from "express";

const route = Router();
const bpets = [];

route.get("/", (req, res) => {
  res.json({ mensaje: "ruta GET de pets funcionando 🐶" });
});

route.put("/", (req, res) => {
  res.json({ mensaje: "ruta PUT de pets" });
});

export default route;
