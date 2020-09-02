const ClientController = {}
const {Clientes} = require('../database')


ClientController.ListarClientes = async (req, res) => {

    try {

        const clientes = await Clientes.findAll()
        res.json(clientes)

    } catch (e) {
        res.status(400).json({error: e})
    }

}

module.exports = ClientController
