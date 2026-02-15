import type { Plugin } from '@/core/api/types';
import NoteActions from './components/NoteActions.vue';
import SidebarNav from './components/SidebarNav.vue';

const ToolbarPlugin: Plugin = {
  id: 'toolbar',
  name: 'Note Toolbar & Nav',
  install(context) {
    // Register the actions component to the 'toolbar' slot
    context.registerComponent('toolbar', NoteActions);
    // Register the nav component to the 'sidebar' slot
    context.registerComponent('sidebar', SidebarNav);
  },
};

export default ToolbarPlugin;
