import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middelware";

const router = Router();

// ✅ GET / - Listar productos disponibles
router.get("/", getProducts);

// ✅ GET /:id - Obtener un producto por ID
router.get(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero mayor a 0"),
  handleInputErrors,
  getProductById
);

// ✅ POST / - Crear un producto
router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),

  handleInputErrors,
  createProduct
);

// ✅ PUT /:id - Actualizar un producto
router.put(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero mayor a 0"),

  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),

  body("availability")
    .isBoolean()
    .withMessage("La disponibilidad debe ser un valor booleano"),

  handleInputErrors,
  updateProduct
);

// ✅ PATCH /:id - Cambiar disponibilidad
router.patch(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero mayor a 0"),
  handleInputErrors,
  updateAvailability
);

// ✅ DELETE /:id - Eliminar un producto
router.delete(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero mayor a 0"),
  handleInputErrors,
  deleteProduct
);

export default router;
