module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("Restaurante", {
        direccion: {
            type: Sequelize.STRING
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
    return Restaurante;
};