module.exports = (sequelize, type) => {
    return sequelize.define('mantenimientos', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: type.INTEGER
            },
            ContactoCliente: {
                type: type.STRING
            },
            correo_cliente: {
                type: type.STRING
            },
            telefono: {
                type: type.STRING
            },
            n_cotizacion: {
                type: type.STRING
            },
            fecha_cotizacion: {
                type: type.STRING
            },
            contacto: {
                type: type.STRING
            },
            correo_contacto: {
                type: type.STRING
            },
            direccion: {
                type: type.STRING
            },
            celular: {
                type: type.STRING
            },
            nit: {
                type: type.STRING
            },
            numeroOT: {
                type: type.STRING
            },
            estado_cotizacion: {
                type: type.STRING
            },
            descripcionTrabajoRealizar: {
                type: type.STRING
            },
            Equipo: {
                type: type.STRING
            },
            Placa: {
                type: type.STRING
            },
            spinnerUbicacion: {
                type: type.STRING
            },
            fechaIngreso: {
                type: type.STRING
            },
            horaIngreso: {
                type: type.TIME
            },
            fechaSalida: {
                type: type.STRING
            },
            horaSalida: {
                type: type.STRING
            },
            Horometro: {
                type: type.STRING
            },
            Kilometraje: {
                type: type.STRING
            },
            spinnerMixer: {
                type: type.STRING
            },
            spinnerAutobomba: {
                type: type.STRING
            },
            spinnerBombaEstacionaria: {
                type: type.STRING
            },
            spinnerPlanta: {
                type: type.STRING
            },
            spinnerCargador: {
                type: type.STRING
            },
            totalRepuestos: {
                type: type.INTEGER
            },
            totalTrabajos_e: {
                type: type.INTEGER
            },
            totalCostos_v: {
                type: type.INTEGER
            },
            totalMano_o: {
                type: type.INTEGER
            },
            subTotal: {
                type: type.STRING
            },
            IVA: {
                type: type.STRING
            },
            grandTotal: {
                type: type.STRING
            },
            Observaciones: {
                type: type.STRING

            }, imagen1: {
                type: type.STRING

            },
            imagen2: {
                type: type.STRING
            },
            imagen3: {
                type: type.STRING
            },
            imagen4: {
                type: type.STRING
            },
            imagen5: {
                type: type.STRING
            },
            imagen6: {
                type: type.STRING
            },
            forma_de_pago: {
                type: type.STRING
            },
            vigencia: {
                type: type.STRING
            },
            tiempo_lugar: {
                type: type.STRING
            },
            att: {
                type: type.STRING
            }, created_at: {
                type: type.DATE,
                defaultValue: type.NOW
            },
            updated_at: {
                type: type.DATE,
                defaultValue: type.NOW
            },

        },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
}
