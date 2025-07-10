import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Sequelize para conectarse a la base de datos
const db = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log, // Habilitar el logging de consultas SQL
  models: [__dirname + '/../models/**/*ts'], // Ruta a los modelos
});

export default db;

