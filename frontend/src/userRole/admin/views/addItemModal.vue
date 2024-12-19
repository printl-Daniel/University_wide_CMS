<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Navbar (top navbar) -->
    <topNav />

    <div class="flex">
      <!-- Sidebar Navigation -->
      <sideNav class="w-64 flex-shrink-0" />

      <!-- Main Content Area -->
      <div class="flex-grow p-8">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold text-gray-800 mb-8">Add New Item</h1>
          <form @submit.prevent="submitForm" class="bg-white p-8 rounded-xl shadow-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Item ID -->
              <div>
                <label for="itemId" class="block text-sm font-medium text-gray-700 mb-1">Item ID</label>
                <input
                  type="text"
                  id="itemId"
                  v-model="newItem.itemId"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Item Name -->
              <div>
                <label for="itemName" class="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  v-model="newItem.itemName"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  v-model="newItem.category"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Medical Supply">Medical Supply</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              <!-- Supplier -->
              <div>
                <label for="supplier" class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  id="supplier"
                  v-model="newItem.supplier"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Purchase Date -->
              <div>
                <label for="purchaseDate" class="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                <input
                  type="date"
                  id="purchaseDate"
                  v-model="newItem.purchaseDate"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Expiration Date -->
              <div>
                <label for="expirationDate" class="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  v-model="newItem.expirationDate"
                  required
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-8">
              <button
                type="submit"
                class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <SuccessModal
      title="Success"
      message="Item added successfully!"
      :visible="successModalVisible"
      @close="successModalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';
import SuccessModal from '../../../components/sucessModal.vue';

const successModalVisible = ref(false)
const newItem = reactive({
  itemId: '',
  itemName: '',
  category: '',
  expirationDate: '',
  supplier: '',
  purchaseDate: '',
})

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/inventory/add', newItem)
    console.log('Item added successfully:', response.data)
    successModalVisible.value = true
    // Reset form fields
    Object.keys(newItem).forEach(key => newItem[key] = '')
  } catch (error) {
    console.error('Error adding item:', error.response?.data?.message || error.message)
    alert('Failed to add item. Please try again.')
  }
}
</script>