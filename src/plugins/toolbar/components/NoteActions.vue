<template>
  <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    <button 
      @click.stop="togglePin" 
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
      :title="isPinned ? 'Unpin' : 'Pin'"
    >
      <span class="material-symbols-rounded text-gray-600 dark:text-gray-300 text-[20px]" :class="{'fill-current': isPinned}">push_pin</span>
    </button>
    <button 
      @click.stop="toggleArchive" 
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
      title="Archive"
    >
      <span class="material-symbols-rounded text-gray-600 dark:text-gray-300 text-[20px]">archive</span>
    </button>
    <div class="relative">
      <button 
        @click.stop="showColorPicker = !showColorPicker" 
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
        title="Background options"
      >
        <span class="material-symbols-rounded text-gray-600 dark:text-gray-300 text-[20px]">palette</span>
      </button>
      <div v-if="showColorPicker" class="absolute z-10 bottom-full mb-2 right-0">
        <ColorPicker @color-selected="onColorSelected" />
      </div>
    </div>
    <button 
      @click.stop="deleteNote" 
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
      title="Delete"
    >
      <span class="material-symbols-rounded text-gray-600 dark:text-gray-300 text-[20px]">delete</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNoteStore } from '@/core/store/noteStore';
import ColorPicker from './ColorPicker.vue';

const props = defineProps<{ noteId: string }>();

const noteStore = useNoteStore();
const showColorPicker = ref(false);

const note = computed(() => noteStore.notes.find(n => n.id === props.noteId));
const isPinned = computed(() => note.value?.isPinned || false);

const togglePin = () => noteStore.togglePin(props.noteId);
const toggleArchive = () => noteStore.toggleArchive(props.noteId);
const deleteNote = () => noteStore.deleteNote(props.noteId);
const onColorSelected = (color: string) => {
  noteStore.updateColor(props.noteId, color);
  showColorPicker.value = false;
};
</script>
