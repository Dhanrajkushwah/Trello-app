const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  lastActive: Date,
});

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [memberSchema],
  maxMembers: { type: Number, default: 10 },
  inviteLink: { type: String },
});

module.exports = mongoose.model('Workspace', workspaceSchema);
