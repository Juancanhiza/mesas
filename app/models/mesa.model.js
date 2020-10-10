module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
        capacidad: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        piso: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        posicion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Mesa;
};