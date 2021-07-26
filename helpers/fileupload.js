const { v4: uuid } = require('uuid');
const path = require('path');

const fileUploading = (files, extensions = ['jpg', 'jpeg', 'png', 'gif'], folder = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split('.');
    const ext = splitName[splitName.length - 1];
    const fileName = `${uuid()}.${ext}`;

    if (!extensions.includes(ext)) {
      return reject(`La extensión ${ext} no esta permitida, se permiten archivos: ${extensions}`);
    }

    const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(fileName);
    });
  });
};

module.exports = { fileUploading };
