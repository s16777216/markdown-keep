<template>
  <div>
    <TransitionGroup tag="div" name="list" class="column-container">
      <NoteCard 
        v-for="note in displayedNotes" 
        :key="note.id"
        :note="note"
        class="mb-4 group"
      />
    </TransitionGroup>
    <div v-if="displayedNotes.length === 0 && !noteStore.isLoading" class="text-center text-gray-500 mt-8">
      <p>{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useNoteStore } from '@/core/store/noteStore';
import { useAppStore } from '@/core/store/appStore';
import NoteCard from './NoteCard.vue';

const noteStore = useNoteStore();
const appStore = useAppStore();

const displayedNotes = computed(() => {
  switch (appStore.currentView) {
    case 'notes':
      return noteStore.activeNotes;
    case 'archive':
      return noteStore.archivedNotes;
    case 'trash':
      return noteStore.deletedNotes;
    default:
      return [];
  }
});

const emptyMessage = computed(() => {
  switch (appStore.currentView) {
    case 'notes':
      return 'No active notes. Create one to get started!';
    case 'archive':
      return 'Your archived notes will appear here.';
    case 'trash':
      return 'Notes in trash will appear here.';
    default:
      return 'No notes to display.';
  }
});

onMounted(() => {
  noteStore.fetchAllNotes();
});
</script>

<style scoped>
.column-container {
  column-count: 1;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  .column-container {
    column-count: 2;
  }
}

@media (min-width: 1024px) {
  .column-container {
    column-count: 3;
  }
}

@media (min-width: 1280px) {
  .column-container {
    column-count: 4;
  }
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
