<template>
  <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <header class="flex-shrink-0 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div class="px-4 py-2 flex items-center justify-between">
        <div class="flex items-center">
          <button 
            @click="appStore.toggleSidebar" 
            class="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
          >
            <MenuIcon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <img src="/logo.svg" alt="Logo" class="w-8 h-8 mr-2" />
          <h1 class="text-xl font-bold text-gray-600 dark:text-gray-200">
            Markdown Keep
          </h1>
        </div>
        <div>
          <!-- Slot for header plugins like Search -->
          <slot name="header"></slot>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside 
        class="flex-shrink-0 bg-gray-50 dark:bg-gray-800 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out"
        :class="appStore.isSidebarOpen ? 'w-64 p-4' : 'w-0 p-0'"
      >
        <!-- Slot for sidebar plugins -->
        <slot name="sidebar"></slot>
      </aside>

      <main class="flex-1 p-4 overflow-y-auto">
        <!-- Slot for main content -->
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuIcon } from 'lucide-vue-next';
import { useAppStore } from '@/core/store/appStore';

const appStore = useAppStore();
</script>

<style scoped>
/* Scoped styles if needed */
</style>
