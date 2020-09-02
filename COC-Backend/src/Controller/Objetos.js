const ItemsController = {}

const {Cronograma} = require('../database')
const sequelize = require('sequelize');
const moment = require('moment')
const Op = sequelize.Op;

//funcion para listar cronograma
ItemsController.ListarCronograma = async (req, res) => {
    try {

        //la variable fecha es para tener la fecha actual y 7 dias despues
        const fecha = moment().subtract(7, 'days').toDate();
        const cronograma = await Cronograma.findAll({
            where: {
                created_at: {
                    [Op.gte]: fecha
                }
            }
        })

        res.json(cronograma)
    } catch (e) {
        console.log(e)
        res.status(400).json({error: e})
    }

}
//función para listar y llevar datos a los picker
ItemsController.ListarRecursos = async (req, res) => {

    const Recursos = (
        'SELECT * FROM `autobomba`;' +
        'SELECT * FROM `mixer`;' +
        'SELECT * FROM `cargador`;' +
        'SELECT * FROM `bomba`;' +
        'SELECT * FROM `planta`;' +
        'SELECT * FROM `especialidad`'
    )

    try {

        const recursos = await Cronograma.sequelize.query(Recursos, 1,
            {
                type:
                sequelize.QueryTypes.SELECT,
                raw: true,
                plain: true
            });
        res.json(recursos[0])

    } catch (e) {
        console.log(e)
        res.status(400).json({error: e})
    }

}
module.exports = ItemsController;
