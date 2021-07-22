const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la categoria es obligatorio.'],
    unique: true,
  },

  status: {
    type: Boolean,
    default: true,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Category', categorySchema);
