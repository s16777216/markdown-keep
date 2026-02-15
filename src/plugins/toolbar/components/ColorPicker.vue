<template>
  <div class="flex space-x-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg">
    <div
      v-for="color in colors"
      :key="color.value"
      class="w-6 h-6 rounded-full cursor-pointer transition-transform transform hover:scale-125"
      :class="[color.bgClass]"
      @click="selectColor(color.value)"
    ></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['color-selected']);

const colors = [
  { value: 'white', bgClass: 'bg-white border' },
  { value: 'red', bgClass: 'bg-red-200' },
  { value: 'blue', bgClass: 'bg-blue-200' },
  { value: 'green', bgClass: 'bg-green-200' },
  { value: 'yellow', bgClass: 'bg-yellow-200' },
  { value: 'purple', bgClass: 'bg-purple-200' },
];

const selectColor = (color: string) => {
  emit('color-selected', color);
};
</script>
