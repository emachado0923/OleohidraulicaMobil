module.exports = (sequelize, type) => {
    return sequelize.define('repuestos',
        {
            mantenimiento_id: {
                type: type.INTEGER,
                references: {
                    model: 'mantenimientos',
                    key: 'id'
                }
            },
            descripcion_repuesto: {
                type: type.STRING
            },
            cantidad: {
                type: type.STRING
            },
            valor_unt: {
                type: type.STRING
            },
            aiu: {
                type: type.STRING,

            }, subtotal: {
                type: type.STRING

            }, created_at: {
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
