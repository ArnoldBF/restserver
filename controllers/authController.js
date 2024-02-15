const { response, request } = require("express");
const Usuario = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el correo existe

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    //Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario no esta activo",
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "login listo",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};