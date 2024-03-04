const { response, request } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
// const { ObjectId } = require('mongoose').Types;
const { Product, Usuario } = require('../models');

const cargarArchivos = async (req = request, res = response) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
		res.status(400).json({
			msg: 'No se ha subido ningun archivo',
		});
	}

	try {
		// const nombre = await subirArchivo(req.files, ['jpg'], 'imagenes');
		// const nombre = await subirArchivo(req.files, undefined, 'usuarios');
		const nombre = await subirArchivo(req.files);
		res.json({
			nombre,
		});
	} catch (error) {
		res.status(400).json({
			error,
		});
	}
};

// const actualizarImagenUsuario = async (id, req = request, res = response) => {
// 	const esMongoID = ObjectId.isValid(id);

// 	if (esMongoID) {
// 		const { img, ...resto } = req.body;
// 		const imagenUsuario = await subirArchivo(req.files, ['jpg'], 'usuario');
// 		resto.img = imagenUsuario;
// 		const usuarioConImagen = await Usuario.findByIdAndUpdate(id, resto, { new: true });

// 		res.status(200).json({
// 			usuarioConImagen,
// 		});
// 	}
// };

// const actualizarImagenProduct = async (id, req = request, res = response) => {
// 	const esMongoID = ObjectId.isValid(id);

// 	if (esMongoID) {
// 		const { usuario, _id, img, ...resto } = req.body;

// 		const imagenProducto = await subirArchivo(req.files, ['jpg'], 'usuario');
// 		resto.usuario = req.usuario._id;
// 		resto.img = imagenProducto;
// 		const productoConImagen = await Product.findByIdAndUpdate(id, resto, { new: true }).populate('usuario', 'nombre');

// 		res.status(200).json({
// 			productoConImagen,
// 		});
// 	}
// };

const actualizarArchivos = async (req = request, res = response) => {
	const { coleccion, id } = req.params;

	let modelo;

	switch (coleccion) {
		case 'usuarios':
			modelo = await Usuario.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe usurio con id: ${id}`,
				});
			}
			break;

		case 'productos':
			modelo = await Product.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe producto con id: ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({
				msg: 'se me olvido programar esta busqueda',
			});
	}

	try {
		const nombre = await subirArchivo(req.files, ['jpg'], coleccion);
		modelo.img = nombre;

		await modelo.save();

		res.json({
			modelo,
		});
	} catch (err) {
		res.status(400).json({
			err,
		});
	}
};

module.exports = {
	cargarArchivos,
	actualizarArchivos,
};
