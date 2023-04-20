const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check, checkSchema } = require('express-validator');
const { validarCampos } = require('../middelwares/validar_campos');
const { validarJWT } = require('../middelwares/validar_jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    check('email', 'El coampo email es requerido.').isEmail(),
    validarCampos
], crearUsuario)

router.post('/',[
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    check('email', 'El campo email es requerido').isEmail(),
], login)

router.post('/renew',validarJWT,renewToken)
module.exports = router;