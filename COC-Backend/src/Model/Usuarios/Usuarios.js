module.exports = (sequelize, type) => {
    return sequelize.define('users',
        {
            name: {
                type: type.STRING
            },
            foto: {
                type: type.STRING
            },
            email: {
                type: type.STRING
            },
            email_verified_at: {
                type: type.STRING
            },
            password: {
                type: type.STRING
            },
            identificacion: {
                type: type.INTEGER,
                unique: true

            }, estado: {
                type: type.INTEGER

            }, rol: {
                type: type.INTEGER

            }, remember_token: {
                type: type.STRING

            }
        }, {
            timestamps: false,
            freezeTableName: true
        }
    )
}
