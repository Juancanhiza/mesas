const db = require("../models");
const Mesa = db.Mesa;
const Restaurante = db.Restaurante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    validador = validarMesa(req)
    if (!validador.isValid) {
        res.status(400).send({
            message: validador.message
        });
        return;
    }

    // crea un Mesa
    const mesa = {
        capacidad: req.body.capacidad,
        piso: req.body.piso,
        posicion: req.body.posicion,
        restauranteId: req.body.restauranteId,
        nombre: req.body.nombre
    };
    // Guardamos a la base de datos
    Mesa.create(mesa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una mesa."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener mesa con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Mesa.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las mesas."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    validador = validarMesa(req)
    if (!validador.isValid) {
        res.status(400).send({
            message: validador.message
        });
        return;
    }
    
    Mesa.findByPk(id)
        .then(mesa => {
            mesa.capacidad = req.body.capacidad;
            mesa.piso = req.body.piso;
            mesa.posicion = req.body.posicion;
            mesa.restauranteId = req.body.restauranteId;
            mesa.nombre = req.body.nombre;
            mesa.save();
            res.send(mesa);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener mesa con id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    
    Mesa.findByPk(id)
        .then(mesa => {
            mesa.destroy();
            res.send();
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener mesa con id=" + id
            });
        });
}

function validarMesa(req){
    if (!req.body.capacidad) {
        return {
            isValid : false,
            message : "Debe enviar el capacidad de la mesa."
        };
    }
    if (!req.body.piso) {
        return {
            isValid : false,
            message : "Debe enviar el piso de la mesa."
        };
    }
    if (!req.body.restauranteId) {
        return {
            isValid : false,
            message : "Debe enviar el id del restaurante de la mesa."
        };
    }
    if (!req.body.nombre) {
        return {
            isValid : false,
            message : "Debe enviar el nombre de la mesa."
        };
    }

    return {
        isValid : true,
        message : ""
    };

}