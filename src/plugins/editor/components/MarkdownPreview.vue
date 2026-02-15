<template>
  <div class="prose dark:prose-invert max-w-none p-2" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import md from '@/core/lib/markdown';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const renderedContent = computed(() => md.render(props.content));
</script>
