module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cedula: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Cliente;
};