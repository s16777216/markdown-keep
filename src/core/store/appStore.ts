import { defineStore } from 'pinia';
import { ref } from 'vue';

export type View = 'notes' | 'archive' | 'trash';

export const useAppStore = defineStore('appStore', () => {
  const currentView = ref<View>('notes');
  const searchQuery = ref('');
  const editingNoteId = ref<string | null>(null);
  const isSidebarOpen = ref(true);

  function setView(view: View) {
    currentView.value = view;
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  function openNoteEditor(noteId: string) {
    editingNoteId.value = noteId;
  }

  function closeNoteEditor() {
    editingNoteId.value = null;
  }

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  return {
    currentView,
    searchQuery,
    editingNoteId,
    isSidebarOpen,
    setView,
    setSearchQuery,
    openNoteEditor,
    closeNoteEditor,
    toggleSidebar,
  };
});
