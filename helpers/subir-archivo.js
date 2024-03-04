const path = require('path');

const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'pdf'], carpeta = '') => {
	return new Promise((resolve, reject) => {
		if (!files || !files.archivo) {
			// eslint-disable-next-line prefer-promise-reject-errors
			return reject('no se ha cargado ningun archivo');
		}
		const { archivo } = files;

		const nombreCortado = archivo.name.split('.');
		const extension = nombreCortado[nombreCortado.length - 1];
		/** 
	const uniondeNombre = nombreCortado.reduce((a, b) => {
		return a + '_' + b;
	});
	*/

		// validar extensiones

		if (!extensionesValidas.includes(extension)) {
			// eslint-disable-next-line prefer-promise-reject-errors
			return reject(`La extension ${extension} no es permitida, solo se permite las siguienes extensiones ${extensionesValidas}`);
		}

		const nombreTemp = uuidv4() + '.' + extension;

		const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

		archivo.mv(uploadPath, (err) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			resolve(nombreTemp);
		});
	});
};

module.exports = {
	subirArchivo,
};
