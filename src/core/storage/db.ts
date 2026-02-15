import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Note } from '@/core/api/types';

interface MarkdownKeepDB extends DBSchema {
  notes: {
    key: string;
    value: Note;
    indexes: {
      updatedAt: number;
      isPinned: number;
      isArchived: number;
      isDeleted: number;
    };
  };
  settings: {
    key: string;
    value: any;
  };
}

const DB_NAME = 'markdown-keep-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<MarkdownKeepDB>> | null = null;

const getDb = (): Promise<IDBPDatabase<MarkdownKeepDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<MarkdownKeepDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('notes')) {
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
          noteStore.createIndex('updatedAt', 'updatedAt');
          noteStore.createIndex('isPinned', 'isPinned');
          noteStore.createIndex('isArchived', 'isArchived');
          noteStore.createIndex('isDeleted', 'isDeleted');
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      },
    });
  }
  return dbPromise;
};

export const NoteStorage = {
  async getAll(): Promise<Note[]> {
    const db = await getDb();
    return db.getAllFromIndex('notes', 'updatedAt');
  },
  async get(id: string): Promise<Note | undefined> {
    const db = await getDb();
    return db.get('notes', id);
  },
  async put(note: Note): Promise<string> {
    const db = await getDb();
    return db.put('notes', note);
  },
  async delete(id: string): Promise<void> {
    const db = await getDb();
    return db.delete('notes', id);
  },
};

export const SettingsStorage = {
  async get(key: string): Promise<any> {
    const db = await getDb();
    const result = await db.get('settings', key);
    return result?.value;
  },
  async set(key: string, value: any): Promise<string> {
    const db = await getDb();
    return db.put('settings', { key, value });
  }
}
