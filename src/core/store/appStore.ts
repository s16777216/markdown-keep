import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { applyTheme } from '@/core/theme/themeManager';

export type View = 'notes' | 'archive' | 'trash' | `label:${string}` | 'manage-labels';

export const useAppStore = defineStore('appStore', () => {
  const currentView = ref<View>('notes');
  const searchQuery = ref('');
  const editingNoteId = ref<string | null>(null);
  const isSidebarOpen = ref(true);
  const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const themeColor = ref('#FBC02D'); // Default Google Keep Yellow

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

  function toggleTheme() {
    isDark.value = !isDark.value;
    updateTheme();
  }

  function setThemeColor(color: string) {
    themeColor.value = color;
    updateTheme();
  }

  function updateTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    applyTheme(themeColor.value, isDark.value);
  }

  // Initialize theme
  updateTheme();

  return {
    currentView,
    searchQuery,
    editingNoteId,
    isSidebarOpen,
    isDark,
    themeColor,
    setView,
    setSearchQuery,
    openNoteEditor,
    closeNoteEditor,
    toggleSidebar,
    toggleTheme,
    setThemeColor,
  };
});
