const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos, validarJWT, validarRol } = require("../middlewares");

const router = Router();

router.get("/", (res, req) => {});

router.get("/:id", (res, req) => {});
router.post("/", (res, req) => {});
router.put("/", (res, req) => {});

router.delete("/", (res, req) => {});
