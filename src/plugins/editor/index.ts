import type { Plugin } from '@/core/api/types';
import NoteInput from './components/NoteInput.vue';

const EditorPlugin: Plugin = {
  id: 'editor',
  name: 'Note Editor',
  install(context) {
    // The note input is also a primary component for the main view
    context.registerComponent('editor', NoteInput);
  },
};

export default EditorPlugin;
