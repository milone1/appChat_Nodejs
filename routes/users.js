/*
    path: api/usuarios

*/
const { Router } = require('express');
const { validarJWT } = require('../middelwares/validar_jwt');

const { getUsuarios } = require('../controllers/users');

const router = Router();


router.get('/', validarJWT, (req, res) => {
    // Your logic goes here
    // Make sure to send a response back to the client
  });
module.exports = router;