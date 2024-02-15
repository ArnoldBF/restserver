/**
 * Este módulo exporta un objeto que contiene los middlewares de validación utilizados en el servidor REST. 
 * haciendo uso de la técnica de desestructuración de objetos de JavaScript y el operador de propagación.
 * 
 * @module middlewares/index
 */
const validarCampos = require("../middlewares/validar-campos"); 
const  validarJWT = require("../middlewares/validar-jwt");
const validarRoles= require("../middlewares/validar-roles");


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}
