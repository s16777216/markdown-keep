import { defineStore } from 'pinia';
import { ref, computed, toRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Note } from '@/core/api/types';
import { NoteStorage } from '@/core/storage/db';

import { useAppStore } from './appStore';

export const useNoteStore = defineStore('noteStore', () => {
  const notes = ref<Note[]>([]);
  const isLoading = ref(false);
  const appStore = useAppStore();

  // --- Getters ---
  const activeNotes = computed(() => {
    const filtered = notes.value.filter(n => !n.isArchived && !n.isDeleted);
    
    const query = appStore.searchQuery.toLowerCase();
    const searched = !query 
      ? filtered 
      : filtered.filter(note => 
          note.title.toLowerCase().includes(query) || 
          note.content.toLowerCase().includes(query)
        );

    return searched
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  });

  const archivedNotes = computed(() => 
    notes.value.filter(n => n.isArchived && !n.isDeleted)
  );

  const deletedNotes = computed(() =>
    notes.value.filter(n => n.isDeleted)
  );

  // --- Actions ---
  async function fetchAllNotes() {
    isLoading.value = true;
    try {
      notes.value = await NoteStorage.getAll();
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function createNote(data: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Note | null> {
    const now = Date.now();
    const newNote: Note = {
      id: uuidv4(),
      title: data.title || '',
      content: data.content || '',
      color: data.color || 'white',
      isPinned: data.isPinned || false,
      isArchived: data.isArchived || false,
      isDeleted: false,
      tags: data.tags || [],
      createdAt: now,
      updatedAt: now,
    };
    
    try {
      await NoteStorage.put(newNote);
      notes.value.unshift(newNote);
      return newNote;
    } catch (error) {
      console.error('Failed to create note:', error);
      return null;
    }
  }

  async function updateNote(id: string, changes: Partial<Omit<Note, 'id'>>) {
    const noteIndex = notes.value.findIndex(n => n.id === id);
    if (noteIndex === -1) return;

    // Get the raw, non-reactive object before making changes
    const originalNote = toRaw(notes.value[noteIndex]);

    const updatedNote: Note = { ...originalNote, ...changes, updatedAt: Date.now() };
    
    try {
      // Now we are sure we are putting a plain object
      await NoteStorage.put(updatedNote);
      notes.value[noteIndex] = updatedNote;
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  }

  async function deleteNote(id: string) {
    await updateNote(id, { isDeleted: true });
  }

  async function restoreNote(id: string) {
    await updateNote(id, { isDeleted: false });
  }

  async function togglePin(id: string) {
    const note = notes.value.find(n => n.id === id);
    if (!note) return;
    await updateNote(id, { isPinned: !note.isPinned });
  }

  async function toggleArchive(id: string) {
    const note = notes.value.find(n => n.id === id);
    if (!note) return;
    await updateNote(id, { isArchived: !note.isArchived });
  }

  async function updateColor(id: string, color: string) {
    await updateNote(id, { color });
  }

  async function permanentDeleteNote(id: string) {
    try {
      await NoteStorage.delete(id);
      notes.value = notes.value.filter(n => n.id !== id);
    } catch (error) {
      console.error('Failed to permanently delete note:', error);
    }
  }

  return {
    notes,
    isLoading,
    activeNotes,
    archivedNotes,
    deletedNotes,
    fetchAllNotes,
    createNote,
    updateNote,
    deleteNote,
    restoreNote,
    togglePin,
    toggleArchive,
    updateColor,
    permanentDeleteNote,
  };
});
