const {Router} = require('express')
const express = require('express');
const app = express();
const router = Router()
const middleware = require('../Middlewares/middleware')


app.get('/autorization/token/:token', middleware.Verificar)
//Usuarios
const RoutesUsuario = require('./Routes/Usuarios')
//Objetos
const RoutesObjeto = require('./Routes/Objetos')
//Mantenimientos
const RoutesMantenimiento = require('./Routes/Mantenimientos')
//Clientes
const RoutesCliente = require('./Routes/Clientes')

//Usuarios
router.use('/usuarios', RoutesUsuario)
//Objetos
router.use('/objetos', RoutesObjeto)
//Mantenimientos
router.use('/mantenimiento', RoutesMantenimiento)
//Clientes
router.use('/clientes', RoutesCliente)
//middleware

module.exports = router
