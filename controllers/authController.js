const { response, request } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleverify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
	const { correo, password } = req.body;

	try {
		// Verificar si el correo existe

		const usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - correo',
			});
		}

		// Verificar si el usuario esta activo
		if (!usuario.estado) {
			return res.status(400).json({
				msg: 'El usuario no esta activo',
			});
		}

		// Verificar la contraseña
		const validPassword = bcryptjs.compareSync(
			password,
			usuario.password,
		);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - password',
			});
		}

		// Generar el JWT
		const token = await generarJWT(usuario.id);

		res.json({
			msg: 'login listo',
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

const googleSignIn = async (req = request, res = response) => {
	const { idToken } = req.body;

	try {
		const { nombre, correo, img } = await googleverify(idToken);
		// console.log(googleUser);

		// Verificar si el correo existe
		let usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			// Tengo que crearlo
			const data = {
				nombre,
				correo,
				password: ':P',
				img,
				google: true,
				rol: 'USER_ROLE',
			};

			usuario = new Usuario(data);
			await usuario.save();
		}

		// Si el usuario en DB
		if (!usuario.estado) {
			return res.status(401).json({
				msg: 'Hable con el administrador, usuario deshabilitado',
			});
		}
		// Generar el JWT
		const token = await generarJWT(usuario.id);

		res.json({
			msg: 'Todo bien google signin',
			usuario,
			token,
		});
	} catch (error) {
		res.status(400).json({
			msg: 'Token de google no es valido',
		});
	}
};

module.exports = {
	login,
	googleSignIn,
};
