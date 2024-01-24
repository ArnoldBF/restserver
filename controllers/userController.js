const { response,request } = require("express"); // importamos response de express

const usuariosGet = (req=request, res = response) => {

    const {q,nombre='no name',apikey,page="1",limit}=req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPut = (req=request, res = response) => {
    const {id}=req.params;
  res.json({
    msg: "put API - controlador",
    id
  });
};

const usuariosPost = (req=request, res = response) => {
  const {nombre,ci,id,edad} = req.body;
  res.status(201).json({
    msg: "post API - controlador",
    nombre,
    ci,
    id,
    edad
  });
};

const usuariosDelete = (req=request, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

const usuariosPatch = (req=request, res = response) => {
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
