const mongoose = require('mongoose');

const { validationResults } = require('express-validator');

const Message = require('../models/message');
const User = require('../models/user');

const addMessage = async (
  sender_username,
  recipient_username,
  message_contents
) => {
  const sender = await User.findOne({ username: sender_username });
  const recipient = await User.findOne({ username: recipient_username });
  if (!sender && !recipient)
    throw new Error('User and Recever are not registered');
  if (!sender) throw new Error('User is not registered');
  if (!recipient) throw new Error('Recever is not registered');

  const message = new Message({
    sender_username: sender_username,
    recipient_username: recipient_username,
    message_contents: message_contents,
  });
  await message.save();
  return message;
};

const listUserMessages = async (user) => {
  const messages = await Message.find({ sender_username: user });
  return messages;
};

const listReceiverMessages = async (receiver) => {
  const messages = await Message.find({ recipient_username: receiver });
  return messages;
};

const getMessage = async (id) => {
  const message = await Message.findById(id);
  return message;
};

const deleteMessage = async (id) => {
  const message = await Message.findByIdAndDelete(id);
  return message;
};

const updateMessage = async (messageid, message_contents) => {
  const message = await Message.findById(messageid);
  message.message_contents = message_contents;
  // const message = await Message.findByIdAndUpdate(
  //   { _id: messageid },
  //   { message_contents: message_contents }
  // );

  const updatedMessage = await message.save();
  return updatedMessage;
};

const deleteUserMessgges = async (user) => {
  //const message = await Message.findOneAndDelete(user);
  const message = await Message.deleteMany({ sender_username: user });
  return message;
};
module.exports = {
  addMessage,
  listUserMessages,
  listReceiverMessages,
  getMessage,
  deleteMessage,
  deleteUserMessgges,
  updateMessage,
};
