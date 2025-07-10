import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// Conexion a la base de datos
async function connectToDatabase() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue("Conectado a la Base de Datos"));
    } catch (error) {
        console.error(colors.red.bold("Hubo un error al conectar a la Base de Datos"));
    }
}

// instanciamos express
const server = express();

// Leer datos de formularios o body
server.use(express.json());


// Importing the router module
server.use('/api/products', router);

// Llamar a la funcion de conexion a la base de datos
connectToDatabase();

export default server;
