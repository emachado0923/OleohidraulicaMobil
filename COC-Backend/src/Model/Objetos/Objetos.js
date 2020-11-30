module.exports = (sequelize, type) => {
    return sequelize.define('cronograma',
        {
            planta: {
                type: type.STRING
            },
            ubicacion: {
                type: type.STRING
            },
            equipo: {
                type: type.STRING
            },
            denominacion: {
                type: type.STRING
            },
            orden: {
                type: type.STRING
            },
            operacion: {
                type: type.STRING,

            }, ejecutor: {
                type: type.STRING

            }, fechaTemprano: {
                type: type.STRING

            }, horaTemprano: {
                type: type.STRING

            }, fechaFinTemprano: {
                type: type.STRING

            }, horaFinTemprano: {
                type: type.STRING
            }
        }, {
            timestamps: false,
            freezeTableName: true
        }
    )
}


