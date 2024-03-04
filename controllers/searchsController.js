const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Product } = require('../models');

const buscarUsuarios = async (termino = '', res = response) => {
	const esMongoID = ObjectId.isValid(termino);

	if (esMongoID) {
		const usuario = await Usuario.findById(termino);

		return res.json({
			results: usuario ? [usuario] : [],
		});
	}

	const regex = new RegExp(termino, 'i'); // expresion regular

	const cantidad = await Usuario.countDocuments({
		$or: [{ nombre: regex }, { correo: regex }],
		$and: [{ estado: true }],
	});

	const usuarios = await Usuario.find({
		$or: [{ nombre: regex }, { correo: regex }],
		$and: [{ estado: true }],
	});

	res.json({
		cantidad,
		results: usuarios,
	});
};
const buscarCategorias = async (termino = '', res = response) => {
	const esMongoID = ObjectId.isValid(termino);

	if (esMongoID) {
		const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');

		return res.json({
			results: categoria ? [categoria] : [],
		});
	}

	const regex = new RegExp(termino, 'i'); // expresion regular

	const cantidad = await Categoria.countDocuments({
		$or: [{ nombre: regex }, { descripcion: regex }],
		$and: [{ estado: true }],
	});

	const categorias = await Categoria.find({
		$or: [{ nombre: regex }, { descripcion: regex }],
		$and: [{ estado: true }],
	}).populate('usuario', 'nombre');

	res.json({
		cantidad,
		results: categorias,
	});
};

const buscarProductos = async (termino = '', res = response) => {
	const esMongoID = ObjectId.isValid(termino);

	if (esMongoID) {
		const cantidad = await Product.countDocuments({
			$or: [{ categoria: new ObjectId(termino) }, { _id: new ObjectId(termino) }],
			$and: [{ estado: true }],
		});
		const productoPorCategoria = await Product.find({
			categoria: new ObjectId(termino),
			estado: true,
		})
			.populate('categoria', 'nombre')
			.populate('usuario', 'nombre');

		const producto = await Product.findById(termino).populate('categoria', 'nombre').populate('usuario', 'nombre');
		return res.json({
			cantidad,
			results: producto ? [producto] : [] || productoPorCategoria ? productoPorCategoria : [],
		});
	}
	const regex = new RegExp(termino, 'i'); // expresion regular
	const cantidad = await Product.countDocuments({
		$or: [{ nombre: regex }, { descripcion: regex }],
		$and: [{ estado: true }],
	});

	const productos = await Product.find({
		$or: [{ nombre: regex }, { descripcion: regex }],
		$and: [{ estado: true }],
	})
		.populate('categoria', 'nombre')
		.populate('usuario', 'nombre');

	res.json({
		cantidad,
		results: productos,
	});
};
const buscar = (req = request, res = response) => {
	const { coleccion, termino } = req.params;

	const collecionesPermitidas = ['usuarios', 'categorias', 'productos'];

	if (!collecionesPermitidas.includes(coleccion)) {
		return res.status(400).json({
			msg: `las colecciones permitidas son ${collecionesPermitidas}`,
		});
	}

	switch (coleccion) {
		case 'usuarios':
			buscarUsuarios(termino, res);
			break;

		case 'categorias':
			buscarCategorias(termino, res);
			break;

		case 'productos':
			buscarProductos(termino, res);
			break;

		default:
			res.status(500).json({
				msg: 'se me olvido programar esta busqueda',
			});
	}
};

module.exports = {
	buscar,
};
