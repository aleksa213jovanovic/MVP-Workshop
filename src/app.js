const express = require('express');
const handlers = require('./libs/command-handler/commandHandlers').handlers;
const app = express();
app.use(express.json());


const userRepo = require('./libs/repository');
const eventTypes = require('./libs/domain-model/eventTypes').eventTypes
app.post('/test/save', async (req, res) => {
  const event1 = eventTypes[0];
  event1.name = "micko"
  event1.email = "@gmail"
  event1.userId = '1'

  const event2 = eventTypes[0];
  event2.name = "asd"
  event2.email = "@gmail"

  events = [{eventData: event1},{eventData: event2}]
  const user = {
    id: "100",
    name: 'micko',
    ssn: 'qweqwe'
  }
  try {
    await userRepo.save(events, user);
  } catch (err) {
    console.log(err);
  }
  const allEvents = await userRepo.getByID('1');
  res.send(allEvents);
});


app.post('/api/v1/user/', async (req, res) => {
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
    res.sendStatus(500);
    console.log(err);
  }
});

module.exports = app;