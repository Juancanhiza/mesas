module.exports = app => {
    const cliente = require("../controllers/clientedao.controller");
    var router = require("express").Router();
    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/byCedula", cliente.byCedula);
    router.get("/:id", cliente.findOne);
    router.put("/:id", cliente.update);
    router.delete("/:id", cliente.delete);
    app.use('/api/clientes', router);
};