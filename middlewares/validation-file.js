const { request, response } = require('express');

const fileValidation = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: `No hay archivos en la petición.` });
    return;
  }
  next();
};

module.exports = { fileValidation };
