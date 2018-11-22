const mongoose = require('mongoose');
const {Schema} = mongoose;

const SaleSchema = new Schema({
  producto_id: { type: Number, required: true},
  //fecha: { type: Date, required: true},
  fecha: { type: Date, required: true, default: Date.now},
  venta: { type: Number, required: true},
  valor: { type: Number, required: true},
});

module.exports = mongoose.model('Sale', SaleSchema);