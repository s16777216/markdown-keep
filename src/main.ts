import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { installPlugins } from './core/pluginSystem';

// Import Plugins
import GridPlugin from './plugins/grid';
import EditorPlugin from './plugins/editor';
import ToolbarPlugin from './plugins/toolbar';
import SearchPlugin from './plugins/search';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Install all plugins before mounting the app
installPlugins([
  EditorPlugin,
  GridPlugin,
  ToolbarPlugin,
  SearchPlugin,
]);

app.mount('#app');
