<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="flex">
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Clinic Dashboard</h1>
        

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">Total Items</h2>
            <p class="text-3xl font-bold text-blue-600">{{ totalItems }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">Low Stock Items</h2>
            <p class="text-3xl font-bold text-yellow-600">{{ lowStockItems.length }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">Expiring Soon</h2>
            <p class="text-3xl font-bold text-red-600">{{ expiringItems.length }}</p>
          </div>
        </div>
        
        <!-- Notifications -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
          <div v-if="lowStockItems.length || expiringItems.length">
            <div v-for="item in lowStockItems" :key="'low-' + item.id" class="flex items-center mb-2">
              <AlertCircle class="text-yellow-500 mr-2" />
              <span>Low stock: {{ item.name }} ({{ item.quantity }} left)</span>
            </div>
            <div v-for="item in expiringItems" :key="'exp-' + item.id" class="flex items-center mb-2">
              <AlertTriangle class="text-red-500 mr-2" />
              <span>Expiring soon: {{ item.name }} ({{ formatDate(item.expiryDate) }})</span>
            </div>
          </div>
          <p v-else class="text-gray-600">No urgent notifications</p>
        </div>
        
        <!-- Inventory Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <h2 class="text-xl font-semibold text-gray-800 p-6 pb-4">Inventory Items</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="item in inventoryItems" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.quantity }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(item.expiryDate) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(item)">
                      {{ getStatusText(item) }}
                    </span>
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
import { ref, computed } from 'vue'
import { AlertCircle, AlertTriangle } from 'lucide-vue-next'
import sideNav from '../components/sideNav.vue'
import topNav from '../components/topNav.vue'

// Mock data - replace with actual data fetching logic
const inventoryItems = ref([
  { id: 1, name: 'Paracetamol', quantity: 500, expiryDate: '2024-12-31' },
  { id: 2, name: 'Ibuprofen', quantity: 10, expiryDate: '2024-06-30' },
  { id: 3, name: 'Bandages', quantity: 200, expiryDate: '2025-12-31' },
  { id: 4, name: 'Antiseptic Solution', quantity: 50, expiryDate: '2023-08-31' },
  { id: 5, name: 'Syringes', quantity: 1000, expiryDate: '2026-01-31' },
])

const totalItems = computed(() => inventoryItems.value.length)

const lowStockItems = computed(() => 
  inventoryItems.value.filter(item => item.quantity <= 20)
)

const expiringItems = computed(() => {
  const threeMonthsFromNow = new Date()
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
  return inventoryItems.value.filter(item => new Date(item.expiryDate) <= threeMonthsFromNow)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (item) => {
  if (item.quantity <= 20) return 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium'
  if (new Date(item.expiryDate) <= new Date()) return 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium'
  return 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium'
}

const getStatusText = (item) => {
  if (item.quantity <= 20) return 'Low Stock'
  if (new Date(item.expiryDate) <= new Date()) return 'Expired'
  return 'In Stock'
}
</script>