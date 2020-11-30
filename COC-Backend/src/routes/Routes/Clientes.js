const {Router} = require('express')
const router = Router()
const Crl = require('../../Controller/Clientes')

router.get('/', Crl.ListarClientes)


module.exports = router
