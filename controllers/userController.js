const { response, request } = require("express"); // importamos response de express
const Usuario = require("../models/user"); //importamos el modelo de usuario
const bcryptjs = require("bcryptjs"); //importamos bcryptjs

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "no name", apikey, page = "1", limit } = req.query;
  const { limite = 5, desde = 0 } = req.query; // si no se envia el limite se pone por defecto 5
  const queryEstado = { estado: true }; //creamos un objeto para filtrar los usuarios que esten activos

  if (isNaN(limite) || isNaN(desde)) {
    //validamos que el limite y desde sean numeros con la funcion isNaN
    return res.status(400).json({
      msg: "limite y desde deben ser numeros",
    });
  }

  const [total,usuarios] = await Promise.all([ // resp es un arreglo que contiene dos promesas que se ejecutan al mismo tiempo y se almacenan en el arreglo 
  Usuario.countDocuments(queryEstado),// Este query es para contar los usuarios que esten activos
  Usuario.find(queryEstado).limit(Number(limite)).skip(Number(desde)) // Este query es para obtener los usuarios que esten activos
   
  ]);

  res.json({
    msg: "get API - controlador",
    total,
    usuarios
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params; // obtenemos el id de los parametros
  const { _id, password, google, correo, ...resto } = req.body;// extraemos el id, password, google y correo del body y el resto lo almacenamos en la variable resto para actualizar los datos del usuario sin afectar el id, password, google y correo
  //hacer:validar contra base de datos

  if (password) {
    //volver a encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //generamos el salt
    resto.password = bcryptjs.hashSync(password, salt); //encriptamos la contraseña
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);// actualizamos el usuario con el id y los datos que estan en la variable resto

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

const usuariosDelete = async(req = request, res = response) => {

  const {id}=req.params;
  //Borrar fisicamente de la base de datos
 // const usuario=await Usuario.findByIdAndDelete(id);

 //Manera correcta de borrar un usuario sin impactar la base de datos
 const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});


  res.json({
    msg: "delete API - controlador",
    msg:`El usuario:${usuario.nombre} con id:${usuario.id} fue eliminado`,
    usuario,
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
