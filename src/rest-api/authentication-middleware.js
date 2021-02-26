const admin = require('firebase-admin');
const serviceAcc = require('../../mvp-workshop-b0570-firebase-adminsdk-p4ou8-71199377b0.json');
const ClientError = require('./client-error');
const firebase = require('firebase');

class AuthMiddleware {
  constructor(serviceAcc) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAcc,
        ),
         databaseURL: "https://mvp-workshop-b0570-default-rtdb.europe-west1.firebasedatabase.app",
      });
    }
    firebase.initializeApp({apiKey: 'AIzaSyDNMPscquP3QJSj0JXx1hOmTfpNmQ_XHe4',
    databaseURL: "https://mvp-workshop-b0570-default-rtdb.europe-west1.firebasedatabase.app"});
  }

  async getToken(email, password) {
    try{
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await firebase.auth().currentUser.getIdToken()
    return token;
    }catch(err) {
      throw err;
    }
  }

  async deleteAcc(userId) {
    try{
      await admin.auth().deleteUser(userId)
    }catch(err) {
      throw err;
    }
  }

  async createAcc(email, password) {
    try {
      const user = await admin.auth().createUser({
        email: email,
        password: password
      })
      return user;
    } catch (err) {
      throw err;
    }
  }

  async authorize(req, res, next) {
    if(req.path=='/api/v1/user/' && req.method == 'POST' && req.body.command.name == 'UserAdd') {
      const newUser = await this.createAcc(req.body.command.payload.email, req.body.command.payload.password)
      res.locals.userId = newUser.uid;
      next()
      return
    }
    if(req.path.startsWith('/sign-in/') && req.method == 'GET') {
      next();
      return
    }
    try {
      const decodedToken = await this.decodeIDToken(req);
      res.locals.userId = decodedToken.firebaseUid;
      next();
    } catch (err) {
      next(err);
    }
  }

  async decodeIDToken(req) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return this._parseToken(decodedToken);
      } catch (err) {
        throw err;
      }
    }
    throw new ClientError('Error: bad authorization', 400, 'Client error: bad authorization');
  }


  _parseToken(token) {
    const {
      user_id: userId,
      name: username,
      email,
    } = token;
    return {
      email, firebaseUid: userId, username,
    };
  }
}

module.exports = new AuthMiddleware(serviceAcc);