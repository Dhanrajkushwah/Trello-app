const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }] // Reference to lists in the board
});

module.exports = mongoose.model('Board', BoardSchema);
