<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-gray-700 mt-2">{{ message }}</p>
        <div class="mt-4 text-right">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: "Success",
      },
      message: {
        type: String,
        default: "Operation completed successfully!",
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    emits: ["close"],
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  </style>
  