const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generaJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try{
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return  res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);
        // encriptar la contrasena 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        // generar mi jwt
        console.log('ususairo uid',usuario.id)
        const token = await generaJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }
};

const login = async(req, res = response) => {
    const { email, password} = req.body;
    try{
        const usuarioDB = await Usuario.findOne({email})

        if(!usuarioDB){
            return res.status(404).json({
                ok: false, 
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false, 
                msg: 'La conrtaseña is incorrecta'
            })
        }

        const token = await generaJWT(usuarioDB.id);

        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrdor'
        })
    }
}

const renewToken = async(req, res) => {
    const uid = req.uid;
    // genera un nuevo token 
    const token = await generaJWT(uid);
    // obtener el usuario por el uid.
    const usuario = await Usuario.findById(uid)
    res.json({
        ok: true,
        uid: req.uid
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
};
