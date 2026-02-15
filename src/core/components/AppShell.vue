<template>
  <div class="flex flex-col h-screen bg-background text-on-background transition-colors duration-300">
    <header class="flex-shrink-0 bg-surface text-on-surface shadow-sm z-10 transition-colors duration-300">
      <div class="px-4 py-2 flex items-center justify-between">
        <div class="flex items-center">
          <button 
            @click="appStore.toggleSidebar" 
            class="p-2 mr-2 rounded-full hover:bg-surface-variant focus:outline-none transition-colors duration-200 flex items-center justify-center text-on-surface-variant"
          >
            <span class="material-symbols-rounded">menu</span>
          </button>
          <img src="/logo.svg" alt="Logo" class="w-8 h-8 mr-2" />
          <h1 class="text-xl font-bold text-on-surface">
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
        class="flex-shrink-0 bg-surface text-on-surface overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out"
        :class="appStore.isSidebarOpen ? 'w-64 p-4' : 'w-0 p-0'"
      >
        <!-- Slot for sidebar plugins -->
        <slot name="sidebar"></slot>
      </aside>

      <main class="flex-1 p-4 overflow-y-auto bg-background">
        <!-- Slot for main content -->
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/core/store/appStore';

const appStore = useAppStore();
</script>

<style scoped>
/* Scoped styles if needed */
</style>
