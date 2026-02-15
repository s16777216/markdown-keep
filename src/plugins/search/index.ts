import type { Plugin } from '@/core/api/types';
import SearchBar from './components/SearchBar.vue';

const SearchPlugin: Plugin = {
  id: 'search',
  name: 'Search Bar',
  install(context) {
    context.registerComponent('header', SearchBar);
  },
};

export default SearchPlugin;
