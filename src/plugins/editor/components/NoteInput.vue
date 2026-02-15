<template>
  <div ref="container" class="bg-surface rounded-xl p-4 max-w-2xl mx-auto mb-8 shadow-keep border border-outline-variant transition-shadow duration-200 focus-within:shadow-md">
    <input
      v-if="isExpanded"
      v-model="title"
      class="w-full p-2 font-bold border-none rounded-md bg-transparent text-on-surface focus:outline-none placeholder-on-surface-variant"
      placeholder="Title"
    />
    
    <div v-show="!isPreview">
      <textarea
        ref="textarea"
        v-model="content"
        class="w-full p-2 border-none rounded-md bg-transparent text-on-surface focus:outline-none placeholder-on-surface-variant"
        placeholder="Take a note..."
        rows="1"
        @focus="expand"
        @input="autoResize"
      ></textarea>
    </div>

    <MarkdownPreview v-if="isPreview" :content="content" />

    <div v-if="isExpanded" class="mt-4 flex justify-between items-center">
      <div>
        <button @click="isPreview = !isPreview" class="px-4 py-2 rounded-md hover:bg-surface-variant text-on-surface-variant">
          {{ isPreview ? 'Edit' : 'Preview' }}
        </button>
      </div>
      <div class="space-x-2">
        <button @click="handleClose" class="px-4 py-2 rounded-md hover:bg-surface-variant text-on-surface-variant">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useNoteStore } from '@/core/store/noteStore';
import MarkdownPreview from './MarkdownPreview.vue';

const noteStore = useNoteStore();

const container = ref<HTMLElement | null>(null);
const title = ref('');
const content = ref('');
const isExpanded = ref(false);
const isPreview = ref(false);
const textarea = ref<HTMLTextAreaElement | null>(null);

const autoResize = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
  }
};

const expand = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
    nextTick(() => {
      autoResize();
    });
  }
}

const handleClose = async () => {
  if (content.value.trim() || title.value.trim()) {
    await noteStore.createNote({ 
      title: title.value,
      content: content.value 
    });
  }
  resetInput();
};

const resetInput = () => {
  title.value = '';
  content.value = '';
  isExpanded.value = false;
  isPreview.value = false;
  nextTick(() => {
    if (textarea.value) {
      textarea.value.style.height = 'auto';
    }
  });
};

onClickOutside(container, () => {
  if (isExpanded.value) {
    handleClose();
  }
});
</script>
