import KeyValueDatabase from "./kv";

const db = new KeyValueDatabase("./mails.sqlite");

db.startCleanupInterval();
export default db;
