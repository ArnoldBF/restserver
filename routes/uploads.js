const { Router } = require('express');
const { check } = require('express-validator');
const {
	cargarArchivos,
	// actualizarArchivos,
	mostrarImagen,
	actualizarArchivosCloudinary,
} = require('../controllers/uploadController');
const { validarJWT, validarArchivo, validarCampos } = require('../middlewares');
const { coleccionExist } = require('../helpers/db-validators');

const router = Router();

router.post('/', validarArchivo, cargarArchivos);

router.put(
	'/:coleccion/:id',
	[
		validarJWT,
		validarArchivo,
		check('id', 'No es un id de mongo valido').isMongoId(),
		check('coleccion').custom((c) => coleccionExist(c, ['usuarios', 'productos'])),
		validarCampos,
	],
	actualizarArchivosCloudinary,
);

router.get(
	'/:coleccion/:id',
	[
		check('id', 'No es un id de mongo valido').isMongoId(),
		check('coleccion').custom((c) => coleccionExist(c, ['usuarios', 'productos'])),
		validarCampos,
	],
	mostrarImagen,
);

module.exports = router;
