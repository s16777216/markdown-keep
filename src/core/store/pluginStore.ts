import { defineStore } from 'pinia';
import { shallowRef, markRaw } from 'vue';
import type { Component } from 'vue';
import type { Slot } from '@/core/api/types';

export const usePluginStore = defineStore('pluginStore', () => {
  const registeredComponents = shallowRef<Record<Slot, Component[]>>({
    toolbar: [],
    editor: [],
    sidebar: [],
    header: [],
  });

  function registerComponent(slot: Slot, component: Component) {
    // Use markRaw to prevent Vue from making the component reactive
    const rawComponent = markRaw(component);
    
    // Avoid duplicate registrations
    if (!registeredComponents.value[slot].some(c => c === rawComponent)) {
      registeredComponents.value[slot].push(rawComponent);
    }
  }

  return {
    registeredComponents,
    registerComponent,
  };
});
