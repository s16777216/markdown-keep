<template>
  <nav class="flex flex-col space-y-2">
    <a
      href="#"
      class="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300"
      :class="{ 'bg-blue-100 dark:bg-blue-900': appStore.currentView === 'notes' }"
      @click.prevent="appStore.setView('notes')"
    >
      <LightbulbIcon class="w-5 h-5 mr-3" />
      <span>Notes</span>
    </a>
    <a
      href="#"
      class="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300"
      :class="{ 'bg-blue-100 dark:bg-blue-900': appStore.currentView === 'archive' }"
      @click.prevent="appStore.setView('archive')"
    >
      <ArchiveIcon class="w-5 h-5 mr-3" />
      <span>Archive</span>
    </a>
     <a
      href="#"
      class="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300"
      :class="{ 'bg-blue-100 dark:bg-blue-900': appStore.currentView === 'trash' }"
      @click.prevent="appStore.setView('trash')"
    >
      <Trash2Icon class="w-5 h-5 mr-3" />
      <span>Trash</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { useAppStore } from '@/core/store/appStore';
import { LightbulbIcon, ArchiveIcon, Trash2Icon } from 'lucide-vue-next';

const appStore = useAppStore();
</script>
