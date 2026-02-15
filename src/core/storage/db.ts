import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Note, Label, StoredImage } from '@/core/api/types';

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
  labels: {
    key: string;
    value: Label;
  };
  images: {
    key: string;
    value: StoredImage;
  };
}

const DB_NAME = 'markdown-keep-db';
const DB_VERSION = 2;

let dbPromise: Promise<IDBPDatabase<MarkdownKeepDB>> | null = null;

const getDb = (): Promise<IDBPDatabase<MarkdownKeepDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<MarkdownKeepDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
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
        // Version 2 upgrades: Labels and Images
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains('labels')) {
            db.createObjectStore('labels', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('images')) {
            db.createObjectStore('images', { keyPath: 'id' });
          }
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
    // Ensure array fields exist for old notes
    note.labelIds = note.labelIds || [];
    return db.put('notes', note);
  },
  async delete(id: string): Promise<void> {
    const db = await getDb();
    return db.delete('notes', id);
  },
};

export const LabelStorage = {
  async getAll(): Promise<Label[]> {
    const db = await getDb();
    return db.getAll('labels');
  },
  async put(label: Label): Promise<string> {
    const db = await getDb();
    return db.put('labels', label);
  },
  async delete(id: string): Promise<void> {
    const db = await getDb();
    return db.delete('labels', id);
  },
};

export const ImageStorage = {
  async get(id: string): Promise<StoredImage | undefined> {
    const db = await getDb();
    return db.get('images', id);
  },
  async put(image: StoredImage): Promise<string> {
    const db = await getDb();
    return db.put('images', image);
  },
  async delete(id: string): Promise<void> {
    const db = await getDb();
    return db.delete('images', id);
  }
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
