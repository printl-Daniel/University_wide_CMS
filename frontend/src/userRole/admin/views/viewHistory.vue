<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="flex">
      <!-- Sidebar Navigation -->
      <div class="">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="flex-grow p-6">
        <h1 class="text-2xl font-semibold text-gray-900 mb-6">Transaction History</h1>
        <div class="mb-4">
          <input
            v-model="searchQuery"
            type="text" 
            placeholder="Search transactions..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="header in headers"
                    :key="header.key"
                    @click="sortBy(header.key)"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    {{ header.label }}
                    <span v-if="sortKey === header.key" class="ml-1">
                      {{ sortOrder === 'asc' ? '▲' : '▼' }}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="history in paginatedData" :key="history.transactionId" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ history.transactionId }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(history.transactionDate) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ history.itemName }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ history.actionType }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" :class="quantityColor(history.quantityChanged)">
                    {{ history.quantityChanged > 0 ? '+' : '' }}{{ history.quantityChanged }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ history.remainingQuantity }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ history.responsiblePerson }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Pagination -->
        <div class="mt-4 flex justify-between items-center">
          <div>
            <span class="text-sm text-gray-700">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
            </span>
          </div>
          <div>
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50 hover:bg-gray-300"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import sideNav from '../components/sideNav.vue'
import topNav from '../components/topNav.vue'

const transactionHistory = ref([])
const searchQuery = ref('')
const sortKey = ref('transactionDate')
const sortOrder = ref('desc')
const currentPage = ref(1)
const itemsPerPage = 10

const headers = [
  { key: 'transactionId', label: 'Transaction ID' },
  { key: 'transactionDate', label: 'Transaction Date' },
  { key: 'itemName', label: 'Item Name' },
  { key: 'actionType', label: 'Action Type' },
  { key: 'quantityChanged', label: 'Quantity' },
  { key: 'remainingQuantity', label: 'Current Quantity' },
  { key: 'responsiblePerson', label: 'Responsible Person' },
]

const sortedAndFilteredData = computed(() => {
  let result = [...transactionHistory.value]
  
  if (searchQuery.value) {
    result = result.filter(item => 
      Object.values(item).some(val => 
        val.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )
  }
  
  return result.sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]
    
    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const totalItems = computed(() => sortedAndFilteredData.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalItems.value))

const paginatedData = computed(() => {
  return sortedAndFilteredData.value.slice(startIndex.value, endIndex.value)
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const fetchHistory = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/inventory/history')
    if (res.data.success) {
      transactionHistory.value = res.data.data
    } else {
      console.error('Failed to fetch history:', res.data.message)
    }
  } catch (error) {
    console.error('Error fetching history:', error)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const quantityColor = (quantity) => {
  return quantity > 0 ? 'text-green-600' : quantity < 0 ? 'text-red-600' : 'text-gray-900'
}

fetchHistory()
</script>