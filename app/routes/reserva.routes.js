module.exports = app => {
    const reserva = require("../controllers/reservadao.controller");
    var router = require("express").Router();
    router.post("/", reserva.create);
    router.get("/", reserva.findAll);
    router.post("/filter", reserva.filter);
    router.get("/:id", reserva.findOne);
    router.put("/:id", reserva.update);
    router.delete("/:id", reserva.delete);
    app.use('/api/reservas', router);
};