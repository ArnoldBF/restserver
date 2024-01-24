const express = require("express"); // importamos express
const cors = require("cors"); // importamos cors

class Server {
  constructor() {
    this.app = express(); //creamos una instancia de express
    this.port = process.env.PORT; //process.env.PORT: variable de entorno
    this.usuariosPath = "/api/usuarios"; // Path: models/server.js que hace referencia a usuarios de la carpeat routes

    //Middlewares
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
