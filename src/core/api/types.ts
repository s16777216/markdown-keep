// Core Interfaces
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
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Slot = 'toolbar' | 'editor' | 'sidebar' | 'header';

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
