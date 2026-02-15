import { usePluginStore } from '@/core/store/pluginStore';
import { useNoteStore } from '@/core/store/noteStore';
import type { Plugin, PluginContext } from '@/core/api/types';

/**
 * Creates the context object that is passed to each plugin's install function.
 * This exposes the core APIs to the plugins in a controlled way.
 */
function createPluginContext(): PluginContext {
  const pluginStore = usePluginStore();
  const noteStore = useNoteStore();

  return {
    // Expose the note store to plugins
    store: noteStore,

    // Expose the component registration function
    registerComponent: pluginStore.registerComponent,

    // Placeholder for a future event bus
    on: (event: string, callback: Function) => {
      console.log(`[Event Bus] Registering for event '${event}'`);
      // In a real event bus, you would store these callbacks
    },
  };
}

/**
 * Installs all provided plugins into the application.
 * This should be called once during the app's initialization.
 * @param plugins An array of plugin objects to install.
 */
export function installPlugins(plugins: Plugin[]) {
  const context = createPluginContext();
  
  for (const plugin of plugins) {
    try {
      plugin.install(context);
      console.log(`[Plugin System] Successfully installed plugin: ${plugin.name}`);
    } catch (error) {
      console.error(`[Plugin System] Failed to install plugin: ${plugin.name}`, error);
    }
  }
}
