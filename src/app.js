const express = require('express');
const handlers = require('./libs/command-handler/commandHandlers').handlers;
const app = express();
app.use(express.json());


app.post('/api/v1/user/', async(req, res) => {
  if(!req.body.command.name) {
    res.status(500);
    res.send('Error: request body must contain command object with name property');
    return
  }
  const commandHandlerObject = handlers.find((functionObject) => Object.keys(functionObject)[0] == req.body.command.name);
  if(!commandHandlerObject) {
    res.status(500);
    res.send('Error: unknown command ' + req.body.command.name);
    return;
  }
  const commandHandler = Object.values(commandHandlerObject)[0];
  const command = {
    userID: req.body.userID,
    payload: req.body.command.payload,
  }

  try{
    await commandHandler(command);
    res.status(201);
    res.send('Command executed');
  } catch(err) {
    res.sendStatus(500);
    console.log(err);
  }
});

module.exports = app;