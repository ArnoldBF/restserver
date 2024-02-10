const { response, request } = require("express"); // importamos response de express
const Usuario = require("../models/user"); //importamos el modelo de usuario
const bcryptjs = require("bcryptjs"); //importamos bcryptjs

const usuariosGet = async (req = request, res = response) => {
 // const { q, nombre = "no name", apikey, page = "1", limit } = req.query;
 const{limite=5}=req.query;// si no se envia el limite se pone por defecto 5
 const usuarios=await Usuario.find().limit(Number(limite));// limitamos la cantidad de usuarios que se muestran
  res.json({
    msg: "get API - controlador",
   usuarios
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;// obtenemos el id de los parametros
  const { _id,password, google, correo, ...resto } = req.body;
  //hacer:validar contra base de datos

  if (password) {
    //volver a encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //generamos el salt
    resto.password = bcryptjs.hashSync(password, salt); //encriptamos la contraseña
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - controlador",
    usuario,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); //generamos el salt
  usuario.password = bcryptjs.hashSync(password, salt); //encriptamos la contraseña
  //guardar en db
  await usuario.save();
  res.status(201).json({
    usuario,
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
