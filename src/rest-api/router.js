const express = require('express');
const handlers = require('../libs/command-handler/commandHandlers').handlers;
const queryHandler = require('../libs/query-handler/queryHandler').queryHandler;
const router = express();
const errorHandler = require('./error-middleware');
const ClientError = require('./client-error');
const authMiddleware = require('./authentication-middleware');

router.use(express.json());
router.use(authMiddleware.authorize.bind(authMiddleware));

router.post('/api/v1/user/', async (req, res, next) => {
  if (!req.body.command.name) {
    next(new ClientError('Error: request body must contain command object with name property', 500, 'Client error: request body must contain command object with name property'))
    return;
  }
  const commandHandlerObject = handlers.find((functionObject) => Object.keys(functionObject)[0] == req.body.command.name);
  if (!commandHandlerObject) {
    next(new ClientError('Error: unknown command ' + req.body.command.name, 500, 'Client error: unknown command ' + req.body.command.name))
    return;
  }
  const commandHandler = Object.values(commandHandlerObject)[0];
  const command = {
    userId: res.locals.userId,
    payload: req.body.command.payload,
  }

  try {
    await commandHandler(command);
    res.status(201);
    res.send('Command executed');
  } catch (err) {
    if(req.body.command.name == 'UserAdd') {
      await authMiddleware.deleteAcc(res.locals.userId)
    }
    next(err);
  }
});

router.post('/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const token = await authMiddleware.getToken(email, password)
    res.status(200);
    res.send(token);
  } catch (err) {
    next(err);
  }
})

router.get('/api/v1/user/get-ssn', async (req, res, next) => {

  const { userId } = res.locals;
  try {
    const userSsn = await queryHandler({ userId: userId.toString() });
    res.status(200);
    if (userSsn == undefined) {
      res.send('User does not have ssn')
    }
    res.send(userSsn);
  }
  catch (err) {
    next(err);
  }
});

router.all('*', () => {
  next(new ClientError('Error: unknown route', 400, 'Client error: unknown route'));
  return;
})

router.use(errorHandler)

module.exports = router;