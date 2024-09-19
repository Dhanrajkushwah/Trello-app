const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }, // Reference the board
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }] // Reference cards if any
});

module.exports = mongoose.model('List', ListSchema);
