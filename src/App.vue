<template>
  <AppShell>
    <template #default>
      <!--
        The editor slot will contain components registered by plugins,
        like the NoteInput and the MasonryGrid.
        We render them in order of registration.
      -->
      <component v-for="(comp, index) in pluginStore.registeredComponents.editor" :key="index" :is="comp" />
    </template>

    <template #sidebar>
      <component v-for="(comp, index) in pluginStore.registeredComponents.sidebar" :key="index" :is="comp" />
    </template>

    <template #header>
      <component v-for="(comp, index) in pluginStore.registeredComponents.header" :key="index" :is="comp" />
    </template>
  </AppShell>
  <NoteEditorModal />
</template>

<script setup lang="ts">
import AppShell from './core/components/AppShell.vue';
import NoteEditorModal from './plugins/editor/components/NoteEditorModal.vue';
import { usePluginStore } from './core/store/pluginStore';

const pluginStore = usePluginStore();
</script>

<style>
body {
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-background);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
