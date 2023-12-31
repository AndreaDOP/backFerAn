const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const contactoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Contacto', contactoSchema);
