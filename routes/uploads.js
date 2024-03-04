const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivos, actualizarArchivos } = require('../controllers/uploadController');
const { validarJWT } = require('../middlewares');
const { coleccionExist } = require('../helpers/db-validators');

const router = Router();

router.post('/', cargarArchivos);

router.put(
	'/:coleccion/:id',
	[
		validarJWT,
		check('id', 'No es un id de mongo valido').isMongoId(),
		check('coleccion').custom((c) => coleccionExist(c, ['usuarios', 'productos'])),
		validarCampos,
	],
	actualizarArchivos,
);

module.exports = router;
