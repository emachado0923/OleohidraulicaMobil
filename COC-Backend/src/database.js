const Sequelize = require('sequelize')
//Modelos
const UsersModel = require('./Model/Usuarios/Usuarios')
const ItemsModel = require('./Model/Objetos/Objetos')
const MaintenanceModel = require('./Model/Mantenimientos/mantenimiento')
const ClientsModel = require('./Model/Clientes/Clientes')
const ViaticosModel = require('./Model/Viaticos/viaticos')
const RepuestosModel = require('./Model/Repuestos/respuestos')
const ManoObraModel = require('./Model/ManoObra/manoObra')
const TrabajosExternosModel = require('./Model/TrabajosExternos/trabajosExternos')

const conn = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'oleohidraulicos',
}

const sequelize = new Sequelize(conn.DATABASE, conn.USER, conn.PASSWORD,
    {
        dialect: 'mysql',
        port: 3306,
        host: conn.HOST,
        dialectOptions: {
            multipleStatements: true
        }

    }
)


const Usuarios = UsersModel(sequelize, Sequelize)
const Cronograma = ItemsModel(sequelize, Sequelize)
const Mantenimiento = MaintenanceModel(sequelize, Sequelize)
const Clientes = ClientsModel(sequelize, Sequelize)
const Viaticos = ViaticosModel(sequelize, Sequelize)
const ManoObra = ManoObraModel(sequelize, Sequelize)
const Repuestos = RepuestosModel(sequelize, Sequelize)
const TrabajosExternos = TrabajosExternosModel(sequelize, Sequelize)

Viaticos.belongsTo(Mantenimiento, {
    as: 'mantenimiento',
    foreignKey: 'mantenimiento_id'
})
ManoObra.belongsTo(Mantenimiento, {
    as: 'mantenimiento',
    foreignKey: 'mantenimiento_id'
})
Repuestos.belongsTo(Mantenimiento, {
    as: 'mantenimiento',
    foreignKey: 'mantenimiento_id'
})
TrabajosExternos.belongsTo(Mantenimiento, {
    as: 'mantenimiento',
    foreignKey: 'mantenimiento_id'
})

sequelize.sync({force: false}).then(() => {
    console.clear()
    console.log('Sincronizacion completada')
})

module.exports = {
    Usuarios,
    Cronograma,
    Mantenimiento,
    Clientes,
    Viaticos,
    ManoObra,
    Repuestos,
    TrabajosExternos
};
