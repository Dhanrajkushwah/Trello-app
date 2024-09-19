const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true } // Reference the list it belongs to
});

module.exports = mongoose.model('Card', CardSchema);
