const { Router } = require("express"); //importamos solo el Router de express
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/userController");
const { check } = require("express-validator"); // importamos check de express-validator
const { validarCampos } = require("../middlewares/validar-campos"); // importamos validarCampos de validar-campos.js
const { roleValido, emailExist } = require("../helpers/db-validators");
const router = Router(); //creamos una instancia de Router

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExist),
    check("password", "El password debe tener minimo 8 letras").isLength({
      min: 8,
    }), // islength recibe un objeto con la cantidad minima de letras
    check("rol").custom(roleValido), // custom recibe una funcion que recibe el valor del campo y debe retornar true si es valido o un error si no lo es
    validarCampos, // ejecutamos el middleware de validarCampos
  ],
  usuariosPost
); // se ejecuta el middleware de express-validator para validar los campos
router.delete("/", usuariosDelete);
router.patch("/", usuariosPatch);

module.exports = router; //exportamos el router
