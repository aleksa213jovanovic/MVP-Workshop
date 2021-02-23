const express = require('express');
const handlers = require('../libs/command-handler/commandHandlers').handlers;
const queryHandler = require('../libs/query-handler/queryHandler').queryHandler;
const router = express();
const errorHandler = require('./error-middleware');
router.use(express.json());

const viewdb = require('../libs/event-store/view-db');

router.get('/api/v1/user/:userId/get-ssn', async (req, res, next) => {

  const { userId } = req.params;
  try {
    const userSsn = await queryHandler({userId: userId.toString()});
    res.status(200);
    if(userSsn == undefined) {
      res.send('User does not have ssn')
    }
    res.send(userSsn);
  }
  catch (err) {
    next(err);
  }
});

router.post('/api/v1/user/', async (req, res, next) => {
  if (!req.body.command.name) {
    res.status(500);
    res.send('Error: request body must contain command object with name property');
    return
  }
  const commandHandlerObject = handlers.find((functionObject) => Object.keys(functionObject)[0] == req.body.command.name);
  if (!commandHandlerObject) {
    res.status(500);
    res.send('Error: unknown command ' + req.body.command.name);
    return;
  }
  const commandHandler = Object.values(commandHandlerObject)[0];
  const command = {
    userId: req.body.userId,
    payload: req.body.command.payload,
  }

  try {
    await commandHandler(command);
    res.status(201);
    res.send('Command executed');
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler)

module.exports = router;