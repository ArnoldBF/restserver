const { Router } = require("express"); //importamos solo el Router de express
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/userController");
const { check } = require("express-validator");// importamos check de express-validator

const router = Router(); //creamos una instancia de Router

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post("/",[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo','El correo no es valido').isEmail(),
  check('password','El password debe tener minimo 8 letras').isLength({min:8}),// islength recibe un objeto con la cantidad minima de letras
  check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),// isIn recibe un array con los valores validos
], usuariosPost); // se ejecuta el middleware de express-validator para validar los campos
router.delete("/", usuariosDelete);
router.patch("/", usuariosPatch);

module.exports = router; //exportamos el router
