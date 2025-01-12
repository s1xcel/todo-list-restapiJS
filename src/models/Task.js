const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = model('Task', taskSchema);
