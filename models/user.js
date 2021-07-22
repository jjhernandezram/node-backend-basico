const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
  },

  email: {
    type: String,
    required: [true, 'El correo es obligatorio.'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria.'],
  },

  img: {
    type: String,
  },

  role: {
    type: String,
    default: 'USER_ROLE',
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.udi = _id;
  return user;
};

module.exports = model('User', userSchema);
