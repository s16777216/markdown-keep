<template>
  <div class="relative w-full max-w-md">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="w-full px-4 py-2 pl-10 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/core/store/appStore';
import { SearchIcon } from 'lucide-vue-next';

const appStore = useAppStore();

// Use a computed property with a setter to link v-model to the store
const searchQuery = computed({
  get: () => appStore.searchQuery,
  set: (value) => appStore.setSearchQuery(value),
});
</script>
