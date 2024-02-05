const {validationResult}=require('express-validator');// importamos validationResult de express-validator


const validarCampos=(req, res,next)=>{
    const errors=validationResult(req);// obtenemos los errores de la validacion y los guardamos en la constante errors

    if(!errors.isEmpty()){
      return res.status(400).json(errors);// si hay errores retornamos un status 400 y los errores
    }

    next();// si no hay errores llamamos al siguiente middleware
}

module.exports={
    validarCampos
}