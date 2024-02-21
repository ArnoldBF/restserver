const { response, request } = require("express");
const Usuario = require("../models/user");
const Categoria = require("../models/category");

const categoriaGet = async (req = request, res = response) => {
  res.json({
    msq: "todo ok desde get",
  });
};

const categoriaGetPorId = async (req = request, res = response) => {
	res.json({
	  msq: "todo ok desde get",
	});
  };

const categoriaPost = async (req = request, res = response) => {
  res.json({
    msq: "todo ok desde post",
  });
};

const categoriaPut = async (req = request, res = response) => {
  res.json({
    msq: "todo ok desde put",
  });
};
const categoriaDelete = async (req = request, res = response) => {
  res.json({
    msq: "todo ok desde delete",
  });
};

const categoriaPath = (req = request, res = response) => {
	res.json({
	  msg: "patch API - controlador",
	});
  };


module.exports = {
  categoriaGet,
  categoriaDelete,
  categoriaGetPorId,
  categoriaPost,
  categoriaPut,
  categoriaPath
};
