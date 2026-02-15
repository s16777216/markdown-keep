<template>
  <nav class="flex flex-col space-y-1">
    <a
      href="#"
      class="flex items-center px-4 py-3 rounded-r-full transition-colors font-medium"
      :class="isActiveView('notes') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'"
      @click.prevent="appStore.setView('notes')"
    >
      <span class="material-symbols-rounded mr-4" :class="{'fill-current': isActiveView('notes')}">lightbulb</span>
      <span>Notes</span>
    </a>
    <a
      href="#"
      class="flex items-center px-4 py-3 rounded-r-full transition-colors font-medium"
      :class="isActiveView('archive') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'"
      @click.prevent="appStore.setView('archive')"
    >
      <span class="material-symbols-rounded mr-4" :class="{'fill-current': isActiveView('archive')}">archive</span>
      <span>Archive</span>
    </a>
     <a
      href="#"
      class="flex items-center px-4 py-3 rounded-r-full transition-colors font-medium"
      :class="isActiveView('trash') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'"
      @click.prevent="appStore.setView('trash')"
    >
      <span class="material-symbols-rounded mr-4" :class="{'fill-current': isActiveView('trash')}">delete</span>
      <span>Trash</span>
    </a>

    <!-- Labels Section -->
    <div v-if="labelStore.labels.length > 0" class="mt-4">
      <div class="px-4 py-2 text-sm font-medium text-on-surface-variant">LABELS</div>
      <a
        href="#"
        v-for="label in labelStore.labels"
        :key="label.id"
        class="flex items-center px-4 py-3 rounded-r-full transition-colors font-medium"
        :class="isActiveView(`label:${label.id}`) ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'"
        @click.prevent="appStore.setView(`label:${label.id}`)"
      >
        <span class="material-symbols-rounded mr-4 w-6 h-6" :class="{'fill-current': isActiveView(`label:${label.id}`) }">label</span>
        <span>{{ label.name }}</span>
      </a>
    </div>

    <!-- Manage Labels Button -->
    <button @click="manageLabels" class="mt-4 px-4 py-2 flex items-center text-primary hover:bg-primary-container rounded-r-full transition-colors">
      <span class="material-symbols-rounded mr-4">edit</span>
      <span>Manage Labels</span>
    </button>

    <div class="mt-auto pt-4 border-t border-outline-variant space-y-1">
      <div class="px-4 py-3 flex items-center justify-between">
        <label for="theme-color" class="flex items-center text-on-surface-variant cursor-pointer">
          <span class="material-symbols-rounded mr-4">palette</span>
          <span class="font-medium">Theme Color</span>
        </label>
        <input 
          id="theme-color"
          type="color" 
          :value="appStore.themeColor"
          @input="(e) => appStore.setThemeColor((e.target as HTMLInputElement).value)"
          class="w-8 h-8 rounded-full border-none cursor-pointer p-0 bg-transparent"
        />
      </div>

      <a
        href="#"
        class="flex items-center px-4 py-3 rounded-r-full text-on-surface-variant hover:bg-surface-variant transition-colors"
        @click.prevent="appStore.toggleTheme"
      >
        <span class="material-symbols-rounded mr-4">{{ appStore.isDark ? 'light_mode' : 'dark_mode' }}</span>
        <span class="font-medium">{{ appStore.isDark ? 'Light Mode' : 'Dark Mode' }}</span>
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAppStore } from '@/core/store/appStore';
import { useLabelStore } from '@/core/store/labelStore'; // Import label store

const appStore = useAppStore();
const labelStore = useLabelStore();

// Fetch labels on mount
onMounted(() => {
  labelStore.fetchAllLabels();
});

// Helper to check active view, now accepting string for label IDs
const isActiveView = (view: string) => {
  return appStore.currentView === view;
};

const manageLabels = () => {
  // TODO: Implement label management modal
  alert('Manage Labels functionality not yet implemented.');
};

</script>