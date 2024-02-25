const { response, request } = require("express");
const { Categoria, User } = require("../models");

const categoriaGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const queryEstado = { estado: true };

  if (isNaN(limite) || isNaN(desde)) {
    return res.status(400).json({
      msg: "limite y desde deben ser numeros",
    });
  }

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(queryEstado),
    Categoria.find(queryEstado)
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("usuario", "nombre")
      .exec(),
    ,
  ]);

  res.json({
    msq: "todo ok desde get",
    total,
    categorias,
  });
};

const categoriaGetPorId = async (req = request, res = response) => {
  try {
    //const queryEstado = { estado: true };
    const { id } = req.params;

    const categoriaPorId = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );

    res.json({
      msq: "todo ok desde get por id",
      categoriaPorId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const categoriaPost = async (req = request, res = response) => {
  const { nombre, descripcion } = req.body;

  //comprobar si existe una categoria con el mismo nombre
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  //Generar la data a aguardar
  const data = {
    nombre,
    descripcion,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //Guardar DB
  await categoria.save();

  res.status(201).json({
    msq: "todo ok desde post",
    categoria,
  });
};

const categoriaPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, usuario, ...resto } = req.body;

  resto.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, resto, {
    new: true,
  }).populate("usuario", "nombre");

  res.json({
    msq: "todo ok desde put",
    categoria,
  });
};
const categoriaDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }
  ).populate("usuario", "nombre");

  res.status(200).json({
    msq: "todo ok desde delete",
    categoria,
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
  categoriaPath,
};
