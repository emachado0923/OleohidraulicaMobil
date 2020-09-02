const {Router} = require('express');
const router = Router();
const Crl = require('../../Controller/Mantenimiento');
const multer = require('../../Libs/multer');
const middleware = require('../../Middlewares/middleware')
const {check} = require('express-validator');

router.get('/', middleware.Verificar, Crl.ListarMantenimientos);

router.post('/nuevo',
    [
        check('Mantenimientos', 'Los datos de el mantenimiento son obligatorios').not().isEmpty(),
        check('Externos', 'Los datos de los trabajos Externos son obligatorios').not().isEmpty(),
        check('Viaticos', 'Los datos de los Viaticos son obligatorios').not().isEmpty(),
        check('Repuestos', 'Los datos de los Repuestos son obligatorios').not().isEmpty(),
        check('ManoObra', 'Los datos de la Mano de obra son obligatorios').not().isEmpty(),

    ],
    multer.fields([
        {name: 'imagen1', maxCount: 1},
        {name: 'imagen2', maxCount: 1},
        {name: 'imagen3', maxCount: 1},
        {name: 'imagen4', maxCount: 1},
        {name: 'imagen5', maxCount: 1},
        {name: 'imagen6', maxCount: 1},
    ]), Crl.RegistrarMantenimiento);


module.exports = router;
