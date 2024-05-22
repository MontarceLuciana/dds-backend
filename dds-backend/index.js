const express = require("express");

// Crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body

// Controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// Cargar las rutas
const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);

const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter);

require("./base-orm/sqlite-init");  // crear base si no existe

// Levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
