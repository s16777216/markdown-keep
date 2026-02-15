import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Label } from '@/core/api/types';
import { LabelStorage } from '@/core/storage/db';

export const useLabelStore = defineStore('labelStore', () => {
  const labels = ref<Label[]>([]);
  const isLoading = ref(false);

  async function fetchAllLabels() {
    isLoading.value = true;
    try {
      labels.value = await LabelStorage.getAll();
    } catch (error) {
      console.error('Failed to fetch labels:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function createLabel(name: string, color?: string): Promise<Label | null> {
    if (!name.trim()) return null;
    const newLabel: Label = {
      id: uuidv4(),
      name: name.trim(),
      color: color || 'default',
    };
    try {
      await LabelStorage.put(newLabel);
      labels.value.push(newLabel);
      return newLabel;
    } catch (error) {
      console.error('Failed to create label:', error);
      return null;
    }
  }

  async function updateLabel(id: string, updates: Partial<Omit<Label, 'id'>>) {
    const labelIndex = labels.value.findIndex(l => l.id === id);
    if (labelIndex === -1) return;

    const updatedLabel: Label = { ...labels.value[labelIndex], ...updates, id } as Label;
    try {
      await LabelStorage.put(updatedLabel);
      labels.value[labelIndex] = updatedLabel;
    } catch (error) {
      console.error('Failed to update label:', error);
    }
  }

  async function deleteLabel(id: string) {
    try {
      await LabelStorage.delete(id);
      labels.value = labels.value.filter(l => l.id !== id);
      // TODO: Also remove this labelId from all notes that use it
    } catch (error) {
      console.error('Failed to delete label:', error);
    }
  }

  return {
    labels,
    isLoading,
    fetchAllLabels,
    createLabel,
    updateLabel,
    deleteLabel,
  };
});
