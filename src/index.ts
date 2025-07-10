import colors from "colors";
import server from "./server";

// Importamos las variables de entorno
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(colors.cyan.bold(`🚀 REST API corriendo en el puerto ${port}`));
});