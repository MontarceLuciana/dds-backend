const express = require("express");
const cors = require("cors");

// Crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body

// Configurar CORS
app.use(
  cors({
    origin: 'https://dds-frontend.azurewebsites.net', // O cambia '*' por la URL específica de tu frontend
  })
);

// Controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// Cargar las rutas
const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);

const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter);

// Agregar ruta de seguridad
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

require("./base-orm/sqlite-init");  // crear base si no existe

// Levantar servidor
/*
const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
app.locals.fechaInicio = new Date();
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
*/

// Levantar servidor
//const port = 3000;
//app.listen(port, () => {
    //console.log(`sitio escuchando en el puerto ${port}`);
//});

// Levantar servidor para TESTING
if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app; // para testing
