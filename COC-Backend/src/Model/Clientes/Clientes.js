module.exports = (sequelize, type) => {
    return sequelize.define('clientes', {
            cliente: {
                type: type.STRING
            },
            correo_cliente: {
                type: type.STRING

            }, nit: {
                type: type.STRING
            },
            direccion: {
                type: type.STRING
            },
            telefono: {
                type: type.STRING
            },
            contacto: {
                type: type.STRING
            },
            correo_contacto: {
                type: type.STRING
            },
            celular: {
                type: type.STRING

            }, created_at: {
                type: type.DATE,
                defaultValue: type.NOW
            },
            updated_at: {
                type: type.DATE,
                defaultValue: type.NOW
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
}
