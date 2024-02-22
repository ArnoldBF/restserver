const { Router } = require("express");
//const { response, request } = require("express"); // importamos response de express

const { check } = require("express-validator");

const { validarCampos, validarJWT } = require("../middlewares");
const {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
    categoriaGetPorId,
} = require("../controllers/categoriesController");

const { categoriaExist } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 *
 */

//Obtener todas las categorias - sera de uso publico
router.get("/", categoriaGet);

//Obtener una categoria por id
router.get("/:id", [
    check('id', 'No es id valido de mongo').isMongoId(),
    check('id').custom(categoriaExist),
    validarCampos
], categoriaGetPorId);

//Crear una categoria-privado- solo usuarios con accesos
router.post(
    "/",
    [
        validarJWT,
        check("nombre", "Nombre es obligatorio").not().isEmpty(),
        check("descripcion", "Descripcion es obligatoria").not().isEmpty(),
        validarCampos,
    ],
    categoriaPost
);

//actualizar una categoria por id-privado- solo usuarios con acceso
router.put("/:id", categoriaPut);

//Eleminar una categoria por id-privado solo para  ADMIN_ROLE
router.delete("/:id", categoriaDelete);

module.exports = router;