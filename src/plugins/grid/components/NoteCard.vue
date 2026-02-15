<template>
  <div 
    class="rounded-lg p-4 break-inside-avoid prose dark:prose-invert cursor-pointer shadow-keep border border-gray-200 dark:border-gray-700"
    :class="backgroundColorClass"
    @click="openEditor"
  >
    <div v-if="note.title" class="font-bold mb-2">{{ note.title }}</div>
    <div v-html="renderedContent"></div>
    
    <div class="mt-4 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <component
        v-for="(comp, index) in pluginStore.registeredComponents.toolbar"
        :key="index"
        :is="comp"
        :noteId="note.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { Note } from '@/core/api/types';
import md from '@/core/lib/markdown';
import { usePluginStore } from '@/core/store/pluginStore';
import { useAppStore } from '@/core/store/appStore';

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true,
  },
});

const pluginStore = usePluginStore();
const appStore = useAppStore();

const openEditor = () => {
  appStore.openNoteEditor(props.note.id);
};

const renderedContent = computed(() => md.render(props.note.content));

const colorMap: Record<string, string> = {
  white: 'bg-white dark:bg-gray-800',
  red: 'bg-red-200 dark:bg-red-900',
  blue: 'bg-blue-200 dark:bg-blue-900',
  green: 'bg-green-200 dark:bg-green-900',
  yellow: 'bg-yellow-200 dark:bg-yellow-900',
  purple: 'bg-purple-200 dark:bg-purple-900',
};

const backgroundColorClass = computed(() => {
  return colorMap[props.note.color] || colorMap['white'];
});

</script>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
.prose {
  max-width: none;
}
</style>
