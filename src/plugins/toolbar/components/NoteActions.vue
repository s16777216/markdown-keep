<template>
  <div class="flex items-center space-x-2">
    <button @click.stop="togglePin" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
      <PinIcon :class="{'fill-current': isPinned}" class="w-5 h-5" />
    </button>
    <button @click.stop="toggleArchive" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
      <ArchiveIcon class="w-5 h-5" />
    </button>
    <div class="relative">
      <button @click.stop="showColorPicker = !showColorPicker" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
        <PaletteIcon class="w-5 h-5" />
      </button>
      <div v-if="showColorPicker" class="absolute z-10 bottom-full mb-2 right-0">
        <ColorPicker @color-selected="onColorSelected" />
      </div>
    </div>
    <button @click.stop="deleteNote" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
      <Trash2Icon class="w-5 h-5 text-red-500" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNoteStore } from '@/core/store/noteStore';
import ColorPicker from './ColorPicker.vue';
import { PinIcon, ArchiveIcon, PaletteIcon, Trash2Icon } from 'lucide-vue-next';

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
