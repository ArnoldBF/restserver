const { Router } = require("express");
//const { response, request } = require("express"); // importamos response de express

const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { categoriaGet, categoriaPost, categoriaPut, categoriaDelete, categoriaGetPorId } = require("../controllers/categoriesController");

const router = Router();

/**
 * {{url}}/api/categorias
 *
 */

//Obtener todas las categorias - sera de uso publico
router.get("/",categoriaGet);

//Obtener una categoria por id
router.get("/:id",categoriaGetPorId);

//Crear una categoria-privado- solo usuarios con accesos
router.post("/", categoriaPost);

//actualizar una categoria por id-privado- solo usuarios con acceso
router.put("/:id", categoriaPut);

//Eleminar una categoria por id-privado- ADMIN
router.delete("/:id",categoriaDelete);






module.exports = router;

