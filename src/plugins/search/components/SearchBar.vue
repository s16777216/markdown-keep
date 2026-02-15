<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-md bg-surface-variant overflow-hidden transition-shadow duration-200">
      <div class="grid place-items-center h-full w-12 text-on-surface-variant">
        <span class="material-symbols-rounded">search</span>
      </div>

      <input
        class="peer h-full w-full outline-none text-sm text-on-surface pr-2 bg-transparent placeholder-on-surface-variant"
        type="text"
        id="search"
        v-model="searchQuery"
        placeholder="Search" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/core/store/appStore';

const appStore = useAppStore();

// Use a computed property with a setter to link v-model to the store
const searchQuery = computed({
  get: () => appStore.searchQuery,
  set: (value) => appStore.setSearchQuery(value),
});
</script>
