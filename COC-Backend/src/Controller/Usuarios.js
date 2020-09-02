const UserController = {}

const moment = require('moment')
const bycript = require('bcryptjs')
const {Usuarios} = require('../database')
const JWT = require('jsonwebtoken')
const {validationResult} = require('express-validator');

UserController.ListarUsuarios = async (req, res) => {

    console.log(req.users)

    try {

        const user = await Usuarios.findAll()
        res.json(user)

    } catch (e) {

        res.status(400).json({error: `${e}`})
    }

}

UserController.Crear = async (req, res) => {

    req.body.password = bycript.hashSync(req.body.password, 10)
    const user = await Usuarios.create(req.body)
    res.json(user)

}

UserController.Ingresar = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const user = await Usuarios.findOne({where: {identificacion: req.body.identificacion}})

    try {

        if (user) {


            const compararContrasena = bycript.compareSync(req.body.password, user.password)

            if (compararContrasena) {

                const token = JWT.sign({id: user.id}, 'COC',)
                res.json({success: `Bienvenido  al sistema ${user.name} !`, token, user});

            } else {

                res.status(401).json('Contraseña incorrecta!')
            }
        } else {

            res.status(401).json('Identificacion y/o contraseña incorrectas!')
        }

    } catch (e) {

        console.log(e)

    }

}

UserController.CambiarContraseña = async (req, res) => {

    const {antiguaContraseña, nuevaContraseña, confirmacion} = req.body

    const usuario = await Usuarios.findByPk(req.params.id)
    const encriptado = bycript.compareSync(antiguaContraseña, usuario.password)

    if (encriptado) {

        try {

            if (nuevaContraseña === confirmacion) {

                let nueva_encriptada = bycript.hashSync(confirmacion, 10)

                await Usuarios.update(
                    {
                        password: nueva_encriptada
                    },
                    {
                        where: {
                            id: req.params.id
                        }
                    }
                )
                res.status(201).send('Contraseña actualizada con exito!')

            } else {
                res.status(400).send('Las contraseñas no Coinciden!')
            }

        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(400).send('Contraseña incorrecta!')
    }

}

UserController.ModificarPerfil = async (req, res) => {

    const {nuevoNombre} = req.body

    try {

        await Usuarios.update(
            {
                foto: req.file.filename,
                name: nuevoNombre
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(201).send('Modificado con exito!')
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }

}

module.exports = UserController;
