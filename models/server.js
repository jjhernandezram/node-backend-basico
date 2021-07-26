const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;
    this.paths = {
      authPath: '/api/auth',
      usersPath: '/api/users',
      categoriesPath: '/api/categories',
      productsPath: '/api/products',
      searchPath: '/api/search',
      uploadPath: '/api/upload',
    };

    // conectar a base de datos en mongo
    this.conectarDB();

    // middlewares
    this.middlewares();

    // cargar rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // lectura y parseo del req.body
    this.app.use(express.json());

    // directorio publico estatico
    this.app.use(express.static('public'));

    // carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.authPath, require('../routes/auth.routes'));
    this.app.use(this.paths.usersPath, require('../routes/users.routes'));
    this.app.use(this.paths.categoriesPath, require('../routes/categories.routes'));
    this.app.use(this.paths.productsPath, require('../routes/products.routes'));
    this.app.use(this.paths.searchPath, require('../routes/search.routes'));
    this.app.use(this.paths.uploadPath, require('../routes/upload.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando desde http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
