import { Router } from "express";
import { upLoad } from "../Utis.js";

const route = Router();
const buser = [];

route.post("/", upLoad.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se subió ninguna imagen" });
  }

  res.json({
    mensaje: "Imagen subida correctamente",
    archivo: req.file.filename,
  });
});

export default route;
