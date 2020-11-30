const MaintenanceController = {};
const {Mantenimiento, Viaticos, ManoObra, Repuestos, TrabajosExternos, Clientes} = require('../database');
const {validationResult} = require('express-validator');
const sequelize = require('sequelize');
const moment = require('moment')
const Op = sequelize.Op;


MaintenanceController.ListarMantenimientos = async (req, res) => {

    try {

        const fecha = moment().subtract(7, 'days').toDate();
        const mantenimiento = await Mantenimiento.findAll(
            {
                where: {
                    created_at: {
                        [Op.gte]: fecha
                    }
                }
            });

        res.json(mantenimiento);

    } catch (e) {

        res.status(400).json({error: e});

    }


};

//funcion para registrar mantenimiento
MaintenanceController.RegistrarMantenimiento = async (req, res) => {
    const {files, body} = req;


    const Mantenimiento_body = JSON.parse(body.Mantenimientos)
    const TrabajoExterno = JSON.parse(body.Externos)
    const Viaticos_Body = JSON.parse(body.Viaticos)
    const Repuestos_Body = JSON.parse(body.Repuestos)
    const ManoObra_Body = JSON.parse(body.ManoObra)

    const errors = validationResult(body)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    if (files && body) {
        console.log(body)

        try {

            Mantenimiento_body.map(async item => {

                const cliente = await Clientes.findOne({where: {id: item.ContactoCliente}})

                await Mantenimiento.create(
                    {
                        imagen1: `https://cocmovil.herokuapp.com/Pictures/${req.files.imagen1[0].filename}`,
                        imagen2: `https://cocmovil.herokuapp.com/Pictures/${req.files.imagen2[0].filename}`,
                        imagen3: `https://cocmovil.herokuapp.com/Pictures/${req.files.imagen3[0].filename}`,
                        imagen4: `https://cocmovil.herokuapp.com/Pictures/${req.files.imagen4[0].filename}`,
                        imagen5: `https://cocmovil.herokuapp.com/Pictures/${req.files.imagen5[0].filename}`,
                        imagen6: `https://cocmovil.herokuapp.com/Pictures/${req.files.imagen6[0].filename}`,
                        ContactoCliente: item.ContactoCliente,
                        telefono: cliente.telefono,
                        correo_cliente: cliente.correo_cliente,
                        contacto: cliente.contacto,
                        correo_contacto: cliente.correo_contacto,
                        direccion: cliente.direccion,
                        celular: cliente.celular,
                        nit: cliente.nit,
                        n_cotizacion: item.n_cotizacion,
                        fecha_cotizacion: item.fecha_cotizacion,
                        estado_cotizacion: item.estado_cotizacion,
                        numeroOT: item.numeroOT,
                        descripcionTrabajoRealizar: item.descripcionTrabajoRealizar,
                        Equipo: item.Equipo,
                        Placa: item.Placa,
                        spinnerUbicacion: item.spinnerUbicacion,
                        fechaIngreso: item.fechaIngreso,
                        horaIngreso: item.horaIngreso,
                        fechaSalida: item.fechaSalida,
                        horaSalida: item.horaSalida,
                        Horometro: item.Horometro,
                        Kilometraje: item.Kilometraje,
                        spinnerMixer: item.spinnerMixer,
                        spinnerAutobomba: item.spinnerAutobomba,
                        spinnerBombaEstacionaria: item.spinnerBombaEstacionaria,
                        totalRepuestos: item.totalRepuestos,
                        spinnerPlanta: item.spinnerPlanta,
                        spinnerCargador: item.spinnerCargador,
                        totalCostos_v: item.totalCostos_v,
                        totalMano_o: item.totalMano_o,
                        totalTrabajos_e: item.totalTrabajos_e,
                        subTotal: item.subTotal,
                        IVA: item.IVA,
                        grandTotal: item.grandTotal,
                        Observaciones: item.Observaciones,
                        forma_de_pago: item.forma_de_pago,
                        vigencia: item.vigencia,
                        tiempo_lugar: item.tiempo_lugar,
                        att: item.att,
                    }
                ).then((decoded) => {
                    Viaticos_Body.map(item => {
                        Viaticos.create({
                            numero_personas: item.numero_personas,
                            especialidad: item.especialidad,
                            fecha: item.fecha,
                            hotel: item.hotel,
                            alimentacion: item.alimentacion,
                            transporte: item.transporte,
                            subtotal: item.subtotal,
                            mantenimiento_id: decoded.id
                        });
                    })
                    ManoObra_Body.map(item => {
                        ManoObra.create({
                            personal: item.personal,
                            fechaSalida: item.fechaSalida,
                            especialidad: item.especialidad,
                            diurno: item.diurno,
                            nocturno: item.nocturno,
                            festivo: item.festivo,
                            horasTrabajadas: item.horasTrabajadas,
                            subtotal: item.subtotal,
                            mantenimiento_id: decoded.id
                        });
                    })
                    Repuestos_Body.map(item => {
                        Repuestos.create({

                            descripcion_repuesto: item.descripcion_repuesto,
                            cantidad: item.cantidad,
                            valor_unt: item.valor_unt,
                            aiu: item.aiu,
                            subtotal: item.subtotal,
                            mantenimiento_id: decoded.id

                        });
                    })
                    TrabajoExterno.map(item => {
                        TrabajosExternos.create({

                            descripcion: item.descripcion,
                            costo: item.costo,
                            aui: item.aui,
                            valor: item.valor,
                            mantenimiento_id: decoded.id

                        });
                    });

                }).then()
                res.status(200).send('Registrado con exito');
            })

        } catch
            (e) {

            console.log('Error: ' + e);
            res.status(400).send(e);

        }
    } else {
        res.status(500).json('No se detectan archivos');
    }


}


module.exports = MaintenanceController;
