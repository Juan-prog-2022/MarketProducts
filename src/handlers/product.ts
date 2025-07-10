// Importamos las interfaces de Express para tipado
import { Request, Response } from "express";

// Importamos el modelo Product
import Product from "../models/Product.model";

// Función asincrónica para crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {

  try {
    // Creamos el producto directamente con los datos del body
    const product = await Product.create(req.body);

    // Respondemos con el producto creado
     res.status(201).json({
      data: product,
      message: "Producto creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
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