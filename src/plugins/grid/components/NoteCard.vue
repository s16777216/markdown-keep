<template>
  <div
    class="rounded-xl p-4 break-inside-avoid prose dark:prose-invert cursor-pointer shadow-keep transition-shadow duration-200 hover:shadow-md"
    :class="backgroundColorClass" @click="openEditor">
    <div v-if="note.title" class="font-bold mb-2 text-on-surface">{{ note.title }}</div>
    <div v-html="renderedContent" class="text-on-surface"></div>

    <!-- Display Labels -->
    <div v-if="noteLabels.length > 0" class="mt-2 flex flex-wrap gap-1">
      <span v-for="label in noteLabels" :key="label.id" class="text-xs px-2 py-1 rounded-full"
        :style="{ backgroundColor: label.color || '#e0e0e0', color: '#ffffff' }">
        {{ label.name }}
      </span>
    </div>

    <div class="mt-4 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <component v-for="(comp, index) in pluginStore.registeredComponents.toolbar" :key="index" :is="comp"
        :noteId="note.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { Note } from '@/core/api/types';
import md from '@/core/lib/markdown';
import { usePluginStore } from '@/core/store/pluginStore';
import { useAppStore } from '@/core/store/appStore';
import { useLabelStore } from '@/core/store/labelStore'; // Import label store

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true,
  },
});

const pluginStore = usePluginStore();
const appStore = useAppStore();
const labelStore = useLabelStore(); // Initialize label store

const openEditor = () => {
  appStore.openNoteEditor(props.note.id);
};

const renderedContent = computed(() => md.render(props.note.content));

const noteLabels = computed(() => {
  return (props.note.labelIds || []).map(id => labelStore.labels.find(label => label.id === id)).filter(label => label !== undefined);
});

const colorMap: Record<string, string> = {
  white: 'bg-surface border border-outline-variant',
  red: 'bg-red-200 dark:bg-red-900 border border-transparent',
  blue: 'bg-blue-200 dark:bg-blue-900 border border-transparent',
  green: 'bg-green-200 dark:bg-green-900 border border-transparent',
  yellow: 'bg-yellow-200 dark:bg-yellow-900 border border-transparent',
  purple: 'bg-purple-200 dark:bg-purple-900 border border-transparent',
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
