module.exports = (sequelize, type) => {
    return sequelize.define('costos_vs',
        {
            mantenimiento_id: {
                type: type.INTEGER,
                allowNull: false,
                references: {
                    model: 'mantenimientos',
                    key: 'id',
                }
            },
            numero_personas: {
                type: type.STRING
            },
            especialidad: {
                type: type.INTEGER
            },
            fecha: {
                type: type.STRING
            },
            hotel: {
                type: type.STRING
            },
            alimentacion: {
                type: type.INTEGER,

            },
            transporte: {
                type: type.INTEGER

            },
            subtotal: {
                type: type.INTEGER

            },
            created_at: {
                type: type.DATE,
                defaultValue: type.NOW
            },
            updated_at: {
                type: type.DATE,
                defaultValue: type.NOW
            },
        }, {
            timestamps: false,
            freezeTableName: true
        }
    )
}
