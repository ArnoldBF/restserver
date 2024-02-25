const { Schema, model } = require("mongoose");

const categoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"], //que sea obligatorio,
    unique: true,
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
    // unique: true, //que sea unico
  },

  estado: {
    type: Boolean,
    default: true,
    required: true,
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

categoriaSchema.methods.toJSON = function () {
  const { __v, _id, ...categoria } = this.toObject(); // extraemos la version, y el id del objeto y el resto lo almacenamos en la variable categoria para evitar que se muestren en la respuesta
  categoria.uid = _id; // cambiamos el nombre del id por uid

  return categoria;
};

module.exports = model("Categoria", categoriaSchema);
