const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

class ViewStoreDB {
  constructor(IPFS, OrbitDB) {
    this.IPFS = IPFS;
    this.OrbitDB = OrbitDB;
    this.node = null;
    this.orbitdb = null;
    this.viewStoreDB = null;
  }

  async init() {
    try {
      const nodeConfig = {
        relay: { enabled: true, hop: { enabled: true, active: true } },
        repo: './ipfs_keyvalue',
        Pubsub: { Enabled: true },
      }
      this.node = await this.IPFS.create(nodeConfig);

      this.orbitdb = await this.OrbitDB.createInstance(this.node, { directory: './orbitdb_keyvalue' })
      const defaultOptions = { accessController: { write: [this.orbitdb.id] } };
      this.viewStoreDB = await this.orbitdb.keyvalue('view_db')
      await this.viewStoreDB.load();
    } catch (err) {
      throw err;
    }
  }

  async addNewUser(user) {
    try {
      const hash = await this.viewStoreDB.put(user.id, user);
      return hash;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(user) {
    try {
      const exists = await this.viewStoreDB.get(user.id);
      if (exists == undefined) {
        throw new Error('there is no user to update with user id ' + user.id)
      }
      await this.viewStoreDB.set(user.id, user);
    } catch (err) {
      throw err;
    }
  }

  async getUserById(userId) {
    try {
      return await this.viewStoreDB.get(userId)
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers() {
    try{
      const allUsers = await this.viewStoreDB.all;
      return allUsers;
    }catch(err) {
      throw err;
    }
  }
}

module.exports = new ViewStoreDB(IPFS, OrbitDB);