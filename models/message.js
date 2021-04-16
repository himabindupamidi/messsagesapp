const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender_username: {
      type: String,
      required: [true, 'required field'],
    },
    recipient_username: {
      type: String,
      required: [true, 'required field'],
    },
    message_contents: {
      type: String,
      required: [true, 'required field'],
    },
  },
  {
    timestamp: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model('Message', messageSchema);
