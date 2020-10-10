const db = require("../models");
const Restaurante = db.Restaurante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe enviar el nombre del restaurante."
        });
        return;
    }
    // crea un restaurante
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    };
    // Guardamos a la base de datos
    Restaurante.create(restaurante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una restaurante."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurante.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener restaurante con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Restaurante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los restaurantes."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    
    validador = validarRestaurante(req)
    if (!validador.isValid) {
        res.status(400).send({
            message: validador.message
        });
        return;
    }
    
    Restaurante.findByPk(id)
        .then(restaurante => {
            restaurante.nombre = req.body.nombre;
            restaurante.direccion = req.body.direccion;
            restaurante.save();
            res.send(restaurante);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener restaurante con id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    
    Restaurante.findByPk(id)
        .then(restaurante => {
            restaurante.destroy();
            res.send();
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener restaurante con id=" + id
            });
        });
}

function validarRestaurante(req){
    if (!req.body.nombre) {
        return {
            isValid : false,
            message : "Debe enviar el nombre del restaurante."
        };
    }
    if (!req.body.direccion) {
        return {
            isValid : false,
            message : "Debe enviar la direccion del restaurante."
        };
    }
    return {
        isValid : true,
        message : ""
    };

}