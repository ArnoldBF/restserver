const { response, request } = require('express');
const { Product } = require('../models');

const getProducto = async (req = request, res = response) => {
	const { limite = 5, desde = 0 } = req.query;
	const queryEstado = { estado: true };

	const [total, producto] = await Promise.all([
		Product.countDocuments(queryEstado),
		Product.find(queryEstado)
			.limit(Number(limite))
			.skip(Number(desde))
			.populate({
				path: 'usuario',
				select: 'nombre',
			})
			.populate({
				path: 'categoria',
				select: 'nombre',
			}),
	]);

	res.status(200).json({
		msg: 'todo ok desde getproducto',
		total,
		producto,
	});
};

const getProductoId = async (req = request, res = response) => {
	const { id } = req.params;

	const productoPorId = await Product.findById(id)
		.populate({
			path: 'usuario',
			select: 'nombre',
		})
		.populate({
			path: 'categoria',
			select: 'nombre',
		});

	res.status(200).json({
		msg: 'todo ok desde getproductoId',
		productoPorId,
	});
};

const postProducto = async (req = request, res = response) => {
	const { estado, usuario, ...resto } = req.body;

	const productoDB = await Product.findOne({ nombre: resto.nombre });

	if (productoDB) {
		return res.status(400).json({
			msg: `El producto con el nombre: ${productoDB.nombre} ya existe`,
		});
	}

	const dataProducto = {
		...resto,
		usuario: req.usuario._id,
	};

	const producto = new Product(dataProducto);

	await producto.save();

	res.status(200).json({
		msg: 'todo ok desde postProducto',
		producto,
	});
};

const putProducto = async (req = request, res = response) => {
	const { id } = req.params;

	const { _id, usuario, ...resto } = req.body;

	resto.usuario = req.usuario_id;

	const producto = await Product.findByIdAndUpdate(id, resto, {
		new: true,
	}).populate('usuario', 'nombre');

	res.status(200).json({
		msg: 'todo ok desde putproducto',
		producto,
	});
};

const deleteProducto = async (req = request, res = response) => {
	const { id } = req.params;

	const producto = await Product.findByIdAndUpdate(
		id,
		{ estado: false },
		{ new: true },
	).populate('usuario', 'nombre');

	res.status(200).json({
		msg: 'todo ok desde deleteproducto',
		producto,
	});
};
/**
const productoPath = (req = request, res = response) => {
	res.json({
		msg: 'patch API - controlador',
	});
};
**/
module.exports = {
	getProducto,
	getProductoId,
	postProducto,
	putProducto,
	deleteProducto,
};
