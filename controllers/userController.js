const { response, request } = require("express"); // importamos response de express
const Usuario = require("../models/user"); //importamos el modelo de usuario
const bcryptjs = require("bcryptjs"); //importamos bcryptjs
const {validationResult}=require('express-validator');// importamos validationResult de express-validator


const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "no name", apikey, page = "1", limit } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPost = async (req = request, res = response) => {

const errors=validationResult(req);// obtenemos los errores de la validacion y los guardamos en la constante errors

if(!errors.isEmpty()){
  return res.status(400).json(errors);// si hay errores retornamos un status 400 y los errores
}

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo: correo });

  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya esta registrado",
    });
  }
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
