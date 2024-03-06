const path = require('path');
const fs = require('fs');

const { response, request } = require('express');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers/subir-archivo');
const { Product, Usuario } = require('../models');

const cargarArchivos = async (req = request, res = response) => {
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

	// Limpiar imagenes previas

	if (modelo.img) {
		// Hay que borrar la imagen del servidor

		const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

		if (fs.existsSync(pathImagen)) {
			fs.unlinkSync(pathImagen);
		}
	}

	const nombre = await subirArchivo(req.files, ['jpg'], coleccion);
	modelo.img = nombre;

	await modelo.save();

	res.json({
		modelo,
	});
};

const actualizarArchivosCloudinary = async (req = request, res = response) => {
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

	// Limpiar imagenes previas

	if (modelo.img) {
		// Hay que borrar la imagen del servidor
		// TODO

		const nombreArr = modelo.img.split('/');
		const nombreConExtension = nombreArr[nombreArr.length - 1];
		// eslint-disable-next-line camelcase
		const [public_id] = nombreConExtension.split('.');

		cloudinary.uploader.destroy(public_id);
	}

	// console.log(req.files.archivo);
	const { tempFilePath } = req.files.archivo;
	// eslint-disable-next-line camelcase
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

	// eslint-disable-next-line camelcase
	modelo.img = secure_url;

	await modelo.save();

	res.json({
		modelo,
	});
};

const mostrarImagen = async (req = request, res = response) => {
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

	if (modelo.img) {
		const imagenCloudinary = cloudinary.url(modelo.img);

		if (imagenCloudinary) {
			return res.json({ imagenCloudinary });
		}
	}
	const pathImagenVacia = path.join(__dirname, '../assets/no-image.jpg');
	res.sendFile(pathImagenVacia);
};

module.exports = {
	cargarArchivos,
	actualizarArchivos,
	mostrarImagen,
	actualizarArchivosCloudinary,
};
