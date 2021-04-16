const express = require('express');

const messageController = require('../controllers/message');
//const message = require('../models/message');

const router = express.Router();

// const errors = validationResults(req);

router.post('/', async (req, res) => {
  const sender_username = req.body.sender_username;
  const recipient_username = req.body.recipient_username;
  const message_contents = req.body.message_contents;
  try {
    const message = await messageController.addMessage(
      sender_username,
      recipient_username,
      message_contents
    );
    res.status(200).send({ message });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const messageid = req.params.id;
    const message_contents = req.body.message_contents;
    const message = await messageController.updateMessage(
      messageid,
      message_contents
    );
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/user/:user', async (req, res) => {
  try {
    // const sessUser = req.session.user;
    // console.log({ sessUser });
    const user = req.params.user;
    const messages = await messageController.listUserMessages(user);
    return res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/receiver/:receiver', async (req, res) => {
  try {
    const receiver = req.params.receiver;
    const messages = await messageController.listReceiverMessages(receiver);
    return res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    const messages = await messageController.getMessage(id);
    return res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await messageController.deleteMessage(id);
    return res.status(200).send('deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/delete/:user', async (req, res) => {
  try {
    const user = req.params.user;
    await messageController.deleteUserMessgges(user);
    return res.status(200).send('user messages deleted');
  } catch (error) {
    res.status(400).send(error.messaage);
  }
});

module.exports = router;
