const { Router } = require("express"); //importamos solo el Router de express
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/userController");

const router = Router(); //creamos una instancia de Router

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.delete("/", usuariosDelete);
router.patch("/", usuariosPatch);

module.exports = router; //exportamos el router
