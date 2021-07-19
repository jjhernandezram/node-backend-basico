const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;
    this.authPath = '/api/auth';
    this.usersPath = '/api/users';

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
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usersPath, require('../routes/users.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando desde http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
