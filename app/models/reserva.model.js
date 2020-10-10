module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", {
        cantidad: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        horario: {
            type: Sequelize.STRING, //FORMATO HH-HH
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Reserva;
    /***  
     * Referencia a: 
     *      - Restaurante
     *      - Mesa
     *      - Cliente
     * */
};