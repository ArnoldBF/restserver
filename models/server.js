const express = require('express'); // importamos express
const cors = require('cors'); // importamos cors
const { dbConnection } = require('../database/config'); // importamos la conexion a la base de datos

const fileUpload = require('express-fileupload');

class Server {
	constructor() {
		this.app = express(); // creamos una instancia de express
		this.port = process.env.PORT; // process.env.PORT: variable de entorno
		// Path: models/server.js que hace referencia a usuarios de la carpeat routes

		this.paths = {
			buscar: '/api/buscar',
			auth: '/api/auth',
			usuarios: '/api/usuarios',
			categorias: '/api/categorias',
			productos: '/api/productos',
			cargarArchivos: '/api/cargas',
		};
		// Concectar a base de datos
		this.conectarDB();
		// Middlewares
		this.middlewares();
		// Rutas de mi aplicacion
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		// CORS
		this.app.use(cors());
		// Lectura y parseo del body
		this.app.use(express.json());
		// Directorio publico
		this.app.use(express.static('public'));
		// Fileuploads -cargar de archivos
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				createParentPath: true,
			}),
		);
	}

	routes() {
		this.app.use(this.paths.auth, require('../routes/auth'));
		this.app.use(this.paths.usuarios, require('../routes/user'));
		this.app.use(this.paths.categorias, require('../routes/categories'));
		this.app.use(this.paths.productos, require('../routes/products'));
		this.app.use(this.paths.buscar, require('../routes/searchs'));
		this.app.use(this.paths.cargarArchivos, require('../routes/uploads'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}

module.exports = Server;
