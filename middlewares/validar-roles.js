const { request, response } = require('express');
// const Usuario = require('../models/user');

const validarRol = (req = request, resp = response, next) => {
	if (!req.usuario) {
		return resp.status(500).json({
			msg: 'Se quiere verificar el rol sin validar el token primero',
		});
	}

	const { rol, nombre } = req.usuario;
	if (rol !== 'ADMIN_ROLE') {
		return resp.status(401).json({
			msg: `${nombre} no es administrador - No puede realizar esta accion`,
		});
	}

	next();
};

const tieneRol = (...roles) => {
	return (req = request, res = response, next) => {
		if (!req.usuario) {
			return res.status(500).json({
				msg: 'Se quiere verificar el rol sin validar el token primero',
			});
		}
		if (!roles.includes(req.usuario.rol)) {
			return res.status(401).json({
				msg: `El servicio requiere uno de estos roles ${roles}`,
			});
		}

		next();
	};
};

module.exports = {
	validarRol,
	tieneRol,
};
