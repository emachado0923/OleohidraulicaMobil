module.exports = (sequelize, type) => {
    return sequelize.define('trabajos_externos',
        {
            mantenimiento_id: {
                type: type.INTEGER,
                references: {
                    model: 'mantenimientos',
                    key: 'id'
                }
            },
            descripcion: {
                type: type.STRING
            },
            costo: {
                type: type.INTEGER
            },
            aui: {
                type: type.FLOAT
            },
            valor: {
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
