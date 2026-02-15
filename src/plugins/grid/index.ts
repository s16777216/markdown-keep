import type { Plugin } from '@/core/api/types';
import MasonryGrid from './components/MasonryGrid.vue';

const GridPlugin: Plugin = {
  id: 'grid',
  name: 'Masonry Grid',
  install(context) {
    // The grid is a primary view, so it registers to the 'editor' slot
    context.registerComponent('editor', MasonryGrid);
  },
};

export default GridPlugin;
