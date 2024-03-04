const { Categoria, Usuario, Role, Product } = require('../models');

const roleValido = async (role = '') => {
	const existeRol = await Role.findOne({ role });
	if (!existeRol) {
		throw new Error(`El rol ${role} no esta registrado en la BD`);
	}
};

const emailExist = async (correo = '') => {
	const existeEmail = await Usuario.findOne({ correo });
	if (existeEmail) {
		throw new Error(`El correo ${correo}, ya esta en uso`);
	}
};

const usuarioExist = async (id = '') => {
	const existeUsuario = await Usuario.findById(id);
	if (!existeUsuario) {
		throw new Error(`El usuario ${id}, no existe`);
	}
};
const categoriaExist = async (id = '') => {
	const existCategoria = await Categoria.findById(id);
	if (!existCategoria) {
		throw new Error(`La categoria ${id}, no existe`);
	}
};

const productoExist = async (id = '') => {
	const existProducto = await Product.findById(id);
	if (!existProducto) {
		throw new Error(`El producto ${id}, no existe`);
	}
};

const coleccionExist = (c = '', coleccionesPermitas = []) => {
	if (!coleccionesPermitas.includes(c)) {
		throw new Error(`las colecciones permitidas son ${coleccionesPermitas}`);
	}
	return true;
};

module.exports = {
	roleValido,
	emailExist,
	usuarioExist,
	categoriaExist,
	productoExist,
	coleccionExist,
};
