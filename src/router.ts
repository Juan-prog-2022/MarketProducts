import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middelware"; // Asegurate de importar bien

const router = Router();

// Ruta de prueba GET
router.get("/", (req, res) => {
  res.json("Desde GET");
});

// POST / - Crear un producto con validaciones
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("price").isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0"),
    handleInputErrors, // ✅ Se ejecuta solo si las validaciones pasan
  ],
  createProduct
);


// PUT, PATCH, DELETE de ejemplo
router.put("/", (req, res) => {
  res.json("Desde PUT");
});

router.patch("/", (req, res) => {
  res.json("Desde PATCH");
});

router.delete("/", (req, res) => {
  res.json("Desde DELETE");
});

export default router;
