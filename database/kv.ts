import sqlite3 from "sqlite3";
import { EmailData } from "@/lib/types";

export default class KeyValueDatabase {
  private db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath);
    this.initDatabase();
  }

  private initDatabase(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS KeyValue (
        key TEXT PRIMARY KEY,
        value TEXT,
        expire_at INTEGER
      )
    `);
  }

  public startCleanupInterval(): void {
    // Run cleanup every hour
    setInterval(this.cleanup.bind(this), 3600000);
  }

  private async cleanup(): Promise<void> {
    const currentTime = Date.now();
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        DELETE FROM KeyValue WHERE expire_at < ?
      `,
        [currentTime],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public async set(
    key: string,
    values: EmailData[],
    expiresInMs?: number
  ): Promise<void> {
    const expireAt = expiresInMs ? Date.now() + expiresInMs : null;
    const oldData = await this.get(key);
    let newData: EmailData[];
    if (oldData) {
      newData = [...oldData, ...values];
    } else {
      newData = values;
    }
    const jsonValue = JSON.stringify(newData); // Convert object to JSON string
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        INSERT OR REPLACE INTO KeyValue (key, value, expire_at) VALUES (?, ?, ?)
      `,
        [key, jsonValue, expireAt],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public async get(key: string): Promise<EmailData[] | null> {
    return new Promise<EmailData[] | null>((resolve, reject) => {
      this.db.get(
        `
        SELECT value FROM KeyValue WHERE key = ?
      `,
        [key],
        (err, row: { value: string }) => {
          if (err) {
            reject(err);
          } else {
            const jsonValue = row ? row.value : null;
            resolve(jsonValue ? JSON.parse(jsonValue) : null); // Parse JSON string to object
          }
        }
      );
    });
  }

  public async del(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
        DELETE FROM KeyValue WHERE key = ?
      `,
        [key],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}
