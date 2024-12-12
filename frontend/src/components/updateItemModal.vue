<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="flex items-center justify-between p-6 border-b">
        <h3 class="text-2xl font-semibold text-gray-900">Update Item</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 focus:outline-none">
          <XIcon class="h-6 w-6" />
        </button>
      </div>
      <form @submit.prevent="submitForm" class="p-6 space-y-6">
        <!-- Item ID -->
        <div>
          <label for="itemId" class="block text-sm font-medium text-gray-700">Item ID</label>
          <input type="text" id="itemId" class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm" v-model="selectedItem.itemId" disabled />
        </div>

        <!-- Item Name -->
        <div>
          <label for="itemName" class="block text-sm font-medium text-gray-700">Item Name</label>
          <input type="text" id="itemName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="selectedItem.itemName" required />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="selectedItem.category" required>
            <option value="" disabled>Select a category</option>
            <option value="Medicine">Medicine</option>
            <option value="Medical Supply">Medical Supply</option>
            <option value="Equipment">Equipment</option>
          </select>
        </div>

        <!-- Quantity (disabled but included in the request) -->
        <div>
          <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" id="quantity" class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm" v-model="selectedItem.quantity" required min="1" disabled />
          <input type="hidden" v-model="selectedItem.quantity" />
        </div>

        <!-- Unit -->
        <div>
          <label for="unit" class="block text-sm font-medium text-gray-700">Unit</label>
          <select id="unit" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="selectedItem.unitOfMeasure" required>
            <option value="Box">Box</option>
            <option value="Bottle">Bottle</option>
            <option value="Pack">Pack</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <SaveIcon class="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
    
    <!-- Success Modal -->
    <SuccessModal
      :title="'Success'"
      :message="'Item updated successfully!'"
      :visible="successModalVisible"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { XIcon, SaveIcon } from 'lucide-vue-next'
import SuccessModal from '../components/sucessModal.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'item-updated'])

const selectedItem = reactive({ ...props.item })
const successModalVisible = ref(false)

const submitForm = async () => {
  try {
    const response = await axios.put(`http://localhost:5000/api/inventory/update-item/${selectedItem.itemId}`, selectedItem)
    console.log('Item updated successfully:', response.data)
    emit('item-updated', response.data.item)
    successModalVisible.value = true
    emit('close')
  } catch (error) {
    console.error('Error updating item:', error.response?.data?.message || error.message)
    alert('Failed to update item. Please try again.')
  }
}

const closeSuccessModal = () => {
  successModalVisible.value = false
}
</script>