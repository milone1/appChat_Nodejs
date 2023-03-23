/*
    Path: /api/mensajes
*/
const { Router } = require('express');
const { validarJWT } = require('../middelwares/validar_jwt');

const { obtenerChat } = require('../controllers/messages');

const router = Router();


router.get('/:de', validarJWT, obtenerChat );

module.exports = router;

