import { Request, Response } from "express";
import Product from "../models/Product.model";

// Obtener todos los productos disponibles
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll({
      order: [["name", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
    });

    res.status(200).json({
      data: products,
      message: "Lista de productos obtenida correctamente",
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    res.status(200).json({
      data: product,
      message: "Producto obtenido correctamente",
    });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Crear nuevo producto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      data: product,
      message: "Producto creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });

    if (!updated) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    const updatedProduct = await Product.findByPk(id);
    res.status(200).json({
      data: updatedProduct,
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Cambiar disponibilidad de producto (PATCH)
export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    product.availability = !product.availability;
    await product.save();

    res.status(200).json({
      data: product,
      message: "Disponibilidad actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar disponibilidad:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    await product.destroy();
    res.status(204).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// Comentarios sobre las formas de crear un producto
// Aquí se muestran dos formas de crear un producto en la base de datos usando Sequelize

// Forma 1
// obtenemos los datos del body de la peticion
//const product = new Product(req.body);
// validamos los datos del producto
//const saveProduct = await product.save();
// guardamos el producto en la base de datos
//product.save();

// Forma 2
// creamos el producto directamente con el metodo create de sequelize
// y le pasamos los datos del body de la peticion
//const product = await Product.create(req.body);
