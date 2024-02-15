const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const Usuario = require("../models/user");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    //extraer el uid del token
    const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    //verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en la base de datos",
      });
    }
    //verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario deshabilitado",
      });
    }
    //agregar el usuario al request
    req.usuario = usuario;

    next(); //para que continue con el siguiente middleware
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
  //console.log(token); // para ver el token en consola y verificar si esta llegando el token a la peticion
};

module.exports = { validarJWT };
