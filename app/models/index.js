const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Restaurante = require("./restaurante.model.js")(sequelize, Sequelize);
db.Cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.Mesa = require("./mesa.model.js")(sequelize, Sequelize);
db.Reserva = require("./reserva.model.js")(sequelize, Sequelize);

/** RELACIONES */

// Restaurantes

db.Restaurante.hasMany(db.Mesa, { 
  foreignKey: 'restauranteId',
  as: "mesas" 
});

// Reservas

db.Restaurante.hasOne(db.Reserva, {
  foreignKey: 'restauranteId'
});
//db.Reserva.belongsTo(db.Restaurante);

db.Cliente.hasOne(db.Reserva, {
  foreignKey: "clienteId"
});
//db.Reserva.belongsTo(db.Cliente);

db.Mesa.hasOne(db.Reserva, { 
  foreignKey: "mesaId"
});
//db.Reserva.belongsTo(db.Mesa);

module.exports = db;