const Usuario = require('../models/usuario');
const Mensaje = require('../models/message');
const { response } = require('express');
const CircularJSON = require('circular-json');


const usuarioConectado = async ( uid = '' ) => {

    const usuario  = await Usuario.findById( uid );
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async ( uid = '' ) => {
    const usuario  = await Usuario.findById( uid );
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const grabarMensaje = async( payload ) => {

    /*
        payload: {
            de: '',
            para: '',
            texto: ''
        }
    */

    try {
        const mensaje = new Mensaje( payload );
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }

}

const getUsuarios = async (req, res = response) => {
    // agregar apginacion 
    const desde = Number(req.query.desde) || 0;

    const user = await Usuario.find({_id: {$ne:req.uid}}).sort('on-line').skip(desde).limit(20)
    res.json({
        ok: true,
        user
    })
}



module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje,
    getUsuarios
}

