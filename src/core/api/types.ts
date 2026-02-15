export type ID = string;
export type Timestamp = number;

export interface Note {
  id: ID;
  title: string;
  content: string; // Markdown
  color: string; // Tailwind class or hex
  isPinned: boolean;
  isArchived: boolean;
  isDeleted: boolean; // Soft delete
  labelIds?: string[]; // Changed from tags to labelIds
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Label {
  id: ID;
  name: string;
  color?: string; // Optional color for the label itself
}

export interface StoredImage {
  id: ID;
  blob: Blob; // Store image data directly
  // Potentially other metadata like filename, type, etc.
}

export type Slot = 'toolbar' | 'editor' | 'sidebar' | 'header';

// Plugin API
export interface PluginContext {
  store: any; // NoteStore, LabelStore etc.
  registerComponent(slot: Slot, component: any): void; // UI Injection
  on(event: string, callback: Function): void; // Event Bus
}

export interface Plugin {
  id: string;
  name: string;
  install(context: PluginContext): void;
}


export interface Label {
  id: ID;
  name: string;
}

export interface StoredImage {
  id: ID;
  blob: Blob;
  createdAt: Timestamp;
}

// Plugin API
export interface PluginContext {
  store: any; // NoteStore
  registerComponent(slot: Slot, component: any): void; // UI Injection
  on(event: string, callback: Function): void; // Event Bus
}

export interface Plugin {
  id: string;
  name: string;
  install(context: PluginContext): void;
}
