const db = require("../models");
const Reserva = db.Reserva;
const Restaurante = db.Restaurante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    validador = validarReserva(req)
    if (!validador.isValid) {
        res.status(400).send({
            message: validador.message
        });
        return;
    }

    // crea un Reserva
    const reserva = {
        cantidad: req.body.cantidad,
        horario: req.body.horario,
        fecha: req.body.fecha,
        restauranteId: req.body.restauranteId,
        mesaId: req.body.mesaId,
        clienteId: req.body.clienteId,
    };
    // Guardamos a la base de datos
    Reserva.create(reserva)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una reserva."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Reserva.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener reserva con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Reserva.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las reservas."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    validador = validarReserva(req)
    if (!validador.isValid) {
        res.status(400).send({
            message: validador.message
        });
        return;
    }
    
    Reserva.findByPk(id)
        .then(reserva => {
            reserva.cantidad = req.body.cantidad;
            reserva.horario = req.body.horario;
            reserva.fecha = req.body.fecha;
            reserva.restauranteId = req.body.restauranteId;
            reserva.mesaId = req.body.mesaId;
            reserva.clienteId = req.body.clienteId;
            reserva.save();
            res.send(reserva);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener reserva con id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    
    Reserva.findByPk(id)
        .then(reserva => {
            reserva.destroy();
            res.send();
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener reserva con id=" + id
            });
        });
}

function validarReserva(req){
    if (!req.body.cantidad) {
        return {
            isValid : false,
            message : "Debe enviar la cantidad de personas de la reserva."
        };
    }
    if (!req.body.horario) {
        return {
            isValid : false,
            message : "Debe enviar el horario de la reserva. Formato HH-HH"
        };
    }
    if (!req.body.fecha) {
        return {
            isValid : false,
            message : "Debe enviar el fecha de la reserva."
        };
    }
    if (!req.body.restauranteId) {
        return {
            isValid : false,
            message : "Debe enviar el id del restaurante de la reserva."
        };
    }
    if (!req.body.mesaId) {
        return {
            isValid : false,
            message : "Debe enviar el id de la mesa de la reserva."
        };
    }
    if (!req.body.clienteId) {
        return {
            isValid : false,
            message : "Debe enviar el id del cliente de la reserva."
        };
    }

    return {
        isValid : true,
        message : ""
    };

}