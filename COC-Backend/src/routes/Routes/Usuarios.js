const {Router} = require('express')
const router = Router()
const Ctrl = require('../../Controller/Usuarios')
const middleware = require('../../Middlewares/middleware')
const multer = require('../../Libs/multer');

const {check} = require('express-validator');

router.get('/', Ctrl.ListarUsuarios)
router.post('/login', [
    check('identificacion', 'La identificación es obligatoria').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()

], Ctrl.Ingresar)
router.put('/modificar/:id', middleware.Verificar, Ctrl.CambiarContraseña)
router.put('/modificarPerfil/:id', middleware.Verificar, multer.single('nuevaFoto'), Ctrl.ModificarPerfil)
router.post('/new', Ctrl.Crear)


module.exports = router
