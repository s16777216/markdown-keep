<template>
  <div
    v-if="appStore.editingNoteId"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="handleClose"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 prose dark:prose-invert"
      :class="backgroundColorClass"
      @click.stop
    >
      <input
        v-model="editableTitle"
        class="w-full text-lg font-bold bg-transparent focus:outline-none mb-4"
        placeholder="Title"
      />
      <textarea
        v-model="editableContent"
        class="w-full h-64 bg-transparent focus:outline-none resize-none"
        placeholder="Take a note..."
      ></textarea>
      <div class="mt-4 flex justify-end">
        <button @click="handleSave" class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
          Save & Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useAppStore } from '@/core/store/appStore';
import { useNoteStore } from '@/core/store/noteStore';

const appStore = useAppStore();
const noteStore = useNoteStore();

const editableTitle = ref('');
const editableContent = ref('');
const editableColor = ref('white');

const note = computed(() =>
  appStore.editingNoteId
    ? noteStore.notes.find((n) => n.id === appStore.editingNoteId)
    : null
);

watch(note, (newNote) => {
  if (newNote) {
    editableTitle.value = newNote.title;
    editableContent.value = newNote.content;
    editableColor.value = newNote.color;
  }
});

const handleSave = () => {
  if (note.value) {
    noteStore.updateNote(note.value.id, {
      title: editableTitle.value,
      content: editableContent.value,
    });
  }
  appStore.closeNoteEditor();
};

const handleClose = () => {
  appStore.closeNoteEditor();
};

const colorMap: Record<string, string> = {
  white: 'bg-white dark:bg-gray-800',
  red: 'bg-red-200 dark:bg-red-900',
  blue: 'bg-blue-200 dark:bg-blue-900',
  green: 'bg-green-200 dark:bg-green-900',
  yellow: 'bg-yellow-200 dark:bg-yellow-900',
  purple: 'bg-purple-200 dark:bg-purple-900',
};

const backgroundColorClass = computed(() => {
  return colorMap[editableColor.value] || colorMap['white'];
});
</script>
