<template>
  <div v-if="isModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div 
      class="bg-surface rounded-xl shadow-xl w-full max-w-md p-6 prose dark:prose-invert transition-all duration-300 ease-in-out"
      :class="[modalBackgroundColorClass, appStore.isSidebarOpen ? 'ml-64' : 'ml-0']"
      @click.stop
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-on-surface">Manage Labels</h2>
        <button @click="closeModal" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="material-symbols-rounded text-gray-600 dark:text-gray-300">close</span>
        </button>
      </div>

      <!-- Input for new label -->
      <div class="flex mb-4 space-x-2">
        <input
          type="text"
          v-model="newLabelName"
          placeholder="New label name"
          class="flex-1 p-2 border rounded-md focus:outline-none bg-surface-variant text-on-surface-variant placeholder-on-surface-variant"
          @keyup.enter="addLabel"
        />
        <input
          type="color"
          v-model="newLabelColor"
          class="w-10 h-10 border-none rounded-md cursor-pointer p-0 bg-transparent"
        />
        <button @click="addLabel" class="px-4 py-2 rounded-md bg-primary text-on-primary hover:bg-primary-hover focus:outline-none">
          Add
        </button>
      </div>

      <!-- List of existing labels -->
      <ul class="space-y-2 max-h-64 overflow-y-auto pr-2">
        <li 
          v-for="label in labelStore.labels"
          :key="label.id"
          class="flex items-center justify-between p-2 rounded-md hover:bg-surface-variant transition-colors"
        >
          <div class="flex items-center flex-1 mr-2">
            <span class="material-symbols-rounded mr-2 text-gray-500">label</span>
            <input 
              v-model="label.name" 
              @blur="saveEdit(label)" 
              @keyup.enter="saveEdit(label)" 
              class="p-1 bg-transparent focus:outline-none w-full"
            />
            <input type="color" v-model="label.color" @change="updateLabelColor(label)" class="w-6 h-6 ml-2 border-none rounded-full cursor-pointer"/>
          </div>
          <button @click="deleteLabel(label.id)" class="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none">
            <span class="material-symbols-rounded text-red-500">delete</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useAppStore } from '@/core/store/appStore';
import { useLabelStore } from '@/core/store/labelStore';

const appStore = useAppStore();
const labelStore = useLabelStore();

const newLabelName = ref('');
const newLabelColor = ref('#ffffff');

// Fetch labels when the modal is opened
watch(() => appStore.currentView, (newView) => {
  if (newView === 'manage-labels') {
    labelStore.fetchAllLabels();
  }
});

onMounted(() => {
  if (appStore.currentView === 'manage-labels') {
    labelStore.fetchAllLabels();
  }
});

const isModalVisible = computed(() => appStore.currentView === 'manage-labels');

const modalBackgroundColorClass = computed(() => {
  // Use a default color if not set or invalid
  return appStore.themeColor ? `bg-[${appStore.themeColor}]` : 'bg-surface'; 
});

const addLabel = async () => {
  await labelStore.createLabel(newLabelName.value, newLabelColor.value);
  newLabelName.value = ''; // Clear input
};

const updateLabelColor = async (label: Label) => {
  await labelStore.updateLabel(label.id, { color: label.color });
};

const saveEdit = async (label: Label) => {
  if (label.name.trim()) {
    await labelStore.updateLabel(label.id, { name: label.name });
  } else {
    // If name is empty, delete the label
    await labelStore.deleteLabel(label.id);
  }
};

const deleteLabel = async (id: string) => {
  await labelStore.deleteLabel(id);
};

const closeModal = () => {
  appStore.setView('notes'); // Reset view when modal is closed
};
</script>
