const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

class EventStoreDB {
  constructor(IPFS, OrbitDB) {
    this.IPFS = IPFS;
    this.OrbitDB = OrbitDB;
    this.node = null;
    this.orbitdb = null;
    this.eventStoreDB = null;
  }

  async init() {
    try {
      const nodeConfig = {
        relay: { enabled: true, hop: { enabled: true, active: true } },
        repo: './ipfs_es',
        Pubsub: { Enabled: true },
      }
      this.node = await this.IPFS.create(nodeConfig);

      this.orbitdb = await this.OrbitDB.createInstance(this.node, { directory: './orbitdb_es' })
      const defaultOptions = { accessController: { write: [this.orbitdb.id] } };
      this.eventStoreDB = await this.orbitdb.eventlog('event_store')
      await this.eventStoreDB.load();
    } catch (err) {
      throw err;
    }
  }

  async appendEventList(events) {
    try {
      events.forEach(async (event) => {
        try {
          await this.eventStoreDB.add(event);
        } catch (err) {
          throw err;
        }
      });
    } catch (err) {
      throw err;
    }

  }

  async getAllEvents() {
    try {
      const allEvents = await this.eventStoreDB.iterator({ limit: -1 }).collect();
      return allEvents.map((e) => e.payload.value);
    } catch (err) {
      throw err;
    }
  }

  async getEventsByUserID(userId) {
    try {
      const allEvents = await this.getAllEvents();
      const userEvents = allEvents.filter((event) => event.userId == userId)
      return userEvents;
    } catch (err) {
      throw err;
    }
  }
}

//TODO this.event.on error ready
module.exports = new EventStoreDB(IPFS, OrbitDB);
