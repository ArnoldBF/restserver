const { Router } = require('express'); // importamos solo el Router de express
const { check } = require('express-validator'); // importamos check de express-validator

const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
} = require('../controllers/userController');

// MIDDLEWARES
// const { validarCampos } = require("../middlewares/validar-campos"); // importamos validarCampos de validar-campos.js
// const { validarJWT } = require("../middlewares/validar-jwt");
// const { validarRol,tieneRol } = require("../middlewares/validar-roles");
const {
	validarCampos,
	validarJWT,
	validarRol,
	tieneRol,
} = require('../middlewares');

const {
	roleValido,
	emailExist,
	usuarioExist,
} = require('../helpers/db-validators');
const router = Router(); // creamos una instancia de Router

router.get('/', usuariosGet);
router.put(
	'/:id',
	[
		check('id', 'No es un ID valido').isMongoId(),
		check('id').custom(usuarioExist),
		check('rol').custom(roleValido),
		validarCampos,
	],
	usuariosPut,
);
router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('correo', 'El correo no es valido').isEmail(),
		check('correo').custom(emailExist),
		check(
			'password',
			'El password debe tener minimo 8 letras',
		).isLength({
			min: 8,
		}), // islength recibe un objeto con la cantidad minima de letras
		check('rol').custom(roleValido), // custom recibe una funcion que recibe el valor del campo y debe retornar true si es valido o un error si no lo es
		validarCampos, // ejecutamos el middleware de validarCampos
	],
	usuariosPost,
); // se ejecuta el middleware de express-validator para validar los campos
router.delete(
	'/:id',
	[
		validarJWT,
		// validarRol,
		tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
		check('id', 'No es un ID valido').isMongoId(),
		check('id').custom(usuarioExist),
		validarCampos,
	],
	usuariosDelete,
);
router.patch('/', usuariosPatch);

module.exports = router; // exportamos el router
