const {Router} = require('express')
const router = Router()
const Ctrl = require('../../Controller/Objetos')


router.get('/cronograma', Ctrl.ListarCronograma)
router.get('/recursos', Ctrl.ListarRecursos)

module.exports = router
