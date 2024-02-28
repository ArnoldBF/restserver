const { Router } = require('express');

const { check } = require('express-validator');
const {
	validarCampos,
	validarJWT,
	validarRol,
} = require('../middlewares');

const {
	productoExist,
	categoriaExist,
} = require('../helpers/db-validators');

const {
	getProducto,
	getProductoId,
	postProducto,
	putProducto,
	deleteProducto,
} = require('../controllers/productsController');

const router = Router();

router.get('/', getProducto);

router.get(
	'/:id',
	[
		check('id', 'no es un Id valido de mongo').isMongoId(),
		check('id').custom(productoExist),
		validarCampos,
	],
	getProductoId,
);
router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'Nombre es obligatorio').not().isEmpty(),
		check('descripcion', 'Descripcion es obligatoria')
			.not()
			.isEmpty(),
		check('precio', 'precio es obligatorio').not().isEmpty(),
		check('categoria', 'no es un id valido de mongo').isMongoId(),
		check('categoria', 'categoria es obligatoria').not().isEmpty(),
		check('categoria').custom(categoriaExist),
		validarCampos,
	],
	postProducto,
);
router.put(
	'/:id',
	[
		validarJWT,
		check('id', 'No es id valido de mongo').isMongoId(),
		check('id').custom(productoExist),
		validarCampos,
	],
	putProducto,
);

router.delete(
	'/:id',
	[
		validarJWT,
		validarRol,
		check('id', 'No es id valido de mongo').isMongoId(),
		check('id').custom(productoExist),
		validarCampos,
	],
	deleteProducto,
);

module.exports = router;
