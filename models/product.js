const { Schema, model } = require('mongoose');

const productoSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es obligatorio'], // que sea obligatorio,
		unique: true,
	},
	descripcion: {
		type: String,
		required: [true, 'La descripcion es obligatoria'],
		// unique: true, //que sea unico
	},

	estado: {
		type: Boolean,
		default: true,
		required: true,
	},

	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},

	precio: {
		type: Number,
		default: 0,
	},
	categoria: {
		type: Schema.Types.ObjectId,
		ref: 'Categoria',
		required: true,
	},

	disponile: {
		type: Boolean,
		default: true,
	},
});

productoSchema.methods.toJSON = function () {
	const { __v, _id, ...producto } = this.toObject(); // extraemos la version, y el id del objeto y el resto lo almacenamos en la variable categoria para evitar que se muestren en la respuesta
	producto.uid = _id; // cambiamos el nombre del id por uid

	return producto;
};

module.exports = model('Producto', productoSchema);
