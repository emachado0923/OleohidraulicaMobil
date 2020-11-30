const JWT = require('jsonwebtoken')
const moment = require('moment')

const Verificar = (req, res, next) => {

    const Autorizacion = req.headers.authorization
    if (!Autorizacion) {
        return res.status(403).send('No tienes permisos')
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(403).send('Necesitas un token')
    }
    try {
        const payload = JWT.verify(token, 'COC')
        console.log('payload')
        console.log(payload)

        req.userId = payload.id
        next()

    } catch (e) {
        res.status(403).send('El token es invalido')
    }
}

module.exports = {
    Verificar: Verificar
}
