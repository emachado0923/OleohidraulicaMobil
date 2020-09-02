module.exports = (sequelize, type) => {
    return sequelize.define('mano_os',
        {
            mantenimiento_id: {
                type: type.INTEGER,
                references: {
                    model: 'mantenimientos',
                    key: 'id'
                }
            },
            personal: {
                type: type.STRING
            },
            especialidad: {
                type: type.INTEGER
            },
            fechaSalida: {
                type: type.STRING
            },
            diurno: {
                type: type.STRING
            },
            nocturno: {
                type: type.STRING

            }, festivo: {
                type: type.STRING

            }, horasTrabajadas: {
                type: type.STRING

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

