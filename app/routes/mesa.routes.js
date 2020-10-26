module.exports = app => {
    const mesa = require("../controllers/mesadao.controller");
    var router = require("express").Router();
    router.post("/", mesa.create);
    router.post("/disponibles/", mesa.findAvailable);
    router.get("/", mesa.findAll);
    router.get("/porRestaurante/:restauranteId", mesa.findAllByRestaurante);
    router.get("/:id", mesa.findOne);
    router.put("/:id", mesa.update);
    router.delete("/:id", mesa.delete);
    app.use('/api/mesas', router);
};