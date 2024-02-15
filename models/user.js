/*
{
    nombre:'asd',
    correo:'adsfsdfsd.com',
    password:'asdasd',
    img:'asdasd',
    rol:'asdasd',
    estado:false,
    google:false

}
**/
const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"], //que sea obligatorio
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true, //que sea unico
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE","VENTAS_ROLE"], //que solo acepte esos valores
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON=function(){
  const {__v,password,_id,...usuario}=this.toObject();// extraemos la version, la contraseña y el id del objeto y el resto lo almacenamos en la variable usuario para evitar que se muestren en la respuesta
  usuario.uid=_id;// cambiamos el nombre del id por uid
  return usuario;
}

module.exports = model("Usuario", usuarioSchema);
