<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Top Navbar -->
      <div class="bg-white">
        <topNav />
      </div>
  
      <div class="flex">
        <!-- Sidebar Navigation -->
        <div class="sidebar">
          <sideNav />
        </div>
  
        <!-- Main Content -->
        <div class="flex-grow max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-black-900 mb-6">Archived Inventory Items</h2>
  
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      v-for="header in headers"
                      :key="header.key"
                      class="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider"
                    >
                      {{ header.label }}
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in archivedItems" :key="item._id" class="hover:bg-gray-50">
                    <td
                      v-for="header in headers"
                      :key="header.key"
                      class="px-4 py-1 whitespace-nowrap text-sm text-black-500"
                    >
                      {{ formatCellData(item[header.key], header.key) }}
                    </td>
                    <td class="px-6 py-1 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-2">
                        <button @click="restoreItem(item.itemId)" class="text-blue-600 hover:text-blue-900">Restore</button>
                        <button @click="deleteArchivedItem(item.itemId)" class="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // Import sideNav and topNav components
  import sideNav from '../components/sideNav.vue';
  import topNav from '../components/topNav.vue';
  
  const archivedItems = ref([]);
  const headers = [
    { key: 'itemId', label: 'Item ID' },
    { key: 'itemName', label: 'Item Name' },
    { key: 'category', label: 'Category' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'unitOfMeasure', label: 'Unit of Measure' },
    { key: 'expirationDate', label: 'Expiration Date' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'purchaseDate', label: 'Purchase Date' },
  ];
  
  const fetchArchivedItems = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/inventory/archived-items');
    archivedItems.value = res.data.data;
  } catch (error) {
    console.error('Error fetching archived items:', error);
  }
};

const restoreItem = async (itemId) => {
  try {
    await axios.put(`http://localhost:5000/api/inventory/restore-item/${itemId}`);
    fetchArchivedItems(); // Refresh the archived items list
    alert('Item restored successfully!');
  } catch (error) {
    console.error('Error restoring item:', error);
    alert('Failed to restore item.');
  }
};

const deleteArchivedItem = async (itemId) => {
  try {
    await axios.delete(`http://localhost:5000/api/inventory/delete-archived-item/${itemId}`);
    fetchArchivedItems(); // Refresh the archived items list
    alert('Item deleted successfully!');
  } catch (error) {
    console.error('Error deleting archived item:', error);
    alert('Failed to delete item.');
  }
};

// Fetch archived items when the component is mounted
onMounted(() => {
  fetchArchivedItems();
});
  
  // Fetch archived items when the component is mounted
  onMounted(() => {
    fetchArchivedItems();
  });
  
  // Optional: Format cell data for display
  const formatCellData = (data, key) => {
    if (key === 'expirationDate' || key === 'purchaseDate') {
      return new Date(data).toLocaleDateString('en-US'); // Format date
    }
    return data; // Return data as is for other fields
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  