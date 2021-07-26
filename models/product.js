const { Schema, model } = require('mongoose');

const productSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio.'],
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

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  price: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
    require: true,
  },

  aviable: {
    type: Boolean,
    default: true,
    require: true,
  },

  img: {
    type: String,
  },
});

productSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model('Product', productSchema);
