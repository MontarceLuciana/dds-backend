const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Método GET para obtener todos los artículosfamilias
router.get("/api/articulosfamilias", async function (req, res, next) {
  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
  });
  res.json(data);
});

// Método GET para obtener un artículo por su ID
router.get('/api/articulosfamilias/:id', async function (req, res) {
    try {
        let articuloFamilia = await db.articulosfamilias.findOne({
            where: { IdArticuloFamilia: req.params.id },
            attributes: ["IdArticuloFamilia", "Nombre"]
        });
        if (articuloFamilia) {
            res.json(articuloFamilia);
        } else {
            res.status(404).json({ message: 'articulofamilia no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
